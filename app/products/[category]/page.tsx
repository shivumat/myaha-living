'use client';
import { Products, useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import Container from '#/ui/components/ContainerBox';
import FooterCarousel from '#/ui/components/FooterCarousel';
import ProductWithVariants from '#/ui/components/ProductWithVariants';
import Textbox from '#/ui/components/Textbox';
import RecentlyViewedProducts from '#/ui/home/RecentlyViewedProducts';
import Filter from '#/ui/product-filter/Filter';
import MobileFilter from '#/ui/product-filter/MobileFilter';
import newStyled from '@emotion/styled';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { VscSettings } from 'react-icons/vsc';
import NoProductsAvailable from '../NoProductsAvailable';
import { Conatiner, ListBody, StyledPagination } from '../util';

const StyledContainer = newStyled(Container)`
  padding: 0px 60px;
  margin: 40px 0px;
  @media (max-width: 800px) {
    padding: 20px 0px;
    margin: 20px 0px;
  }
`;

const ProductsCategory = () => {
  const [sort, setSort] = useState('Featured');
  const [avaialble, setAvailable] = useState('Available');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [productsToShow, setProductsToShow] = useState<Products>([]);
  const { category } = useParams<{ category: string }>();
  const { collections, materialCollections } = useProduct();
  const isMobile = useIsMobile();
  const [openMobileFilter, setOpenMobileFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /** 🔑 Scroll anchor */
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

  /** 🔄 Filter + sort + paginate */
  useEffect(() => {
    if (!collection) return;

    let filtered: Products = collection.products;

    if (avaialble === 'Available') {
      filtered = filtered.filter((product) =>
        product.variants.some((v) => v.quantityAvailable > 0),
      );
    } else if (avaialble === 'Out of Stock') {
      filtered = filtered.filter((product) =>
        product.variants.every((v) => v.quantityAvailable <= 0),
      );
    }

    filtered = filtered.filter((product) =>
      product.variants.some((variant) => {
        const price = parseFloat(variant.price.replace(/,/g, ''));
        return price >= priceRange[0] && price <= priceRange[1];
      }),
    );

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

    setProductsToShow(
      filtered.slice(
        (currentPage - 1) * productsCount,
        currentPage * productsCount,
      ),
    );
  }, [sort, collection, currentPage, avaialble, priceRange, productsCount]);

  /** 🧹 Reset page when filters change */
  useEffect(() => {
    setCurrentPage(1);
  }, [sort, avaialble, priceRange]);

  /** ✅ Mobile-safe scroll AFTER render */
  useEffect(() => {
    if (!topRef.current) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        topRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  }, [productsToShow]);

  const scrollToTop = () => {
    const el =
      document.scrollingElement || document.documentElement || document.body;

    el.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  return (
    <>
      <StyledContainer width="100%">
        {/* 🔑 Scroll target */}
        <div ref={topRef} style={{ position: 'relative', top: '-1px' }} />

        <Container
          margin={isMobile ? '40px 0px 0px' : '60px 0px 0px 0px'}
          padding="20px"
        >
          <Textbox fontSize="28px">{collection?.title}</Textbox>
        </Container>

        <ListBody>
          {isMobile ? (
            <Container
              padding="0px"
              margin="0px"
              flexRow
              style={{ gap: '20px' }}
            >
              <VscSettings
                onClick={() => setOpenMobileFilter(true)}
                size={24}
              />
              Filter & Sort
            </Container>
          ) : (
            <Filter
              setSort={setSort}
              setAvailable={setAvailable}
              setPriceRange={setPriceRange}
              setCurrentPage={setCurrentPage}
              priceRange={priceRange}
              sort={sort}
              avaialble={avaialble}
            />
          )}

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
          onPageChange={setCurrentPage}
          itemsPerPage={productsCount}
          totalItems={
            collection?.products.filter((product) => {
              const isAvailable =
                avaialble === 'Available'
                  ? product.variants.some((v) => v.quantityAvailable > 0)
                  : avaialble === 'Out of Stock'
                    ? product.variants.every((v) => v.quantityAvailable <= 0)
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

      <MobileFilter
        isOpen={openMobileFilter}
        setIsOpen={setOpenMobileFilter}
        setSort={setSort}
        setAvailable={setAvailable}
        setPriceRange={setPriceRange}
        setCurrentPage={setCurrentPage}
        priceRange={priceRange}
        sort={sort}
        avaialble={avaialble}
      />
    </>
  );
};

export default ProductsCategory;
