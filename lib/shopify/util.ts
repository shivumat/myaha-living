export async function shopifyFetch(payload: {
  query: string;
  variables?: any;
}) {
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  try {
    const response = await fetch(
      `https://myahaliving.myshopify.com/api/2025-01/graphql.json `,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(key && { 'X-Shopify-Storefront-Access-Token': key }),
        },
        body: JSON.stringify({
          query: payload.query,
          variables: payload.variables,
        }),
      },
    );
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Error:', error);
    return {
      status: 500,
      error: 'Error receiving data',
    };
  }
}
