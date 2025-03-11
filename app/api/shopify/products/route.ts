import { shopifyFetch } from '#/lib/shopify/util';
import { generateCombinations, getCurrencySymbol } from '#/lib/util';
import { notFound } from 'next/navigation';

export const POST = async () => {
  try {
    const query = `{
  products(first: 100,query: "product_status:active") {
    edges {
      node {
        options {
            id
            name
            values
        }
        id
        title
        tags
        handle
        descriptionHtml
        collections(first: 5) {
          edges {
            node {
              title
              id
            }
          }
        }
        variants(first: 5) {
          edges {
            node {
                id
                availableForSale
                material: metafield(namespace: "custom", key: "material") {
                    value
                }
                finish: metafield(namespace: "custom", key: "finish") {
                    value
                }
                dimensions: metafield(namespace: "custom", key: "dimensions") {
                    value
                }
                product{
                    images(first: 8) {
                    edges {
                        node {
                            url
                        }
                    }
                    }
                }
                price {
                    amount
                    currencyCode
                }
            }
          } 
        }
      }
    }
  }
}`;

    const data = await shopifyFetch({ query });
    const products = data.data.data.products.edges.map((product: any) => {
      const { id, handle, title, descriptionHtml, options, tags } =
        product.node;
      const variantsInfo: { name: string; values: string[] }[] = options.map(
        (option: any) => {
          return { name: option.name, values: option.values };
        },
      );

      const variantCollection = generateCombinations(variantsInfo);

      const collections = product.node.collections.edges.map(
        (collection: any) => {
          const { title, id } = collection.node;
          return { title, id };
        },
      );
      const variants = product.node.variants.edges.map(
        (variant: any, index: number) => {
          const { id, availableForSale, material, finish, dimensions, price } =
            variant.node;
          const images = variant.node.product.images.edges.map(
            (image: any) => image.node.url,
          );

          const variantInfo = variantCollection[index];

          return {
            id,
            availableForSale,
            material: material?.value,
            finish: finish?.value,
            dimensions: dimensions?.value,
            price: price.amount,
            currencyCode: getCurrencySymbol(price.currencyCode),
            images,
            variantInfo,
          };
        },
      );

      return {
        id,
        handle,
        title,
        description: descriptionHtml,
        variantsInfo,
        tags,
        variants,
        collections,
      };
    });

    return new Response(
      JSON.stringify({
        status: true,
        message: 'Products fetched',
        data: { products, raw: data.data.data.products.edges },
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
