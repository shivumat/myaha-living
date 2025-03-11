import { useAuth } from '#/context/AuthContext';
import { useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CartItem from '../components/CartItem';

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
  currencySymbol: string;
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
  const { products } = useProduct();

  const EmptyScreen = (
    <div
      style={{
        width: '100%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        padding: '40px 20px',
        color: '#fff',
        backgroundColor: '#5B1D1D',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '22px', fontWeight: '500' }}>
        You haven’t placed an order yet.
      </div>
      <div style={{ fontSize: '16px', fontWeight: '300', opacity: 0.9 }}>
        Explore our selection of premium products and place your first order
        today.
      </div>
      <button
        style={{
          marginTop: '10px',
          backgroundColor: 'black',
          color: '#white',
          fontSize: '16px',
          fontWeight: '500',
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.3s',
        }}
        onClick={() => router.push('/products')}
      >
        Browse Products
      </button>
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
    const widthVar = isMobile ? '100%' : '30%';
    const flexDirection = isMobile ? 'column' : 'row';

    return (
      <div
        key={`order_${index}`}
        style={{
          padding: '30px',
          borderRadius: '12px',
          backgroundColor: '#F1F1F1',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: '20px',
            flexDirection,
            gap: '20px',
          }}
        >
          <div
            style={{
              width: widthVar,
              marginLeft: 'auto',
              display: 'flex',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: '400',
            }}
          >
            Amount
          </div>
        </div>
        {order.lineItems.map((item, i) => {
          const productVariant = products.find(
            (product) =>
              !!item.productId && product.id.includes(item.productId),
          );
          if (!productVariant)
            return (
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  flexDirection,
                  gap: '20px',
                }}
              >
                <div
                  style={{
                    width: widthVar,
                    marginLeft: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: '300',
                  }}
                >
                  {item.title} = {order.currencySymbol} {item.price}
                </div>
              </div>
            );
          const productVariants =
            productVariant?.variants.filter((variant) => {
              return variant.id.includes(item.id);
            }) ?? [];

          const cartProduct = { ...productVariant, variants: productVariants };
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                flexDirection,
                gap: '20px',
              }}
            >
              {!!cartProduct && <CartItem product={cartProduct} />}
              <div
                style={{
                  width: widthVar,
                  marginLeft: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: '300',
                  borderBottom: '0.5px solid gray',
                }}
              >
                x {item.quantity} = {order.currencySymbol}{' '}
                {item.quantity * item.price}
              </div>
            </div>
          );
        })}
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: '20px',
            flexDirection,
            gap: '20px',
          }}
        >
          <div
            style={{
              width: widthVar,
              marginLeft: 'auto',
              display: 'flex',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: '400',
              borderTop: '1px solid black',
            }}
          >
            Total : {order.currencySymbol} {order.totalPrice}
          </div>
        </div>
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
