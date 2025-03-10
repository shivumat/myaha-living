import { shopifyFetch } from '#/lib/shopify/util';
import { notFound } from 'next/navigation';

export const POST = async () => {
  try {
    const query = `{
    collections(first: 100) {
      edges {
        node {
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
        const { id, handle, title, descriptionHtml, image } = collection.node;
        return {
          id,
          handle,
          title,
          description: descriptionHtml,
          image: image?.url,
        };
      },
    );

    return new Response(
      JSON.stringify({
        status: true,
        message: 'Products fetched',
        data: collections,
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
