import { shopifyAdminFetch, shopifyFetch } from '#/lib/shopify/util';
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
        images(first: 20, sortKey: POSITION) {
          edges {
              node {
                id
                url
                
              }
          }
        }
        careGuide: metafield(namespace: "custom", key: "care_guide") {
          value
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
                price {
                    amount
                    currencyCode
                }
                compareAtPrice{
                    amount
                    currencyCode
                }
                image {
                  url
                }
                quantityAvailable

            }
          } 
        }
      }
    }
  }
}`;

    const inventoryQuery = `{
      inventoryItems(first: 200) {
        edges {
          node {
            id
            variant{
              id
            }
          }
        }
      }
    }`;

    const data = await shopifyFetch({ query });
    const inventoryData = await shopifyAdminFetch({ query: inventoryQuery });
    const inventoryItems = inventoryData.data.data.inventoryItems.edges.map(
      (item: any) => {
        return { id: item.node.id, variantId: item.node.variant.id };
      },
    );

    const products = data.data.data.products.edges.map((product: any) => {
      const { id, handle, title, descriptionHtml, options, tags, careGuide } =
        product.node;
      const variantsInfo: { name: string; values: string[] }[] = options.map(
        (option: any) => {
          return { name: option.name, values: option.values };
        },
      );

      const images = product.node.images.edges.map((image: any) => {
        return `${image.node.url}.webp`;
      });

      const variantCollection = generateCombinations(variantsInfo);

      const collections = product.node.collections.edges.map(
        (collection: any) => {
          const { title, id } = collection.node;
          return { title, id };
        },
      );
      const variants = product.node.variants.edges.map(
        (variant: any, index: number) => {
          const {
            id,
            availableForSale,
            material,
            finish,
            dimensions,
            price,
            compareAtPrice,
            quantityAvailable,
            image,
          } = variant.node;

          const variantImages: string[] = image
            ? [`${image.url}.webp`, ...images]
            : images;

          const variantInfo = variantCollection[index];

          const inventoryItem = inventoryItems.find(
            (item: any) => item.variantId === id,
          );

          return {
            id,
            availableForSale,
            material: material?.value,
            finish: finish?.value,
            dimensions: dimensions?.value,
            price: price.amount,
            compareAtPrice: compareAtPrice?.amount,
            currencyCode: getCurrencySymbol(price.currencyCode),
            images: variantImages.filter(
              (item, index, arr) => arr.indexOf(item) === index,
            ),
            variantInfo,
            inventoryId: inventoryItem?.id?.replace(
              'gid://shopify/InventoryItem/',
              '',
            ),
            quantityAvailable,
          };
        },
      );

      return {
        id,
        handle,
        title,
        description: descriptionHtml,
        variantsInfo,
        careGuide: careGuide?.value,
        tags,
        variants,
        collections,
        images,
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
