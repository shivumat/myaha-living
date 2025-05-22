import { shopifyFetch } from '#/lib/shopify/util';
import { notFound } from 'next/navigation';

export const POST = async () => {
  try {
    const query = `{
      metaobjects(first: 15, type: "website_data") {
        edges {
          node {
            handle
            type
            fields {
              key
              value
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }`;

    const data = await shopifyFetch({ query }, true);

    const initData = data.data.data.metaobjects.edges.map((data: any) => {
      const formattedFields = data?.node?.fields.reduce(
        (acc: any, field: any) => {
          console.log('Field:', field);
          acc[field.key] = field.value;
          return acc;
        },
        {},
      );

      return {
        ...formattedFields,
      };
    });

    return new Response(
      JSON.stringify({
        status: true,
        message: 'Initdata fetched',
        data: initData,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error while fetching Initdata:', error);
    notFound();
  }
};
