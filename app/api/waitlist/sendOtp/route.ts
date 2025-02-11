import { Resend } from 'resend';
import { db } from '../../../../lib/friebaseAdmin';
const resend = new Resend('re_8XMhkdp7_JP4UkkL2KScfwYMEXcsHAnyK');

export const POST = async (req: Request) => {
  try {
    const { email, name } = await req.json();
    console.log(name, email);

    if (!email || !name) {
      // Render the closest `not-found.js` Error Boundary
      return new Response(
        JSON.stringify({ status: false, message: 'Wrong payload' }),
        { status: 200 },
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to Firestore (overwrite existing if any)
    await db.doc(`waitlist_users/${email}`).set({
      email,
      name,
      otp,
      verified: false,
      createdAt: new Date(),
    });

    const emailRes = await resend.emails.send({
      from: 'Myaha <onboarding@resend.dev>',
      to: [email],
      subject: 'Your OTP for Myaha Waitlist',
      html: `Hello ${name},\n\nYour OTP for Myaha waitlist registration is: ${otp}\n\nThis OTP is valid for 10 minutes.\n\nBest,\nThe Myaha Team`,
    });

    console.log(emailRes);
    return new Response(JSON.stringify({ message: 'OTP Sent Successfully!' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return new Response(
      JSON.stringify({ message: 'Error while sending otp!' }),
      { status: 400 },
    );
  }
};
