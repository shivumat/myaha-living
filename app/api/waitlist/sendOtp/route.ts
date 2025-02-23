import nodemailer from 'nodemailer';
import { db } from '../../../../lib/friebaseAdmin';

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

    // Send OTP via Email (Using Nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hello@myahaliving.com',
        pass: 'cmbowfdvtwerhkqe',
      },
    });

    const htmlEmail = `
      <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; color: #333;">
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center;">
          <h2 style="color: #5F1E1E;">Welcome to Myaha!</h2>
          <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>
          <p style="font-size: 16px;">Your OTP for Myaha waitlist registration is:</p>
          <h1 style="background: #5F1E1E; color: #ffffff; display: inline-block; padding: 10px 20px; border-radius: 5px;">
            ${otp}
          </h1>
          <hr style="border: 0; height: 1px; background: #ddd; margin: 20px 0;">
          <p style="font-size: 14px; color: #555;">If you didn’t request this, please ignore this email.</p>
          <p style="font-size: 14px;">Best,<br><strong>The Myaha Team</strong></p>
        </div>
      </div>
    `;

    // Email options
    const mailOptions = {
      from: `"Myaha Team" <hello@myahaliving.com>`,
      to: email,
      subject: 'Your OTP for Myaha Waitlist',
      html: htmlEmail, // HTML content
    };

    await transporter.sendMail(mailOptions);

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
