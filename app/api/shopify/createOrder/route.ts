import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const {
      variants,
      shipping_cahrge: shippingCharge,
      customerInfo,
      shippingAddress,
      billingAddress,
      razor_pay_id,
      note,
    } = await req.json();

    const udpatedVariants = [
      ...variants,
      {
        name: 'shipping_cost',
        title: 'Shipping cost',
        price: shippingCharge,
        currency_code: 'INR',
      },
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
        line_items: udpatedVariants,
        customer: customerInfo,
        shipping_address: shippingAddress,
        billing_address: billingAddress,
        confirmation_number: '1245',
        transaction: {
          currency_code: 'INR',
          type: !!razor_pay_id ? 'bank_deposit' : 'cash_on_delivery',
          amount: '1900',
          status: !!razor_pay_id ? 'success' : 'pending',
        },
        financial_status: !!razor_pay_id ? 'paid' : 'pending',
        note: note,
      },
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow' as RequestRedirect,
    };

    const data = await fetch(
      'https://myahaliving.myshopify.com/admin/api/2025-01/orders.json',
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    return NextResponse.json(
      {
        status: true,
        message: 'Products fetched',
        data,
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
