import { notFound } from 'next/navigation';
import { db } from '../../../../lib/friebaseAdmin';

export const POST = async (req: Request) => {
  try {
    const { email, otp } = await req.json();
    console.log(otp, email);
    if (!email || !otp) {
      // Render the closest `not-found.js` Error Boundary
      return new Response(
        JSON.stringify({ status: false, message: 'Wrong Payload' }),
        {
          status: 400,
        },
      );
    }
    // Generate a 6-digit OTP
    const userRef = db.doc(`waitlist_users/${email}`);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return new Response(
        JSON.stringify({ status: false, message: 'User not found' }),
        {
          status: 400,
        },
      );
    }

    const userData = userSnap.data();

    if (userData?.otp !== otp) {
      return new Response(
        JSON.stringify({ status: false, message: 'Invalid OTP' }),
        {
          status: 400,
        },
      );
    }

    // Mark user as verified
    await userRef.update({ verified: true });
    return new Response(
      JSON.stringify({ status: true, message: 'Valid OTP' }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error sending OTP:', error);
    notFound();
  }
};
