import { notFound } from 'next/navigation';
import { getData } from '../../../../lib/db/firebaseUtil';

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
    const orderDetails = await getData('orders', data.id);
    return new Response(
      JSON.stringify({
        status: true,
        message: 'Order fetched',
        orderDetails,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error fetching order:', error);
    notFound();
  }
};
