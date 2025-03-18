import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const {
      variants,
      shippingCharges,
      codCharges,
      customerInfo,
      shipping_address,
      billing_address,
      razor_pay_id,
      note,
      discount_codes,
    } = await req.json();

    const udpatedVariants = [
      ...(shippingCharges
        ? [
            {
              title: 'Shipping',
              price: shippingCharges || '0',
              code: 'SHIPPING',
            },
          ]
        : []),
      ...(codCharges
        ? [
            {
              title: 'COD Charges',
              price: codCharges || '0',
              code: 'COD',
            },
          ]
        : []),
    ];

    const myHeaders = new Headers();
    myHeaders.append(
      'X-Shopify-Access-Token',
      process.env.SHOPIFY_ADMIN_ACCESS_TOKEN as string,
    );
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Cookie', 'request_method=POST');

    const raw = JSON.stringify({
      order: {
        line_items: variants,
        shipping_lines: udpatedVariants,
        customer: customerInfo,
        shipping_address,
        billing_address,
        confirmation_number: '1245',
        transaction: {
          currency_code: 'INR',
          type: !!razor_pay_id ? 'bank_deposit' : 'cash_on_delivery',
          status: !!razor_pay_id ? 'success' : 'pending',
        },
        financial_status: !!razor_pay_id ? 'paid' : 'pending',
        note: note,
        discount_codes,
      },
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow' as RequestRedirect,
    };

    const data = await fetch(
      'https://hvs7sw-ki.myshopify.com/admin/api/2025-01/orders.json',
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.error(error));

    return NextResponse.json(
      {
        status: true,
        message: 'Products fetched',
        data: { orderId: data.order.id },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error while fetching products:', error);
    return NextResponse.json(
      {
        status: false,
        message: 'Error',
      },
      { status: 500 },
    );
  }
};
