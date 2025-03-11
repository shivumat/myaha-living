import { useAuth } from '#/context/AuthContext';
import { useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const FormContainer = newStyled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  @media (max-width: 800px) {
    padding: 20px;
    }
`;

interface Order {
  totalPrice: string;
  lineItems: {
    title: string;
    quantity: number;
    price: number;
    id: string;
    productId?: string;
  }[];
}

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const { userDetails } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userDetails) return;
    const email = 'himanshu@gmail.com';
    // const { email} = userDetails;
    setLoading(true);
    fetch('/api/shopify/fetchOrders', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
        setLoading(false);
      });
  }, [userDetails]);

  const isMobile = useIsMobile();
  useProduct();

  const EmptyScreen = (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        padding: '40px 10px',
        color: 'white',
        backgroundColor: '#5B1D1D',
        borderRadius: '10px',
        border: '1px solid #e0e0e0',
        margin: 'auto',
      }}
    >
      <div style={{ fontSize: '20px', fontWeight: '400' }}>
        No order placed by you yet
      </div>
      <div style={{ fontSize: '16px', fontWeight: 'lighter' }}>
        Please{' '}
        <span
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => router.push('/products')}
        >
          shop
        </span>{' '}
        with Myaha!
      </div>
    </div>
  );

  if (orders.length === 0) {
    return (
      <FormContainer>
        {loading ? (
          <Image
            style={{ margin: 'auto' }}
            src={'/images/loading-buffering.gif'}
            alt="loading"
            width={50}
            height={50}
          />
        ) : (
          EmptyScreen
        )}
      </FormContainer>
    );
  }

  const getOrderComponent = (order: Order, index: number) => {
    console.log(order);
    return (
      <div
        key={`order_${index}`}
        style={{
          padding: '30px',
          borderRadius: '12px',
          backgroundColor: '#F1F1F1',
        }}
      >
        {order.lineItems.map((item, i) => {
          return (
            <div key={i}>
              {item.title}
              {item.quantity}
              {item.price}
            </div>
          );
        })}
        {order.totalPrice}
      </div>
    );
  };

  return (
    <FormContainer>
      <h2
        style={{
          fontSize: isMobile ? '20px' : '28px',
          fontWeight: '500',
          marginBottom: isMobile ? '30px' : '60px',
        }}
      >
        Order History
      </h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
          maxHeight: '75vh',
          overflowY: 'auto',
        }}
      >
        {orders.map((order, index) => getOrderComponent(order, index))}
      </div>
    </FormContainer>
  );
};

export default OrderList;
