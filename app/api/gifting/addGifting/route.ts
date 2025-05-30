import { notFound } from 'next/navigation';
import { saveData } from '../../../../lib/db/firebaseUtil';

export const POST = async (req: Request) => {
  try {
    const { price, ocassion, name, email, phone } = await req.json();
    if (!email || !name || !phone || !ocassion || !price) {
      // Render the closest `not-found.js` Error Boundary
      return new Response(
        JSON.stringify({ status: false, message: 'Wrong Payload' }),
        {
          status: 400,
        },
      );
    }
    await saveData(
      'gifting',
      {
        price,
        ocassion,
        email,
        name,
        phone,
        createdAt: new Date(),
      },
      email,
    );
    return new Response(
      JSON.stringify({ status: true, message: 'Gifting info added' }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error adding gifting info:', error);
    notFound();
  }
};
