'use client';
import { Collection, Products, useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import { Dropdown } from '#/ui/components/Dropdown';
import FooterCarousel from '#/ui/components/FooterCarousel';
import Pagination from '#/ui/components/PaginationComponent';
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
    top: 425px;
    left: 50%;
    font-size: 48px;
    transform: translate(-50%, 0%);
    padding: 10px;
    color: #ffffff;
    @media (max-width: 800px) {
      top: 300px;
      font-size: 36px;
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
        grid-template-columns: 1fr 1fr;
    }
`;

const StyledPagination = newStyled(Pagination)`
  margin-bottom: 16px;
`;

const ProductsPage = () => {
  const [sort, setSort] = useState<string>('Featured');
  const [productsToShow, setProductsToShow] = useState<Products>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { products, collections } = useProduct();
  const isMobile = useIsMobile();
  const route = useRouter();

  const productsCount = isMobile ? 6 : 12;

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
      if (sort === 'Name: (A-Z)') {
        productsToShow.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sort === 'Name: (Z-A)') {
        productsToShow.sort((a, b) => b.title.localeCompare(a.title));
      } else if (sort === 'Price: Low to High') {
        productsToShow.sort(
          (a, b) => Number(a.variants[0].price) - Number(b.variants[0].price),
        );
      } else if (sort === 'Price: High to Low') {
        productsToShow.sort(
          (a, b) => Number(b.variants[0].price) - Number(a.variants[0].price),
        );
      }
      setProductsToShow(
        productsToShow.slice(
          (currentPage - 1) * productsCount,
          Math.min(products.length, productsCount * currentPage),
        ),
      );
    }
  }, [sort, products, currentPage]);

  return (
    <>
      <div style={{ padding: isMobile ? '0 20px' : '0px' }}>
        <BannerImg
          src={'https://i.postimg.cc/2SG8536P/DSCF4911.jpg'}
          alt={'Myaha products'}
          width={'100%'}
        />
        <CollectionDetails>
          <div className="header">{'All Products'}</div>
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
              'Name: (A-Z)',
              'Name: (Z-A)',
              'Price: Low to High',
              'Price: High to Low',
            ]}
            onSelect={(option) => {
              setCurrentPage(1);
              setSort(option);
            }}
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
      <StyledPagination
        currentPage={currentPage}
        onPageChange={(number) => {
          setCurrentPage(number);
        }}
        itemsPerPage={productsCount}
        totalItems={products.length}
      />
      <FooterCarousel rounded={false} />
    </>
  );
};

export default ProductsPage;
