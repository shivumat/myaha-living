'use client';
import { useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import Carousel from '#/ui/components/Carousel';
import FooterCarousel from '#/ui/components/FooterCarousel';
import PincodeInput from '#/ui/components/Pincode';
import VariantContainer from '#/ui/components/VariantContainer';
import newStyled from '@emotion/styled';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Container = newStyled.div`
  padding: 50px 0px 0px;
  @media (max-width: 800px) {
    padding: 30px 0px 0px;
  }
`;

// Styled Components
const Gallery = newStyled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  width: 100%;
  gap: 10px;
  margin: auto auto 20px; 
`;

const ImageWrapper = newStyled.div`
  position: relative;
  overflow: hidden;
  max-width: 420px;
  img {
    width: 100%;
    height: 500px;
  }
`;

const MobileWrapper = newStyled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const Title = newStyled.h1`
  font-size: 28px;
  font-weight: 600;
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

const Price = newStyled.div`
    font-size: 24px;
    font-weight: 500;
`;

const SubHeadings = newStyled.div`
    font-size: 18px;
    font-weight: 500;
`;

const AddtoCart = newStyled.button`
    height: 40px;
    width: 150px;
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

const PincodeInputComp = newStyled(PincodeInput)`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;

`;

const ProductWithId = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProduct();
  const isMobile = useIsMobile();
  const [variant, setVariant] = useState<number>(0);
  const [edd, setEdd] = useState<string>('');
  const [] = useState<any>({ amount: 0, ordeId: '' });

  const currentProduct = products.find(
    (product) => product.id === `gid://shopify/Product/${id}`,
  );

  useEffect(() => {
    setVariant(0);
  }, [id]);

  const checkPincode = async (pincode: string, valid: boolean) => {
    if (!valid || !pincode.trim()) {
      setEdd('');
      return;
    }
    const response = await fetch('/api/delivery/checkPincode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pincode }),
    });
    const data = await response.json();
    setEdd(data.estimatedTime);
  };

  if (!currentProduct) return null;

  const showVariants = currentProduct.variants.length > 1;
  const variantKey = currentProduct.variants[variant].variantInfo.name;
  const variantValue = currentProduct.variants[variant].variantInfo.value;

  const onVariantChange = (name: string, value: string) => {
    setVariant(
      currentProduct.variants.findIndex(
        (variant) =>
          variant.variantInfo.name === name &&
          variant.variantInfo.value === value,
      ),
    );
  };

  const Manufacture = (
    <div
      style={{
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <SubHeadings>Manufacture</SubHeadings>
      <Description>Hand Made in India</Description>
      {!!showVariants &&
        currentProduct.variantsInfo.map((variantInfo, index) => (
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              cursor: 'pointer',
            }}
            key={index}
          >
            <VariantContainer
              {...variantInfo}
              activeIndex={
                variantInfo.name === variantKey
                  ? variantInfo.values.indexOf(variantValue)
                  : -1
              }
              onVariantChange={onVariantChange}
            />
          </div>
        ))}
    </div>
  );

  const Material = (
    <div
      style={{
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Price>Product details</Price>
      <SubHeadings>Materials and Specs</SubHeadings>
      {!!currentProduct.variants[variant].material && (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Description>Material: </Description>
          <Description>{currentProduct.variants[variant].material}</Description>
        </div>
      )}
      {!!currentProduct.variants[variant].finish && (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Description>Finish: </Description>
          <Description>{currentProduct.variants[variant].finish}</Description>
        </div>
      )}
      {!!currentProduct.variants[variant].dimensions && (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Description>Dimensions: </Description>
          <Description>
            {currentProduct.variants[variant].dimensions}
          </Description>
        </div>
      )}
      <div style={{ width: '100%', borderBottom: '1px solid lightgray' }}></div>
      <SubHeadings>Get your product delivered by:</SubHeadings>
      <PincodeInputComp edd={edd} onPincodeChange={checkPincode} />
    </div>
  );

  const ImageGrid: React.FC = () => (
    <Gallery>
      {currentProduct?.variants[variant]?.images.map((src, index) => (
        <ImageWrapper key={index}>
          <img src={src} alt={`Image ${index + 1}`} />
        </ImageWrapper>
      ))}
      <div
        style={{
          gridColumn: 'span 2',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <Title>{currentProduct?.title}</Title>
        <Description
          dangerouslySetInnerHTML={{
            __html: currentProduct?.description ?? '',
          }}
        />
        <Price>
          {currentProduct.variants[variant].currencyCode}{' '}
          {currentProduct.variants[variant].price}
        </Price>
        <AddtoCart>Add to cart</AddtoCart>
      </div>
      {Manufacture}
      {Material}
    </Gallery>
  );

  const Images = isMobile ? (
    <MobileWrapper>
      <Carousel
        images={currentProduct?.variants[variant]?.images}
        height="500px"
      />
      <Title>{currentProduct?.title}</Title>
      <Description
        dangerouslySetInnerHTML={{ __html: currentProduct?.description ?? '' }}
      />
      <Price>
        {currentProduct.variants[variant].currencyCode}{' '}
        {currentProduct.variants[variant].price}
      </Price>
      <AddtoCart>Add to cart</AddtoCart>
      {Manufacture}
      {Material}
    </MobileWrapper>
  ) : (
    <ImageGrid />
  );

  return (
    <Container>
      {Images}
      <FooterCarousel rounded={false} />
      {/* <PaymentComponent {...order}/> */}
    </Container>
  );
};

export default ProductWithId;
