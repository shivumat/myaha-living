'use client';
import { Products, useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import { COLLECTIONS, MATERIALS } from '#/lib/constants/product';
import Colors from '#/ui/colors/colors';
import Container from '#/ui/components/ContainerBox';
import { Dropdown } from '#/ui/components/Dropdown';
import FooterCarousel from '#/ui/components/FooterCarousel';
import ProductWithVariants from '#/ui/components/ProductWithVariants';
import Textbox from '#/ui/components/Textbox';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Conatiner, ListBody, StyledPagination } from './util';

const StyledContainer = newStyled(Container)`
  padding: 0px 60px;
  margin: 40px 0px;
  @media (max-width: 800px) {
    padding: 20px;
    margin: 20px 0px;
  }
`;

const ProductsPage = () => {
  const [sort, setSort] = useState<string>('Featured');
  const [productsToShow, setProductsToShow] = useState<Products>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    materialCollections,
    collections,
    allCollections: collection,
  } = useProduct();
  const isMobile = useIsMobile();
  const route = useRouter();

  const topRef = useRef<HTMLDivElement>(null);

  const productsCount = isMobile ? 6 : 12;
  const allCollectionTypes = [COLLECTIONS, MATERIALS];

  useEffect(() => {
    if (collection) {
      let productsToShow: Products = collection?.products;

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
          Math.min(collection?.products?.length, productsCount * currentPage),
        ),
      );
    }
  }, [sort, collection, currentPage]);

  return (
    <>
      <StyledContainer width="100%">
        <Container
          margin={isMobile ? '40px 0px 0px' : '60px 0px 0px 0px'}
          padding="20px"
        >
          <Textbox fontSize="28px">All products</Textbox>
        </Container>
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
              ref={topRef}
              style={{
                fontWeight: 'lighter',
                fontSize: isMobile ? '12px' : '16px',
              }}
            >
              Home /&nbsp;
              <Dropdown
                options={allCollectionTypes}
                onSelect={(item: string) => {
                  if (item === MATERIALS) {
                    route.push(
                      `/products/${materialCollections[0].id.replace('gid://shopify/Collection/', '')}`,
                    );
                    return;
                  }
                  route.push(
                    `/products/${collections[0].id.replace('gid://shopify/Collection/', '')}`,
                  );
                }}
                renderTrigger={(toggle) => (
                  <div
                    style={{ cursor: 'pointer', fontWeight: '600' }}
                    onClick={(e) => toggle(e)}
                    className="clickable hover_underline"
                  >
                    All products
                  </div>
                )}
                renderOption={(option: string) => <span>{option}</span>}
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
                    border: `1px solid ${Colors.black}`,
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
            if (topRef.current) {
              topRef.current.scrollIntoView({ behavior: 'smooth' });
            }
            setCurrentPage(number);
          }}
          itemsPerPage={productsCount}
          totalItems={collection?.products?.length ?? 0}
        />
      </StyledContainer>
      <FooterCarousel rounded={false} />
    </>
  );
};

export default ProductsPage;
