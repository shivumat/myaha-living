import { Product, useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import Colors from '../colors/colors';
import Carousel from './Carousel';
import ShopifyPrice from './ShopifyPrice';

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
        height: !isMobile ? '600px' : '350px',
        margin: '0px auto 20px',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          margin: '10px auto',
        }}
      >
        <StyleCarousel
          onClick={() => openProduct(product)}
          height={'100%'}
          className="clickable"
          images={product.variants[0].images}
          isCircle
          hoverScroll
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
          margin: '10px 0px',
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
              color: Colors.black,
            }}
            className="clickable hover_underline"
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
              <ShopifyPrice
                fontSize="16px"
                currency={product.variants[0].currencyCode}
                price={product.variants[0].price}
                compareAtPrice={product.variants[0]?.compareAtPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductWithVariants;
