import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();
    const myHeaders = new Headers();
    myHeaders.append(
      'X-Shopify-Access-Token',
      process.env.SHOPIFY_ADMIN_ACCESS_TOKEN as string,
    );

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow' as RequestRedirect,
    };

    const data = await fetch(
      `https://hvs7sw-ki.myshopify.com/admin/api/2025-01/orders.json?customer_email=${email}`,
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
