import { useCart } from '#/context/CartContext';
import { trackMeta } from '#/lib/util';
import newStyled from '@emotion/styled';
import { useState } from 'react';
import Colors from '../colors/colors';

const Container = newStyled.div<{ width?: string; height?: string }>`
    height: ${(props) => props.height || '30px'};
    width: ${(props) => props.width || '130px'};
    margin-top: 10px;
    @media (max-width: 800px) {
        width: ${(props) => props.width || '100px'};
    }
  `;

const AddtoCart = newStyled.button<{ width?: string; height?: string }>`
    height: 100%;
    width: 100%;
    background-color: ${Colors.black};
    font-size: 18px;
    color: ${Colors.white};
    border-radius: 3px;
    cursor: pointer;
    &.view{
        background-color: ${Colors.black};
        color: ${Colors.black};
        border: 1px solid ${Colors.black};
    }
    &.disabled{
        background-color: grey;
        cursor: not-allowed;
    }
    @media (max-width: 800px) {
        font-size: 14px;
    }
`;

const ActiveButtons = newStyled.div`
    height: 30px;
    width: 30px;
    background-color: ${Colors.white};
    color: ${Colors.black};
    border: 1px solid ${Colors.black};
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
    background-color: ${Colors.white};
    width: min-content;
    color: ${Colors.black};
    border: 1px solid ${Colors.black};
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

const ErrorMessage = newStyled.div`
    color: red;
    font-size: 14px;
    @media (max-width: 800px) {
        font-size: 12px;
    }
`;

const WarningMessage = newStyled.div`
    color: #FF5F15;
    font-size: 16px;
    @media (max-width: 800px) {
        font-size: 14px;
    }
`;

const AddToCart = (props: {
  variantId: string;
  variantPrice: string;
  inventoryId: string;
  quantityAvailable: number;
  className?: string;
  width?: string;
  height?: string;
}) => {
  const { addItem, cart, removeItem, setVariantCount, toggleCart } = useCart();
  const [error, setError] = useState('');
  const cartItem = cart.find((item) =>
    props.variantId.includes(item.variant_id),
  );
  const { variantId, inventoryId, quantityAvailable } = props;
  const id = variantId.replace('gid://shopify/ProductVariant/', '');

  if (cartItem) {
    return (
      <>
        <div
          className={props.className}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ display: 'flex' }}>
            <ActiveButtons
              className="clickable"
              onClick={() => {
                setError('');
                removeItem(id);
              }}
            >
              -
            </ActiveButtons>
            <ActiveInput
              style={{ margin: '0px 10px' }}
              type="number"
              value={cartItem.quantity}
              onChange={(e) => {
                const newQuantity = Number(e.target.value);
                if (newQuantity <= quantityAvailable) {
                  setVariantCount({
                    variant_id: id,
                    count: newQuantity,
                    inventoryId,
                  });
                  console.log(
                    'Variant count set to:',
                    Number(props.variantPrice.replace(/[^0-9.]/g, '')),
                  );
                  // 🔥 Meta AddToCart (increment)
                  trackMeta('AddToCart', {
                    content_ids: [
                      props.variantId.replace(
                        'gid://shopify/ProductVariant/',
                        '',
                      ),
                    ],
                    content_type: 'product',
                    value: Number(props.variantPrice.replace(/[^0-9.]/g, '')), // see note below
                    currency: 'INR',
                  });

                  setError('');
                } else {
                  setError('Cannot add more than available quantity');
                }
              }}
              inputMode="numeric"
            />
            <ActiveButtons
              className="clickable"
              onClick={() => {
                if (cartItem.quantity < quantityAvailable) {
                  addItem({ variant_id: id, inventoryId });
                  setError('');
                } else {
                  setError('Cannot add more than available quantity');
                }
              }}
            >
              +
            </ActiveButtons>
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
        {quantityAvailable <= 0 && <ErrorMessage>Out of Stock</ErrorMessage>}
        {quantityAvailable > 0 && quantityAvailable <= 3 && (
          <WarningMessage>
            Only {quantityAvailable} left in stock!
          </WarningMessage>
        )}
      </>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      {quantityAvailable <= 0 && <ErrorMessage>Out of Stock</ErrorMessage>}
      {quantityAvailable > 0 && quantityAvailable <= 3 && (
        <WarningMessage>Only {quantityAvailable} left in stock!</WarningMessage>
      )}
      <Container width={props.width} height={props.height}>
        <AddtoCart
          className={`clickable ${props.className} ${quantityAvailable <= 0 ? 'disabled' : ''}`}
          onClick={() => {
            if (quantityAvailable > 0) {
              addItem({ variant_id: id, inventoryId });
              toggleCart();
            }
          }}
        >
          Add to cart
        </AddtoCart>
      </Container>
    </div>
  );
};

export default AddToCart;
