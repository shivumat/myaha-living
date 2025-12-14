import { useCart } from '#/context/CartContext';
import { useProduct } from '#/context/ProductContext';
import { useToast } from '#/context/ToastContext';
import { useIsMobile } from '#/hooks/useMobile';
import { formatPrice } from '#/lib/util';
import newStyled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';
import Colors from '../colors/colors';
import CartItem from '../components/CartItem';

const SummaryContainer = newStyled.div`
    width: 45%;
    background-color: #dddddd;
    color: ${Colors.black};
    padding: 60px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    jsutify-content: center;
    gap: 10px;
    @media (max-width: 1200px) {
        width: 100%;
        padding: 10px 10px;
    }
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
  border-top: 1px solid #00000033;
  margin: 15px 0;
`;

const Row = newStyled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 10px;
  gap: 20px;
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
  width: 100%;
`;

const PromoInput = newStyled.input`
  padding: 8px;
  width: 100%;
  font-size: 14px;
  border: 1px solid ${Colors.black};
  border-radius: 4px;
  background: transparent;
  color: ${Colors.black};
  outline: none;
`;

const ApplyButton = newStyled.button`
  padding: 8px 12px;
  background: ${Colors.black};
  color: ${Colors.white};
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s;

  &:hover {
    background: #333;
  }
`;

const PromoTag = newStyled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${Colors.white};
  color: ${Colors.black};
  padding: 8px 12px;
  border-radius: 4px;
`;

const RemoveButton = newStyled.button`
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: ${Colors.black};
`;

export interface DiscountObjectType {
  code: string;
  amount: number;
  type: string;
  message?: string;
}

const CheckoutSummary = (props: {
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
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const { cart } = useCart();
  const { products } = useProduct();
  const { startLoading, stopLoading } = useToast();
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
        width={'100%'}
        key={index}
        product={cartProduct}
        quantity={item.quantity}
      />
    );
  };

  const LastStepComp = (
    <>
      {!!props.codCharges && (
        <Row>
          <span>COD charges</span>
          <span>₹ {props.codCharges}</span>
        </Row>
      )}
    </>
  );

  const total = props.total + props.shippingCharges + props.codCharges;

  const onApplyPromo = async () => {
    if (!promoCode.trim()) return;
    startLoading();
    const discount = await props.fetchDiscoutDetails(promoCode);
    stopLoading();
    if (typeof discount === 'string' || discount === null) {
      setPromoError(discount ?? 'Invalid promo code');
      setPromoCode('');
    }
  };

  return (
    <SummaryContainer>
      <div
        style={{
          width: !isMobile ? '70%' : '95%',
          margin: !isMobile ? '70px auto 0px 20px' : '60px auto',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '10px' : '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'transparent',
            gap: '20px',
            width: '100%',
          }}
        >
          {cart.map((item, index) => getOrderComponent(item, index))}
        </div>
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
                  placeholder="Discount code"
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
                  style={{
                    color: Colors.black,
                    fontSize: '12px',
                    display: 'block',
                  }}
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
          <span>₹ {formatPrice(props.total)}</span>
        </Row>
        {props.discountObject && (
          <Row>
            <span>
              Discount{' '}
              {props.discountObject.type === 'percentage'
                ? `(-${props.discountObject.amount})%`
                : ''}
            </span>
            <span>- ₹ {formatPrice(props.discount)}</span>
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
          <span>₹ {formatPrice(total - props.discount)}</span>
        </Row>
      </div>
    </SummaryContainer>
  );
};

export default CheckoutSummary;
