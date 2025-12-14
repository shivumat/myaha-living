import { Product, useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import Colors from '../colors/colors';
import Carousel from './Carousel';
import Container from './ContainerBox';
import ShopifyPrice from './ShopifyPrice';

const Description = newStyled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
`;

const AddtoCart = newStyled.button`
    height: 40px;
    width: 160px;
    background-color: ${Colors.black};
    font-size: 16px;
    color: ${Colors.white};
    border-radius: 3px;
    cursor: pointer;
    &.view{
        background-color: ${Colors.white};
        color: ${Colors.black};
        border: 1px solid ${Colors.black};
    }
    @media (max-width: 800px) {
        font-size: 10px;
        width: 150px;
    }
`;

const ProductWithDetails = (props: {
  product: Product;
  isEven: boolean;
  getGrandparentWidth: () => number;
}) => {
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
        padding: '20px 10px 0px',
        height: 'auto',
        minWidth: `${props.getGrandparentWidth()}px`,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: isMobile ? '100%' : 'calc(100% - 400px)',
          marginLeft: isMobile ? '0px' : '20px',
        }}
      >
        <div
          onClick={() => openProduct(product)}
          className="clickable hover_underline"
          style={{
            fontSize: '18px',
            fontWeight: '600',
            textAlign: isEven ? 'left' : 'right',
          }}
        >
          {product.title}
        </div>
        <Description
          style={{
            fontSize: '16px',
            fontWeight: 'lighter',
            textAlign: isEven ? 'left' : 'right',
          }}
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <ShopifyPrice
          currency={product.variants[0].currencyCode}
          price={product.variants[0].price}
          compareAtPrice={product.variants[0]?.compareAtPrice}
          fontSize="16px"
        />
        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: isEven ? 'flex-start' : 'flex-end',
            marginTop: '10px',
          }}
        >
          <AddtoCart className="clickable" onClick={() => openProduct(product)}>
            VIEW PRODUCT
          </AddtoCart>
        </div>
      </div>
      <Container padding="0px" margin="0px" height="500px" width="400px">
        <Carousel
          onClick={() => openProduct(product)}
          height={'100%'}
          className="clickable"
          images={product.variants[0].images}
          isCircle
          hoverScroll
        />
      </Container>
    </div>
  );
};

export default ProductWithDetails;
