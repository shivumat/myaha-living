import { useCart } from '#/context/CartContext';
import { useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import CartItem from '../components/CartItem';
import Note from './Note';

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

interface OrderListProps {
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
}

const OrderList: React.FC<OrderListProps> = ({ note, setNote }) => {
  const { cart } = useCart();
  const router = useRouter();

  const { products } = useProduct();
  const isMobile = useIsMobile();

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
        You haven’t added anything in the cart yet.
      </div>
      <div style={{ fontSize: '16px', fontWeight: '300', opacity: 0.9 }}>
        Explore our selection of premium products and place your first order
        today.
      </div>
      <button
        style={{
          marginTop: '10px',
          backgroundColor: 'transparent',
          color: 'white',
          fontSize: '16px',
          fontWeight: '500',
          padding: '10px 20px',
          borderRadius: '8px',
          border: '1px solid white',
          cursor: 'pointer',
          transition: 'background 0.3s',
        }}
        onClick={() => router.push('/products')}
      >
        Browse Products
      </button>
    </div>
  );

  if (cart.length === 0) {
    return <FormContainer>{EmptyScreen}</FormContainer>;
  }

  const getOrderComponent = (
    item: { variant_id: string; quantity: number },
    index: number,
  ) => {
    const product = products.find((p) =>
      p.variants.some((v) => v.id.includes(item.variant_id)),
    );
    if (!product) return null;
    const productVariants =
      product?.variants.filter((variant) => {
        return variant.id.includes(item.variant_id);
      }) ?? [];

    const cartProduct = { ...product, variants: productVariants };
    return (
      <div
        key={index}
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexDirection,
          gap: '20px',
        }}
      >
        <CartItem product={cartProduct} showAddtoCart />
        <div
          style={{
            width: widthVar,
            marginLeft: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '160x',
            fontWeight: '400',
          }}
        >
          {productVariants[0].currencyCode}{' '}
          {Number(productVariants[0].price) * item.quantity}
        </div>
      </div>
    );
  };

  const widthVar = isMobile ? '100%' : '30%';
  const flexDirection = isMobile ? 'column' : 'row';

  return (
    <FormContainer>
      {!isMobile && (
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: '20px',
            flexDirection,
            gap: '20px',
            padding: '20px 0px',
          }}
        >
          <div
            style={{
              width: widthVar,
              display: 'flex',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: '400',
            }}
          >
            Products
          </div>
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
            Total
          </div>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
        }}
      >
        {cart.map((item, index) => getOrderComponent(item, index))}
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <Note note={note} setNote={setNote} />
      </div>
    </FormContainer>
  );
};

export default OrderList;
