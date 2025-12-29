// lib/metaCapi.ts
import crypto from 'crypto';

export async function sendPurchaseToMeta({
  eventId,
  email,
  phone,
  value,
  currency,
  contentIds,
  eventSourceUrl,
}: {
  eventId: string;
  email?: string;
  phone?: string;
  value: number;
  currency: string;
  contentIds: string[];
  eventSourceUrl: string;
}) {
  // 🔒 Block UAT / Preview
  if (process.env.NEXT_PUBLIC_ENABLE_META_PIXEL !== 'true') return;

  const payload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: 'website',
        event_source_url: eventSourceUrl,
        user_data: {
          em: email
            ? crypto.createHash('sha256').update(email).digest('hex')
            : undefined,
          ph: phone
            ? crypto.createHash('sha256').update(phone).digest('hex')
            : undefined,
        },
        custom_data: {
          currency,
          value,
          content_ids: contentIds,
          content_type: 'product',
        },
      },
    ],
  };

  await fetch(
    `https://graph.facebook.com/v18.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
  );
}
