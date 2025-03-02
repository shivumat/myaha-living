import nodemailer from 'nodemailer';

export const sendEmail = async (
  email: string,
  subject: string,
  html: string,
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_EMAIL_ID,
      pass: process.env.MAILER_PASSWORD,
    },
  });
  const mailOptions = {
    from: `"Myaha Team" <${process.env.MAILER_EMAIL_ID}>`,
    to: email,
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};
