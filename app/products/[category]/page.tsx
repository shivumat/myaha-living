'use client';
import { Products, useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import Colors from '#/ui/colors/colors';
import Container from '#/ui/components/ContainerBox';
import { Dropdown } from '#/ui/components/Dropdown';
import FooterCarousel from '#/ui/components/FooterCarousel';
// import PriceFilter from '#/ui/components/PriceDropdown';
import ProductWithVariants from '#/ui/components/ProductWithVariants';
import Textbox from '#/ui/components/Textbox';
import RecentlyViewedProducts from '#/ui/home/RecentlyViewedProducts';
import newStyled from '@emotion/styled';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
// import CollectionFilter from '../MaterialFilter';
import PriceFilter from '#/ui/components/PriceDropdown';
import { Conatiner, ListBody, StyledPagination } from '../util';

const StyledContainer = newStyled(Container)`
  padding: 0px 60px;
  margin: 40px 0px;
  @media (max-width: 800px) {
    padding: 20px;
    margin: 20px 0px;
  }
`;

const SortDropdown = newStyled(Dropdown)`
  margin-left: auto;
  @media (max-width: 800px) {
    margin-left: 0px;
    width: 100%;
  }
`;

const ProductsCategory = () => {
  const [sort, setSort] = useState<string>('Featured');
  const [productsToShow, setProductsToShow] = useState<Products>([]);
  const { category } = useParams<{ category: string }>();
  const { collections, materialCollections } = useProduct();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const topRef = useRef<HTMLDivElement>(null);

  const productsCount = isMobile ? 6 : 12;

  const allCollections = [...collections, ...materialCollections];

  const collection = useMemo(
    () =>
      allCollections.find(
        (collection) =>
          collection.id === `gid://shopify/Collection/${category}`,
      ),
    [category, allCollections],
  );
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
          currentPage * productsCount,
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
          <Textbox fontSize="28px">{collection?.title}</Textbox>
        </Container>

        <ListBody>
          <div
            style={{
              display: 'flex',
              alignItems: !isMobile ? 'center' : 'flex-start',
              columnGap: '20px',
              padding: '20px 0',
              flexDirection: isMobile ? 'column' : 'row',
            }}
          >
            {/* <CollectionFilter collections={collections} label={COLLECTIONS} />
            <CollectionFilter
              collections={materialCollections}
              label={MATERIALS}
            />*/}
            <PriceFilter
              min={0}
              max={10000}
              value={[0, 10000]}
              onChange={(v) => console.log(v)}
            />
            <SortDropdown
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
                <Container
                  width={isMobile ? '100%' : 'auto'}
                  padding="0px"
                  margin={isMobile ? '10px 0px 0px' : '0px'}
                  style={{ gap: '10px', justifyContent: 'space-between' }}
                  flexRow
                  horizontalCenter
                >
                  SORT BY :
                  <div
                    onClick={toggle}
                    style={{
                      cursor: 'pointer',
                      width: '200px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      border: `1px solid ${Colors.black}`,
                      alignItems: 'center',
                      padding: '3.5px 10px',
                      borderRadius: '4px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '16px',
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
                </Container>
              )}
              renderOption={(option: any) => <span> {option}</span>}
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
        <RecentlyViewedProducts />
      </StyledContainer>
      <FooterCarousel rounded={false} />
    </>
  );
};

export default ProductsCategory;
