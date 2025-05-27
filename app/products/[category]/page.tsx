'use client';
import { Products, useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import Colors from '#/ui/colors/colors';
import Container from '#/ui/components/ContainerBox';
import { Dropdown } from '#/ui/components/Dropdown';
import FooterCarousel from '#/ui/components/FooterCarousel';
import PriceFilter from '#/ui/components/PriceDropdown';
import ProductWithVariants from '#/ui/components/ProductWithVariants';
import Textbox from '#/ui/components/Textbox';
import RecentlyViewedProducts from '#/ui/home/RecentlyViewedProducts';
import newStyled from '@emotion/styled';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import NoProductsAvailable from '../NoProductsAvailable';
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
  width: 400px;
  @media (max-width: 800px) {
    margin-left: 0px;
    width: 100%;
  }
`;

const AvailabilityDropdown = newStyled(Dropdown)`
  @media (max-width: 800px) {
    margin-left: 0px;
    width: 100%;
  }
`;

const ProductsCategory = () => {
  const [sort, setSort] = useState<string>('Featured');
  const [avaialble, setAvailable] = useState<string>('Available');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
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
    if (!collection) return;

    let filtered: Products = collection.products;

    // Filter by availability
    if (avaialble === 'Available') {
      filtered = filtered.filter((product) =>
        product.variants.some((variant) => variant.quantityAvailable > 0),
      );
    } else if (avaialble === 'Out of Stock') {
      filtered = filtered.filter((product) =>
        product.variants.every((variant) => variant.quantityAvailable <= 0),
      );
    }

    // Filter by price
    filtered = filtered.filter((product) =>
      product.variants.some((variant) => {
        const price = parseFloat(variant.price.replace(/,/g, ''));
        return price >= priceRange[0] && price <= priceRange[1];
      }),
    );

    // Sorting
    if (sort === 'Name: (A-Z)') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'Name: (Z-A)') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort === 'Price: Low to High') {
      filtered.sort(
        (a, b) =>
          parseFloat(a.variants[0].price.replace(/,/g, '')) -
          parseFloat(b.variants[0].price.replace(/,/g, '')),
      );
    } else if (sort === 'Price: High to Low') {
      filtered.sort(
        (a, b) =>
          parseFloat(b.variants[0].price.replace(/,/g, '')) -
          parseFloat(a.variants[0].price.replace(/,/g, '')),
      );
    }

    // Pagination
    setProductsToShow(
      filtered.slice(
        (currentPage - 1) * productsCount,
        currentPage * productsCount,
      ),
    );
  }, [sort, collection, currentPage, avaialble, priceRange]);

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
            <Container
              padding="0px"
              {...(!isMobile
                ? { flexRow: true, style: { gap: '20px' } }
                : { width: '100%' })}
            >
              <PriceFilter
                min={0}
                max={10000}
                value={priceRange}
                onChange={(v) => {
                  setCurrentPage(1);
                  setPriceRange(v);
                }}
              />
              <AvailabilityDropdown
                options={['Available', 'Out of Stock']}
                onSelect={(option) => {
                  setCurrentPage(1);
                  setAvailable(option);
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
                    Availability :
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
                        {avaialble}
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
            </Container>
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
                  style={{
                    gap: '10px',
                    justifyContent: isMobile ? 'space-between' : 'flex-end',
                  }}
                  flexRow
                  horizontalCenter
                >
                  Sort By :
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
          {productsToShow.length === 0 ? (
            <NoProductsAvailable />
          ) : (
            <Conatiner>
              {productsToShow.map((product) => (
                <ProductWithVariants key={product.id} product={product} />
              ))}
            </Conatiner>
          )}
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
          totalItems={
            collection?.products?.filter((product) => {
              const isAvailable =
                avaialble === 'Available'
                  ? product.variants.some(
                      (variant) => variant.quantityAvailable > 0,
                    )
                  : avaialble === 'Out of Stock'
                    ? product.variants.every(
                        (variant) => variant.quantityAvailable <= 0,
                      )
                    : true;

              const isInPriceRange = product.variants.some((variant) => {
                const price = parseFloat(variant.price.replace(/,/g, ''));
                return price >= priceRange[0] && price <= priceRange[1];
              });

              return isAvailable && isInPriceRange;
            }).length ?? 0
          }
        />
        <RecentlyViewedProducts />
      </StyledContainer>
      <FooterCarousel rounded={false} />
    </>
  );
};

export default ProductsCategory;
