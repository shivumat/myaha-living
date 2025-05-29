import { notFound } from 'next/navigation';
import { saveData } from '../../../../lib/db/firebaseUtil';

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();
    if (!email) {
      // Render the closest `not-found.js` Error Boundary
      return new Response(
        JSON.stringify({ status: false, message: 'Wrong Payload' }),
        {
          status: 400,
        },
      );
    }
    await saveData(
      'subscriber_emails',
      {
        email,
        createdAt: new Date(),
      },
      email,
    );

    return new Response(
      JSON.stringify({ status: true, message: 'Email added' }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error adding email:', error);
    notFound();
  }
};
