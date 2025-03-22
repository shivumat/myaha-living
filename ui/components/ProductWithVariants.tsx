import { Product, useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import Carousel from './Carousel';

const AddtoCart = newStyled.button`
    height: 30px;
    width: 100px;
    background-color: black;
    font-size: 14px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
    margin-left: auto;
    &.view{
        background-color: white;
        color: black;
        border: 1px solid black;
    }
    @media (max-width: 800px) {
        font-size: 12px;
        width: 70px;
    }
`;

const StyleCarousel = newStyled(Carousel)`
    cursor: pointer;
`;

const ProductWithVariants = (props: { product: Product }) => {
  const { product } = props;
  const isMobile = useIsMobile();

  const { openProduct } = useProduct();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '450px',
        margin: '0px auto 20px',
      }}
    >
      <div
        style={{
          width: isMobile ? '100%' : '75%',
          margin: '10px auto',
        }}
      >
        <StyleCarousel
          onClick={() => openProduct(product)}
          height={'100%'}
          images={product.variants[0].images}
        />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '10px',
          justifyContent: 'space-between',
          alignItems: 'basline',
          height: '60px',
          width: isMobile ? '100%' : '80%',
          margin: '10px auto',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'space-between',
              width: '100%',
              fontSize: '14px',
            }}
          >
            {`${product.title}`}{' '}
          </div>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              fontSize: '14px',
            }}
          >
            <strong
              style={{ minWidth: '80px', textAlign: 'left' }}
            >{`${product.variants[0].currencyCode} ${product.variants[0].price}`}</strong>
            <AddtoCart
              className="view clickable"
              onClick={() => openProduct(product)}
            >
              View
            </AddtoCart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductWithVariants;
