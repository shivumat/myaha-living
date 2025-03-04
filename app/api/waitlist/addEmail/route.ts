import { notFound } from 'next/navigation';
import { saveData } from '../../../../lib/db/firebaseUtil';
import { sendEmail } from '../../../../lib/mail/init';

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
      'waitlist_users',
      {
        email,
        name: email,
        otp: '111111',
        verified: false,
        createdAt: new Date(),
      },
      email,
    );

    const htmlEmail = `
      <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; color: #333;">
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
          <div style="text-align: center;">
            <h2 style="color: #5F1E1E;">The Wait is Almost Over!</h2>
          </div>
          <div>
            <p style="font-size: 16px;">Hey,</p>
            <p style="font-size: 16px;">We’re putting the final touches on something truly special for you. Since you’re on our waitlist, you’ll be among the first to know when <strong>Myaha’s first collection</strong> goes live!</p>
            <p style="font-size: 16px;">As a thank-you for signing up, enjoy an <strong>exclusive 15% off</strong> on your first order!</p>
            <p style="font-size: 16px;">Get ready to elevate your space with elegance and craftsmanship like never before.</p>
            <hr style="border: 0; height: 1px; background: #ddd; margin: 20px 0;">
            <p style="font-size: 14px; color: #555;"><em>P.S. Keep an eye on your inbox – your special discount code is coming your way soon!</em></p>
            <p style="font-size: 14px;">See you soon,<br><strong>Team Myaha</strong></p>
          </div>
        </div>
      </div>
    `;

    console.log('Sending email to:', email);

    await sendEmail(
      email,
      'The Wait is Almost Over – Exclusive 15% Off Inside!',
      htmlEmail,
    );
    console.log('Sent email to:', email);
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
