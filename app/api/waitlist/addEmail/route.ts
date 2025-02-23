import { notFound } from 'next/navigation';
import { db } from '../../../../lib/friebaseAdmin';

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
    await db.doc(`waitlist_users/${email}`).set({
      email,
      name: email,
      otp: '111111',
      verified: false,
      createdAt: new Date(),
    });

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
