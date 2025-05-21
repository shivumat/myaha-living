'use client';
import { useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import { Combination } from '#/lib/util';
import Colors from '#/ui/colors/colors';
import AddToCart from '#/ui/components/AddToCart';
import Carousel from '#/ui/components/Carousel';
import FooterCarousel from '#/ui/components/FooterCarousel';
import PincodeInput from '#/ui/components/Pincode';
import PlusMInusOpen from '#/ui/components/PlusMInusOpen';
import ShopifyPrice from '#/ui/components/ShopifyPrice';
import VariantContainer from '#/ui/components/VariantContainer';
import newStyled from '@emotion/styled';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiHeart, FiTruck } from 'react-icons/fi';

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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  height: 100%;
  gap: 10px;
  margin: auto auto 20px; 
`;

const ImageWrapper = newStyled.div`
  position: relative;
  overflow: hidden;
  max-width: 420px;
  img {
    width: 100%;
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
  font-size: 24px;
  font-weight: 600;
`;

const Description = newStyled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    font-weight: lighter;
    font-size: 14px;
    -webkit-line-clamp: 30;
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
    font-weight: 300;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

const PincodeInputComp = newStyled(PincodeInput)`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;

`;

const StyledDiv = newStyled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  background-color: ${Colors.white};
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid #000;
  padding: 5px 10px;
`;

const ProductWithId = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProduct();
  const isMobile = useIsMobile();
  const [variant, setVariant] = useState<number>(0);
  const [currentVariantInfo, setVariantInfo] = useState<Combination>([]);
  const topRef = React.useRef<HTMLDivElement>(null);

  const currentProduct = products.find(
    (product) => product.id === `gid://shopify/Product/${id}`,
  );

  useEffect(() => {
    const newVariantInfo =
      currentProduct?.variantsInfo.map((info) => {
        return {
          name: info.name,
          value: info.values[0],
        };
      }) ?? [];
    setVariantInfo(newVariantInfo);
    setVariant(
      currentProduct?.variants.findIndex((variant) => {
        return variant.variantInfo.every((info) =>
          newVariantInfo.some(
            (vInfo) => vInfo.name === info.name && vInfo.value === info.value,
          ),
        );
      }) ?? 0,
    );
  }, [currentProduct]);

  useEffect(() => {
    if (!currentProduct) return;
    setVariant(
      currentProduct?.variants.findIndex((variant) => {
        return variant.variantInfo.every((info) =>
          currentVariantInfo.some(
            (vInfo) => vInfo.name === info.name && vInfo.value === info.value,
          ),
        );
      }) ?? 0,
    );
  }, [currentProduct, currentVariantInfo]);

  if (!currentProduct) return null;

  const showVariants = currentProduct.variants.length > 1;

  const onVariantChange = (name: string, value: string) => {
    setVariantInfo((prev) => {
      const index = prev.findIndex((info) => info.name === name);
      const newInfo = [...prev];
      newInfo[index] = { name, value };
      return newInfo;
    });
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (variant < 0) return null;

  const Manufacture = (
    <div
      style={{
        marginTop: '10px',
        ...(!isMobile && { marginLeft: 'auto', marginRight: 'auto' }),
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Description>
        <StyledDiv>
          <FiHeart style={{ marginRight: '5px' }} /> Handcrafted with Love
        </StyledDiv>
        <StyledDiv>
          <FiTruck style={{ marginRight: '5px' }} /> Free Shipping on All Orders
        </StyledDiv>
      </Description>
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
                variantInfo.values?.findIndex(
                  (value) => value === currentVariantInfo?.[index]?.value,
                ) ?? 0
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
      <PlusMInusOpen items={[]} label="Materials and Specs">
        {!!currentProduct.variants[variant].material && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
            }}
          >
            <Description style={{ fontWeight: 300 }}>Material: </Description>
            <Description>
              {currentProduct.variants[variant].material}
            </Description>
          </div>
        )}
        {!!currentProduct.variants[variant].finish && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
            }}
          >
            <Description style={{ fontWeight: 300 }}>Finish: </Description>
            <Description>{currentProduct.variants[variant].finish}</Description>
          </div>
        )}
        {!!currentProduct.variants[variant].dimensions && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
            }}
          >
            <Description style={{ fontWeight: 300 }}>Dimensions: </Description>
            <Description>
              {currentProduct.variants[variant].dimensions}
            </Description>
          </div>
        )}
      </PlusMInusOpen>

      <PlusMInusOpen items={[]} label="Please Note">
        <Description>
          1.⁠ ⁠Please expect slight variations in similar products, as each
          piece is meticulously handcrafted, making every product unique.
        </Description>
        <Description>
          2.⁠ ⁠While we strive for accurate representation, slight color
          variations may occur due to studio lighting and screen settings.
        </Description>
      </PlusMInusOpen>

      {!!currentProduct.careGuide && (
        <PlusMInusOpen items={[]} label="Care guide">
          <Description>
            {currentProduct.careGuide.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Description>
        </PlusMInusOpen>
      )}

      <div style={{ width: '100%', borderBottom: '1px solid lightgray' }}></div>
      <SubHeadings style={{ fontSize: '14px' }}>
        Please enter PIN code to check availability:
      </SubHeadings>
      <PincodeInputComp />
    </div>
  );

  const remaininiglImages = currentProduct?.variants[variant]?.images.slice(
    0,
    3,
  );
  const carouselImages = currentProduct?.variants[variant]?.images.slice(3);

  const ImageGrid: React.FC = () => (
    <>
      <Gallery ref={topRef}>
        {!!carouselImages.length && (
          <Carousel images={carouselImages} height="100%" />
        )}
        {remaininiglImages?.map((src, index) => (
          <ImageWrapper key={index}>
            <img src={src} alt={`Image ${index + 1}`} />
          </ImageWrapper>
        ))}
      </Gallery>
      <Gallery>
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
          <ShopifyPrice
            currency={currentProduct.variants[variant].currencyCode}
            price={currentProduct.variants[variant].price}
            compareAtPrice={currentProduct.variants[variant]?.compareAtPrice}
          />
          <AddToCart
            variantId={currentProduct.variants[variant].id}
            inventoryId={currentProduct.variants[variant].inventoryId}
            quantityAvailable={
              currentProduct.variants[variant].quantityAvailable
            }
          />
        </div>
        {Manufacture}
        {Material}
      </Gallery>
    </>
  );

  const Images = isMobile ? (
    <MobileWrapper>
      <div style={{ height: '600px' }} ref={topRef}>
        <Carousel
          images={currentProduct?.variants[variant]?.images}
          height="100%"
          isCircle={isMobile}
        />
      </div>
      <Title>{currentProduct?.title}</Title>
      <Description
        dangerouslySetInnerHTML={{ __html: currentProduct?.description ?? '' }}
      />
      <ShopifyPrice
        currency={currentProduct.variants[variant].currencyCode}
        price={currentProduct.variants[variant].price}
        compareAtPrice={currentProduct.variants[variant]?.compareAtPrice}
      />
      <AddToCart
        variantId={currentProduct.variants[variant].id}
        inventoryId={currentProduct.variants[variant].inventoryId}
        quantityAvailable={currentProduct.variants[variant].quantityAvailable}
      />
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
