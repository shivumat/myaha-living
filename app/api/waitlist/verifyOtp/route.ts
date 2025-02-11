import { notFound } from 'next/navigation';
import { db } from '../../../../lib/friebaseAdmin';

export const POST = async (req: Request) => {
  try {
    const { email, otp } = await req.json();
    console.log(otp, email);
    if (!email || !otp) {
      // Render the closest `not-found.js` Error Boundary
      return { status: false, message: 'Invalid OTP' };
    }
    // Generate a 6-digit OTP
    const userRef = db.doc(`waitlist_users/${email}`);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return { status: false, message: 'User not found' };
    }

    const userData = userSnap.data();

    if (userData?.otp !== otp) {
      return { status: false, message: 'Invalid OTP' };
    }

    // Mark user as verified
    await userRef.update({ verified: true });
    return { status: true, message: 'Invalid OTP' };
  } catch (error) {
    console.error('Error sending OTP:', error);
    notFound();
  }
};
