import { Product, useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import Carousel from './Carousel';

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
          isCircle
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
              fontSize: isMobile ? '12px' : '14px',
            }}
            className="clickable"
            onClick={() => openProduct(product)}
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
              fontSize: isMobile ? '12px' : '14px',
            }}
          >
            <div style={{ minWidth: '80px', textAlign: 'left' }}>
              {`${product.variants[0].currencyCode} ${product.variants[0].price}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductWithVariants;
