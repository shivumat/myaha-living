import { getCurrencySymbol } from '#/lib/util';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();
    const myHeaders = new Headers();
    myHeaders.append(
      'X-Shopify-Access-Token',
      process.env.SHOPIFY_ADMIN_ACCESS_TOKEN as string,
    );
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow' as RequestRedirect,
    };

    const data = await fetch(
      `https://hvs7sw-ki.myshopify.com/admin/api/2025-01/orders.json?customer_email=${email}`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.error(error));

    const orders = data.orders.map((order: any) => {
      console.log(order);
      const line_items = order.line_items.map((item: any) => {
        const { variant_id, title, quantity, price, product_id } = item;
        return {
          id: variant_id,
          title,
          quantity,
          price,
          productId: product_id,
        };
      });
      return {
        totalPrice: order.total_price,
        lineItems: line_items,
        currencySymbol: getCurrencySymbol(order.currency),
      };
    });

    return NextResponse.json(
      {
        status: true,
        message: 'Products fetched',
        orders,
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
