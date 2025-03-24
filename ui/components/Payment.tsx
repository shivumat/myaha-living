import { useEffect } from 'react';

const PaymentComponent = (props: {
  amount?: number;
  orderId?: string;
  onCompletion: (paymentId: string) => void;
  email: string;
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
          handler: (response: any) => {
            // Handle successful payment (e.g., verify with server, update order status)
            props.onCompletion(response.razorpay_payment_id);
            //send the response to your api to verify it, and to update the order in your database.
          },
          prefill: {
            name: '',
            email: props.email,
            contact: '',
          },
        };
        let paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
      };
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, [props.amount, props.orderId]);

  return null;
};

export default PaymentComponent;
