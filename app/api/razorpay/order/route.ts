import { notFound } from 'next/navigation';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export const POST = async (req: Request) => {
  const { amount, receipt } = await req.json();

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: receipt ?? 'receipt_order_' + Date.now(),
      payment_capture: true, // <-- this ensures auto-capture
    });

    return new Response(JSON.stringify(order), {
      status: 200,
    });
  } catch (error) {
    console.error('Error creating razorpay order:', error);
    notFound();
  }
};
