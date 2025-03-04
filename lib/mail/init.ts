import nodemailer from 'nodemailer';

export const sendEmail = async (
  email: string,
  subject: string,
  html: string,
) => {
  try {
    console.log(1);
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use `true` for port 465
      auth: {
        user: process.env.MAILER_EMAIL_ID,
        pass: process.env.MAILER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Helps with self-signed cert issues
      },
      connectionTimeout: 10000, // 10 seconds
      socketTimeout: 10000, // 10 seconds
    });

    console.log(2);
    const mailOptions = {
      from: `"Myaha Team" <${process.env.MAILER_EMAIL_ID}>`,
      to: email,
      subject,
      html,
    };
    console.log(3);
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Error while sending mail to ${email}`, error);
  }
};
