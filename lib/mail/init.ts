import nodemailer from 'nodemailer';

export const sendEmail = async (
  email: string,
  subject: string,
  html: string,
) => {
  try {
    console.log(1);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT ?? '', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.MAILER_EMAIL_ID,
        pass: process.env.MAILER_PASSWORD,
      },
      logger: true,
      debug: true,
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
