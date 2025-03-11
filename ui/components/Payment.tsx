import { useEffect } from 'react';

const PaymentComponent = (props: {
  amount?: number;
  orderId?: string;
  onCompletion: (paymentId: string) => void;
}) => {
  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Your key_id, should be public.
          amount: (props?.amount ?? 0) * 100, // Amount in the smallest currency unit
          currency: 'INR',
          name: 'Your Store Name',
          description: 'Payment for your order',
          order_id: props.orderId, // Retrieved from your server
          handler: (response: any) => {
            // Handle successful payment (e.g., verify with server, update order status)
            props.onCompletion(response.razorpay_payment_id);
            paymentObject.close();
            //send the response to your api to verify it, and to update the order in your database.
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '1234567890',
          },
        };
        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
      };
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, [props.amount, props.orderId]);

  return null;
};

export default PaymentComponent;
