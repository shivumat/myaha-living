'use client';
import { Collection, Products, useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import { Dropdown } from '#/ui/components/Dropdown';
import FooterCarousel from '#/ui/components/FooterCarousel';
import ProductWithVariants from '#/ui/components/ProductWithVariants';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BannerImg = newStyled.img`
    height: 850px;
    object-fit: cover;
    object-position: 0% 80%;
    @media (max-width: 800px) {
        height: 600px;
    }
`;

const CollectionDetails = newStyled.div`
    position: absolute;
    top: 30%;
    left: 50%;
    background-color: #FFFFFF1A;
    backdrop-filter: blur(18px);
    border-radius: 10px;
    padding: 40px;
    .header{
        font-size: 28px;
        font-weight: 600;
    }
    .subHeader{
        font-size: 18px;
        font-weight: lighter;
    }
    @media (max-width: 800px) {
        background-color: #FFFFFF1A;
        backdrop-filter: blur(50px);
        border-radius: 10px;
        top: 10%;
        left: 10%;
        padding: 10px;
        width: 60%;
        .header{
            font-size: 24px;
        }
        .subHeader{
            font-size: 14px;
        }
    }
`;

const ListBody = newStyled.div`
    padding: 20px;
`;

const Conatiner = newStyled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    width: 100%;
    margin: 20px 0px 0px 0px; 
    padding-bottom: 20px; 
    @media (max-width: 1400px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 800px) {
        grid-template-columns: 1fr;
    }
`;

const ProductsPage = () => {
  const [sort, setSort] = useState<string>('Featured');
  const [productsToShow, setProductsToShow] = useState<Products>([]);
  const { products, collections } = useProduct();
  const isMobile = useIsMobile();
  const route = useRouter();

  useEffect(() => {
    if (products.length) {
      let productsToShow: Products = products;
      if (productsToShow.length === 0) {
        return;
      }
      if (productsToShow.length < 2) {
        setProductsToShow(productsToShow);
        return;
      }
      if (sort === 'Name') {
        productsToShow.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sort === 'Price: Low to High') {
        productsToShow.sort(
          (a, b) => Number(a.variants[0].price) - Number(b.variants[0].price),
        );
      } else if (sort === 'Price: High to Low') {
        productsToShow.sort(
          (a, b) => Number(b.variants[0].price) - Number(a.variants[0].price),
        );
      }
      setProductsToShow(productsToShow);
    }
  }, [sort, products]);

  return (
    <>
      <div style={{ padding: isMobile ? '0 20px' : '0px' }}>
        <BannerImg
          src={'/images/about-us/about-us1.png'}
          alt={'Myaha products'}
          width={'100%'}
        />
        <CollectionDetails>
          <div className="header">{'All Prodcuts'}</div>
          <div className="subHeader">
            At Myaha, our vision is to transform the way people experience home
            decor by creating pieces that are not only beautiful but deeply
            personal. We aim to blend timeless craftsmanship with modern
            creativity, offering products that resonate with individuality and
            evoke a sense of belonging. Our goal is to inspire people to see
            their homes as reflections of their unique stories, where each piece
            tells a narrative and every space feels like a warm embrace.
          </div>
        </CollectionDetails>
      </div>
      <ListBody>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px 0',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <div
            style={{
              fontWeight: 'lighter',
              fontSize: isMobile ? '12px' : '16px',
            }}
          >
            Home / &nbsp;
            <Dropdown
              options={collections}
              onSelect={(item: Collection) =>
                route.push(
                  `/products/${item.id.replace('gid://shopify/Collection/', '')}`,
                )
              }
              renderTrigger={(toggle) => (
                <div
                  style={{ cursor: 'pointer', fontWeight: '500' }}
                  onClick={(e) => toggle(e)}
                >
                  All products
                </div>
              )}
              renderOption={(option) => <span> {option.title}</span>}
            />
          </div>
          <Dropdown
            options={[
              'Featured',
              'Name',
              'Price: Low to High',
              'Price: High to Low',
            ]}
            onSelect={setSort}
            renderTrigger={(toggle) => (
              <div
                onClick={toggle}
                style={{
                  cursor: 'pointer',
                  marginTop: isMobile ? '10px' : '0px',
                  width: '200px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  border: '1px solid black',
                  alignItems: 'center',
                  padding: '0px 10px',
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? '12px' : '16px',
                    fontWeight: '500',
                    padding: '5px 0px',
                  }}
                >
                  {sort}
                </div>
                <img
                  src="/images/caret.png"
                  alt="sort"
                  style={{ width: '20px', height: '20px' }}
                />
              </div>
            )}
            renderOption={(option) => <span> {option}</span>}
          />
        </div>
        <Conatiner>
          {productsToShow.map((product) => (
            <ProductWithVariants key={product.id} product={product} />
          ))}
        </Conatiner>
      </ListBody>
      <FooterCarousel rounded={false} />
    </>
  );
};

export default ProductsPage;
