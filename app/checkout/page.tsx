'use client';
import { useAuth } from '#/context/AuthContext';
import { useCart } from '#/context/CartContext';
import { useProduct } from '#/context/ProductContext';
import { OrderPayloadType } from '#/lib/types/order';
import Userform from '#/ui/checkout/Address';
import CheckoutSidebar from '#/ui/checkout/CheckoutSidebar';
import OrderList from '#/ui/checkout/OrderList';
import Payment from '#/ui/checkout/Payment';
import newStyled from '@emotion/styled';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Container = newStyled.div`
  display: flex;
  min-height: 100vh;
  @media (max-width: 1200px) {
    flex-direction: column-reverse;
  }
`;

interface DBOrderType extends OrderPayloadType {
  status: string;
  id: string;
}

const Checkout = () => {
  const shippingCharges = 80;
  const [orderObj, setOrderObj] = useState<DBOrderType | null>(null);
  const [index, setIndex] = useState(0);
  const [codCharges, setCodCharges] = useState(0);
  const { userDetails } = useAuth();

  const [note, setNote] = useState('');
  const [email, setEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState<
    OrderPayloadType['shipping_address']
  >({
    first_name: '',
    last_name: '',
    address1: '',
    phone: '',
    city: '',
    province: '',
    country: '',
    zip: '',
  });
  const [sameAsShipping, setChecked] = useState(true);
  const [billingAddress, setBillingAddress] = useState<
    OrderPayloadType['billing_address']
  >({
    first_name: '',
    last_name: '',
    address1: '',
    phone: '',
    city: '',
    province: '',
    country: '',
    zip: '',
  });

  const { cart, clear } = useCart();
  const { products } = useProduct();

  const total = cart.reduce((acc, item) => {
    const product = products.find((product) =>
      product.variants?.some((v) => v.id.includes(item.variant_id)),
    );
    if (!product) return acc;
    const variant = product.variants?.find((v) =>
      v.id.includes(item.variant_id),
    );
    if (!variant) return acc;

    return acc + (Number(variant.price) ?? 0) * item.quantity;
  }, 0);

  const createDBOrder = async () => {
    let newOrderObj: DBOrderType = {
      variants: cart,
      shipping_address: shippingAddress,
      billing_address: sameAsShipping ? shippingAddress : billingAddress,
      customerInfo: {
        email: userDetails?.email ?? email,
      },
      note,
      shippingCharges: shippingCharges,
      status: 'pending',
      id: `order_${uuidv4().replace(/-/g, '')}`,
    };
    if (!!orderObj) {
      newOrderObj = { ...newOrderObj, id: orderObj.id };
      setOrderObj(newOrderObj);
      return;
    }
    setOrderObj(newOrderObj);
  };

  const onPaymentCompletion = async (paymentId: string) => {
    let newOrderObj: DBOrderType;
    const isCOD = !paymentId;
    if (!!orderObj) {
      newOrderObj = {
        ...orderObj,
        status: isCOD ? 'cod' : 'paid',
        razor_pay_id: paymentId ?? '',
      };
    }
    newOrderObj = {
      variants: cart,
      shipping_address: shippingAddress,
      billing_address: sameAsShipping ? shippingAddress : billingAddress,
      customerInfo: {
        email: userDetails?.email ?? email,
      },
      note,
      shippingCharges: shippingCharges,
      id: `order_${uuidv4().replace(/-/g, '')}`,
      status: isCOD ? 'cod' : 'paid',
      razor_pay_id: paymentId ?? '',
    };
    if (isCOD) {
      newOrderObj = { ...newOrderObj, codCharges: codCharges };
    }
    setOrderObj(newOrderObj);
    const response = await fetch('/api/shopify/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOrderObj),
    });
    const data = await response.json();
    const shopifyOrderId = data.data.orderId;

    await fetch('/api/order/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...newOrderObj, shopifyOrderId }),
    });

    clear();
    setOrderObj(null);
    window.location.href = `/?orderCreated=${newOrderObj.id}`;
  };

  return (
    <>
      <Container>
        {index === 0 && <OrderList note={note} setNote={setNote} />}
        {index === 1 && (
          <Userform
            nextStep={setIndex}
            email={email}
            setEmail={setEmail}
            sameAsShipping={sameAsShipping}
            setChecked={setChecked}
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
            billingAddress={billingAddress}
            setBillingAddress={setBillingAddress}
            createDBOrder={createDBOrder}
          />
        )}
        {index === 2 && orderObj && (
          <Payment
            nextStep={setIndex}
            onPaymentCompletion={onPaymentCompletion}
            email={orderObj.customerInfo.email}
            shippingCharges={shippingCharges}
            amount={total}
            orderId={orderObj.id}
            codCharges={codCharges}
            setCodCharges={setCodCharges}
          />
        )}

        <CheckoutSidebar
          total={total}
          index={index}
          setIndex={setIndex}
          shippingCharges={shippingCharges}
          codCharges={codCharges}
        />
      </Container>
    </>
  );
};

export default Checkout;
