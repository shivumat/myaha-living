import { notFound } from 'next/navigation';
import { saveData } from '../../../../lib/db/firebaseUtil';

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    if (!data.id) {
      // Render the closest `not-found.js` Error Boundary
      return new Response(
        JSON.stringify({ status: false, message: 'Wrong Payload' }),
        {
          status: 400,
        },
      );
    }
    await saveData('orders', { ...data }, data.id);
    return new Response(
      JSON.stringify({
        status: true,
        message: 'Order added',
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error adding order:', error);
    notFound();
  }
};
