import { useCart } from '#/context/CartContext';
import { useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';
import CartItem from '../components/CartItem';

const SummaryContainer = newStyled.div`
    width: 500px;
    background-color: #192211;
    color: white;
    padding: 60px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    jsutify-content: center;
    gap: 10px;
    @media (max-width: 1200px) {
        width: 100%;
        padding: 40px 10px;
    }
`;

const Title = newStyled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

// const PromoSection = newStyled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   font-size: 14px;
//   cursor: pointer;
// `;

const Divider = newStyled.hr`
  border: 0;
  border-top: 1px solid #ffffff33;
  margin: 15px 0;
`;

const Row = newStyled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 10px;
  gap: 20px;
  @media (max-width: 800px) {
    font-size: 12px;
  }
`;

const CheckoutButton = newStyled.button`
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1px solid white;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.3s;

  &:hover {
    background: white;
    color: black;
  }
`;

const PromoSection = newStyled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;

const PromoInputContainer = newStyled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PromoInput = newStyled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid white;
  border-radius: 4px;
  background: transparent;
  color: white;
  outline: none;
`;

const ApplyButton = newStyled.button`
  padding: 8px 12px;
  background: white;
  color: black;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s;

  &:hover {
    background: #ccc;
  }
`;

const PromoTag = newStyled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  color: black;
  padding: 8px 12px;
  border-radius: 4px;
`;

const RemoveButton = newStyled.button`
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: black;
`;

export interface DiscountObjectType {
  code: string;
  amount: number;
  type: string;
  message?: string;
}

const CheckoutSummary = (props: {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  total: number;
  shippingCharges: number;
  codCharges: number;
  discountObject: DiscountObjectType | null;
  setDiscountObject: Dispatch<SetStateAction<DiscountObjectType | null>>;
  fetchDiscoutDetails: (
    code: string,
  ) => Promise<DiscountObjectType | string | null>;
  discount: number;
}) => {
  const { index, setIndex } = props;
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const { cart } = useCart();
  const { products } = useProduct();
  const isMobile = useIsMobile();

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
      <CartItem
        width={'90%'}
        key={index}
        product={cartProduct}
        quantity={item.quantity}
      />
    );
  };

  const LastStepComp =
    index === 2 ? (
      <>
        {!!props.codCharges && (
          <Row>
            <span>COD charges</span>
            <span>₹ {props.codCharges}</span>
          </Row>
        )}
      </>
    ) : null;

  const total =
    index === 2
      ? props.total + props.shippingCharges + props.codCharges
      : props.total;

  const onApplyPromo = async () => {
    if (!promoCode.trim()) return;
    const discount = await props.fetchDiscoutDetails(promoCode);
    if (typeof discount === 'string' || discount === null) {
      setPromoError(discount ?? 'Invalid promo code');
      setPromoCode('');
    }
  };

  return (
    <SummaryContainer>
      <div
        style={{
          margin: !isMobile ? '70px auto auto' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '10px' : '20px',
        }}
      >
        <Title>Summary</Title>
        <PromoSection>
          {!props.discountObject ? (
            <>
              <PromoInputContainer>
                <PromoInput
                  type="text"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoError('');
                    setPromoCode(e.target.value);
                  }}
                  placeholder="Enter promo code"
                />
                <ApplyButton
                  onClick={onApplyPromo}
                  disabled={!promoCode.trim()}
                >
                  Apply
                </ApplyButton>
              </PromoInputContainer>
              {promoError && (
                <span
                  style={{ color: 'white', fontSize: '12px', display: 'block' }}
                >
                  {promoError}
                </span>
              )}
            </>
          ) : (
            <PromoTag>
              {props.discountObject.code}
              <RemoveButton onClick={() => props.setDiscountObject(null)}>
                &times;
              </RemoveButton>
            </PromoTag>
          )}
        </PromoSection>
        <Divider />
        <Row>
          <span>Subtotal</span>
          <span>₹ {props.total}</span>
        </Row>
        {props.discountObject && (
          <Row>
            <span>
              Discount{' '}
              {props.discountObject.type === 'percentage'
                ? `(-${props.discountObject.amount})%`
                : ''}
            </span>
            <span>- ₹ {props.discount}</span>
          </Row>
        )}
        <Row>
          <span>Shipping charges</span>
          <span>Free shipping</span>
        </Row>
        {LastStepComp}
        <Divider />
        <Row>
          <span>Total</span>
          <span>₹ {total - props.discount}</span>
        </Row>
        {index === 0 ? (
          <CheckoutButton
            className="clickable"
            disabled={!total}
            onClick={() => setIndex((prev) => prev + 1)}
          >
            Checkout
          </CheckoutButton>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'transparent',
              gap: '20px',
              width: '100%',
              maxHeight: isMobile ? '40vh' : '50vh',
              overflowY: 'auto',
            }}
          >
            {cart.map((item, index) => getOrderComponent(item, index))}
          </div>
        )}
      </div>
    </SummaryContainer>
  );
};

export default CheckoutSummary;
