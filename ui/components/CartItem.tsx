import { Product } from '#/context/ProductContext';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import AddToCart from './AddToCart';
import VariantContainer from './VariantContainer';

const Container = newStyled.div<{ width: string; background: string }>`
    width: ${({ width }) => width ?? '60%'};
    border-radius: 10px;
    background-color: ${({ background }) => background ?? 'transparent'};
    padding: 20px;
    display: flex;
    gap: 10px;
    @media (max-width: 800px) {
        width: 100%;
        flex-direction: column;
        align-items: center;
    }
`;

const Price = newStyled.div`
    font-size:  18px;
    font-weight: 500;
`;

const StyledAddToCart = newStyled(AddToCart)`
  margin-top: auto;
`;

const CartItem = (props: {
  product: Product;
  showAddtoCart?: boolean;
  width?: string;
  background?: string;
  quantity?: number;
}) => {
  const { product, quantity } = props;
  const imageSrc = props.product.variants[0].images[0];
  const router = useRouter();

  return (
    <Container
      width={props.width ?? '60%'}
      background={props.background ?? 'transparent'}
    >
      <img
        onClick={() =>
          router.push(
            `/product/${product.id.replace('gid://shopify/Product/', '')}`,
          )
        }
        className="clickable"
        width="175px"
        height={'350px'}
        src={imageSrc}
        alt={props.product.title}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
          margin: '10px 0px',
        }}
      >
        <div
          onClick={() =>
            router.push(
              `/product/${product.id.replace('gid://shopify/Product/', '')}`,
            )
          }
          className="clickable"
          style={{ fontSize: '24px', fontWeight: '400' }}
        >
          {props.product.title}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {product.variants[0].variantInfo.map((variant, index) => (
            <div>
              <VariantContainer
                values={[variant.value]}
                key={index}
                activeIndex={index}
                name={variant.name}
              />
            </div>
          ))}
        </div>
        <Price>
          {product.variants[0].currencyCode} {product.variants[0].price}{' '}
          {quantity && `x ${quantity}`}
        </Price>
        {props.showAddtoCart && (
          <StyledAddToCart
            variantId={product.variants[0].id}
            inventoryId={product.variants[0].inventoryId}
          />
        )}
      </div>
    </Container>
  );
};

export default CartItem;
