import { Product } from '#/context/ProductContext';
import newStyled from '@emotion/styled';
import VariantContainer from './VariantContainer';

const Container = newStyled.div`
    width: 60%;
    border-radius: 10px;
    background-color: #FFFFFF;
    padding: 20px;
    display: flex;
    gap: 10px;
    @media (max-width: 800px) {
        width: 100%;
        flex-direction: column;
    }
`;

const Description = newStyled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    font-weight: lighter;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    @media (max-width: 800px) {
        -webkit-line-clamp: 45;
    }
`;

const CartItem = (props: { product: Product }) => {
  const { product } = props;
  const imageSrc = props.product.variants[0].images[0];

  const Material = (
    <div
      style={{
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {!!product.variants[0].material && (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Description>Material: </Description>
          <Description>{product.variants[0].material}</Description>
        </div>
      )}
      {!!product.variants[0].finish && (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Description>Finish: </Description>
          <Description>{product.variants[0].finish}</Description>
        </div>
      )}
      {!!product.variants[0].dimensions && (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Description>Dimensions: </Description>
          <Description>{product.variants[0].dimensions}</Description>
        </div>
      )}
    </div>
  );

  return (
    <Container>
      <img
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
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div style={{ fontSize: '20px', fontWeight: '400' }}>
          {props.product.title}
        </div>
        {product.variants[0].variantInfo.map((variant, index) => (
          <VariantContainer
            values={[variant.value]}
            key={index}
            activeIndex={index}
            name={variant.name}
          />
        ))}
        {Material}
      </div>
    </Container>
  );
};

export default CartItem;
