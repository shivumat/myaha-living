import { getShopifyMediaInfo, shopifyFetch } from '#/lib/shopify/util';
import { notFound } from 'next/navigation';
export const revalidate = 0;
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

    const initData = await Promise.all(
      data.data.data.metaobjects.edges.map(async (data: any) => {
        const formattedFields = await data?.node?.fields.reduce(
          async (accPromise: Promise<any>, field: any) => {
            const acc = await accPromise;
            if (field.key === 'banner_images') {
              const imageArray = JSON.parse(field.value);
              const imagesData = [];
              for (let i = 0; i < imageArray.length; i++) {
                const image = imageArray[i];
                const imageData = await getShopifyMediaInfo(image);
                imagesData.push(imageData);
              }
              acc[field.key] = imagesData;
            } else if (field.key === 'mobile_banner_images_1') {
              const imageArray = JSON.parse(field.value);
              const imagesData = [];
              for (let i = 0; i < imageArray.length; i++) {
                const image = imageArray[i];
                const imageData = await getShopifyMediaInfo(image);
                imagesData.push(imageData);
              }
              acc['mobile_banner_images'] = imagesData;
            } else {
              acc[field.key] = field.value;
            }
            return acc;
          },
          Promise.resolve({}),
        );

        return {
          ...formattedFields,
        };
      }),
    );

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
