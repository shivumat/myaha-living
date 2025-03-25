import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { code } = await req.json();

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

    const codeCountResponse = await fetch(
      `https://hvs7sw-ki.myshopify.com/admin/api/2024-04/discount_codes/lookup.json?code=${code}`,
      requestOptions,
    );

    const codeCountData = await codeCountResponse.json();

    const usageCount = codeCountData.discount_code.usage_count;

    const response = await fetch(
      `https://hvs7sw-ki.myshopify.com/admin/api/2024-04/price_rules.json?code=${code}`,
      requestOptions,
    );

    const data = await response.json();

    const {
      value_type: valueType,
      value,
      usage_limit: usageLimit,
    } = data.price_rules[0];

    if (usageCount >= usageLimit) {
      return NextResponse.json(
        {
          status: false,
          message: 'Discount limit reached',
          data: { message: 'Discount limit reached' },
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        status: true,
        message: 'Discount fetched',
        // data comes as negative for discount
        data: { code, amount: +value * -1, type: valueType },
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
