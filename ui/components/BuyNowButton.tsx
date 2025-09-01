import { useCart } from '#/context/CartContext';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import Colors from '../colors/colors';

const Container = newStyled.div<{ width?: string; height?: string }>`
    height: ${(props) => props.height || '30px'};
    width: ${(props) => props.width || '130px'};
    @media (max-width: 800px) {
        width: ${(props) => props.width || '100px'};
    }
  `;

const AddtoCart = newStyled.button<{ width?: string; height?: string }>`
    height: 100%;
    width: 100%;
    background-color: ${Colors.white};
    font-size: 18px;
    color: ${Colors.black};
    border: 1px solid ${Colors.black};
    border-radius: 3px;
    cursor: pointer;
    &.disabled{
        background-color: grey;
        cursor: not-allowed;
    }
    @media (max-width: 800px) {
        font-size: 14px;
    }
`;

const BuyNowButton = (props: {
  variantId: string;
  inventoryId: string;
  quantityAvailable: number;
  className?: string;
  width?: string;
  height?: string;
}) => {
  const { buyNow } = useCart();
  const router = useRouter();
  const { variantId, inventoryId, quantityAvailable } = props;
  const id = variantId.replace('gid://shopify/ProductVariant/', '');

  return (
    <Container width={props.width} height={props.height}>
      <AddtoCart
        className={`clickable ${props.className} ${quantityAvailable <= 0 ? 'disabled' : ''}`}
        onClick={() => {
          if (quantityAvailable > 0) {
            buyNow(id, inventoryId);
            router.push('/checkout');
          }
        }}
      >
        Buy Now
      </AddtoCart>
    </Container>
  );
};

export default BuyNowButton;
