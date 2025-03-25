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

export async function shopifyAdminFetch(payload: {
  query: string;
  variables?: any;
}) {
  const key = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

  try {
    const response = await fetch(
      `https://hvs7sw-ki.myshopify.com/admin/api/2024-04/graphql.json `,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(key && { 'X-Shopify-Access-Token': key }),
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

import { LATEST_API_VERSION, shopifyApi } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';

export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY ?? '',
  apiSecretKey: process.env.SHOPIFY_SECRET_KEY ?? '',
  hostName: process.env.SHOPIFY_STORE_DOMAIN ?? '',
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
});
