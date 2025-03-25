import { useEffect, useRef } from 'react';

const PaymentComponent = (props: {
  amount?: number;
  orderId?: string;
  onCompletion: (paymentId: string) => void;
  email: string;
  customerName: string;
  customerNumber: string;
  onExit?: () => void;
}) => {
  const paymentRef = useRef<any>(null);

  const initRazorpay = () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Your key_id, should be public.
      amount: (props?.amount ?? 0) * 100, // Amount in the smallest currency unit
      currency: 'INR',
      name: 'Your Store Name',
      description: 'Payment for your order',
      handler: (response: any) => {
        props.onCompletion(response.razorpay_payment_id);
      },
      prefill: {
        name: props.customerName,
        email: props.email,
        contact: props.customerNumber,
      },
      modal: {
        escape: true,
        ondismiss: () => {
          // Check and close Razorpay instance
          if (paymentRef.current) {
            paymentRef.current.close();
          }

          if (props.onExit) props.onExit();
        },
      },
    };

    // Store instance in ref
    paymentRef.current = new (window as any).Razorpay(options);
    paymentRef.current.open();
  };

  useEffect(() => {
    const loadRazorpay = async () => {
      if (
        document.querySelector(
          'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
        )
      ) {
        initRazorpay();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = initRazorpay;
      document.body.appendChild(script);
    };

    loadRazorpay();

    return () => {
      if (paymentRef.current) {
        paymentRef.current.close();
      }
    };
  }, [props.amount, props.orderId]);

  return null;
};

export default PaymentComponent;
