import { shopifyFetch } from '#/lib/shopify/util';
import { notFound } from 'next/navigation';

export const POST = async () => {
  try {
    const query = `{
    collections(first: 100) {
      edges {
        node {
          type: metafield(namespace: "custom", key: "type") {
              value
          }
          categoryImage: metafield(namespace: "custom", key: "category_images") {
          reference {
            ... on MediaImage {
              image {
                url
              }
            }
          }
        }
          products(first: 100) {
            edges {
              node {
                id
                title
                handle
              }
            }
          }
          descriptionHtml
          handle
          id
          title
          image {
              url
          }
        }
      }
    }
  }`;

    const data = await shopifyFetch({ query });

    const collections = data.data.data.collections.edges.map(
      (collection: any) => {
        const {
          id,
          handle,
          title,
          descriptionHtml,
          type,
          image,
          products,
          categoryImage,
        } = collection.node;
        return {
          id,
          handle,
          title,
          type: type?.value,
          description: descriptionHtml,
          image: image?.url ? `${image?.url}.webp` : '',
          products: products.edges.map((product: any) => product.node),
          categoryImage: categoryImage?.reference?.image?.url
            ? `${categoryImage?.reference?.image?.url}.webp`
            : '',
        };
      },
    );

    return new Response(
      JSON.stringify({
        status: true,
        message: 'Collections fetched',
        data: collections,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error while fetching Collections:', error);
    notFound();
  }
};
