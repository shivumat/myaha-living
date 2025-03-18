import { Product, useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import AddToCart from './AddToCart';

const Description = newStyled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
`;

const AddtoCart = newStyled.button`
    height: 30px;
    width: 100px;
    background-color: black;
    font-size: 14px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
    &.view{
        background-color: white;
        color: black;
        border: 1px solid black;
    }
    @media (max-width: 800px) {
        font-size: 10px;
        width: 70px;
    }
`;

const ProductWithDetails = (props: { product: Product; isEven: boolean }) => {
  const { product, isEven } = props;
  const isMobile = useIsMobile();
  const { openProduct } = useProduct();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile
          ? 'column-reverse'
          : !isEven
            ? 'row'
            : 'row-reverse',
        gap: '20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        height: isMobile ? 'auto' : '350px',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div
          style={{
            fontSize: '14px',
            fontWeight: '600',
            textAlign: isEven ? 'left' : 'right',
          }}
        >
          {product.title}
        </div>
        <Description
          style={{
            fontSize: '12px',
            fontWeight: 'lighter',
            textAlign: isEven ? 'left' : 'right',
          }}
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginTop: 'auto',
            justifyContent: isEven ? 'flex-start' : 'flex-end',
          }}
        >
          <AddToCart
            variantId={product.variants[0].id}
            inventoryId={product.variants[0].inventoryId}
          />
          <AddtoCart
            className="view clickable"
            onClick={() => openProduct(product)}
          >
            View
          </AddtoCart>
        </div>
      </div>
      <img
        className="clickable"
        onClick={() => openProduct(product)}
        src={product.variants[0].images[0]}
        alt={product.title}
        style={{
          height: isMobile ? '70%' : '100%',
          width: isMobile ? '70%' : '200px',
        }}
      />
    </div>
  );
};

export default ProductWithDetails;
