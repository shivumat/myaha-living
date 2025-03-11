import { shopify } from '#/lib/shopify/util';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { session } = await shopify.auth.callback({
      rawRequest: req,
    });

    const client = new shopify.clients.Graphql({ session });
    const data = await client.query({
      data: {
        query: `mutation OrderCreate($order: OrderCreateOrderInput!, $options: OrderCreateOptionsInput) {
                    orderCreate(order: $order, options: $options) {
                        userErrors {
                            field
                            message
                        }
                        order {
                            id
                            totalTaxSet {
                                shopMoney {
                                    amount
                                    currencyCode
                                }
                            }
                            lineItems(first: 5) {
                                nodes {
                                    variant {
                                        id
                                    }
                                    id
                                    title
                                    quantity
                                    taxLines {
                                        title
                                        rate
                                        priceSet {
                                            shopMoney {
                                                amount
                                                currencyCode
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }`,
        variables: {
          order: {
            currency: 'EUR',
            lineItems: [
              {
                variantId: 'gid://shopify/ProductVariant/4947061558501',
                quantity: 2,
              },
            ],
            transactions: [
              {
                kind: 'SALE',
                status: 'SUCCESS',
                amountSet: {
                  shopMoney: {
                    amount: 238.47,
                    currencyCode: 'EUR',
                  },
                },
              },
            ],
          },
        },
      },
    });

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
