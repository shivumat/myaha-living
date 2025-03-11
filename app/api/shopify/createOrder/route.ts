import { shopifyAdminFetch } from '#/lib/shopify/util';
import { notFound } from 'next/navigation';

export const POST = async (req: Request) => {
  const {
    variants = [
      { variantId: 'gid://shopify/ProductVariant/4947061558501', quantity: 2 },
    ],
  } = await req.json();

  const variables = {
    input: {
      lineItems: variants,
      email: 'customer@example.com',
      transactions: [
        {
          kind: 'sale',
          status: 'success',
          amount: 10.0,
          currencyCode: 'USD',
          gateway: 'manual',
        },
      ],
    },
  };

  try {
    const createdOrder = await shopifyAdminFetch({
      query: `
            mutation orderCreate($input: OrderCreateInput!) {
                orderCreate(input: $input) {
                    order {
                    id
                    name
                    totalPriceV2 {
                        amount
                        currencyCode
                    }
                    }
                    userErrors {
                    field
                    message
                    }
            }
        }
  `,
      variables,
    });

    return new Response(
      JSON.stringify({
        status: true,
        message: 'Products fetched',
        createdOrder,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error while fetching products:', error);
    notFound();
  }
};
