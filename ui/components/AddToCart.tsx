import useCart from '#/hooks/useSession';
import newStyled from '@emotion/styled';

const AddtoCart = newStyled.button`
    height: 30px;
    width: 130px;
    background-color: black;
    font-size: 18px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
    &.view{
        background-color: white;
        color: black;
        border: 1px solid black;
    }
    @media (max-width: 800px) {
        font-size: 14px;
        width: 100px;
    }
`;

const ActiveButtons = newStyled.div`
    height: 30px;
    width: 30px;
    background-color: white;
    color: black;
    border: 1px solid black;
    font-size: 18px;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 800px) {
        font-size: 14px;
    }
`;

const ActiveInput = newStyled.input`
    height: 30px;
    background-color: white;
    width: min-content;
    color: black;
    border: 1px solid black;
    font-size: 18px;
    border-radius: 3px;
    cursor: pointer;
    text-align: center;
    display: flex;
    padding: 0px;
    justify-content: center;
    align-items: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    max-width: 100px;
    margin: 0;
    @media (max-width: 800px) {
        font-size: 14px;
    }
`;

const AddToCart = (props: { variantId: string; className?: string }) => {
  const { addItem, cart, removeItem, setVariantCount } = useCart();
  const cartItem = cart.find((item) => item.variant_id === props.variantId);
  const { variantId } = props;
  const id = variantId.replace('gid://shopify/ProductVariant/', '');
  if (cartItem) {
    return (
      <div className={props.className} style={{ display: 'flex' }}>
        <ActiveButtons onClick={() => removeItem(id)}>-</ActiveButtons>
        <ActiveInput
          style={{ margin: '0px 10px' }}
          type="number"
          value={cartItem.quantity}
          onChange={(e) => {
            setVariantCount(id, Number(e.target.value));
          }}
          inputMode="numeric"
        />
        <ActiveButtons onClick={() => addItem(id)}>+</ActiveButtons>
      </div>
    );
  }
  return (
    <AddtoCart className={props.className} onClick={() => addItem(id)}>
      Add to cart
    </AddtoCart>
  );
};

export default AddToCart;
