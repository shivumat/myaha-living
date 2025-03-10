import { Product } from '#/context/ProductContext';
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
        font-size: 10px;
        width: 70px;
    }
`;

const ProductWithVariants = (props: { product: Product }) => {
  const { product } = props;

  const colorVariants = product.variantsInfo.find(
    (variant) => variant.name === 'Colour',
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '600px',
        width: '100%',
        maxWidth: '450px',
      }}
    >
      <Carousel height={'500px'} images={product.variants[0].images} />
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '10px',
          justifyContent: 'space-between',
          alignItems: 'basline',
          height: '60px',
        }}
      >
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          {product.title}
          <div style={{ display: 'flex', gap: '10px' }}>
            {colorVariants?.values?.map((color: string) => (
              <div
                style={{
                  height: '20px',
                  width: '20px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  border: '1px solid black',
                }}
              />
            ))}
          </div>
        </div>
        <AddtoCart className="view">View</AddtoCart>
      </div>
    </div>
  );
};

export default ProductWithVariants;
