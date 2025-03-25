'use client';
import { Collection, Products, useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import { Dropdown } from '#/ui/components/Dropdown';
import FooterCarousel from '#/ui/components/FooterCarousel';
import Pagination from '#/ui/components/PaginationComponent';
import ProductWithVariants from '#/ui/components/ProductWithVariants';
import newStyled from '@emotion/styled';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const BannerImg = newStyled.img<{ collectionStylingChanges?: string }>`
    height: 850px;
    object-fit: cover;
    @media (max-width: 800px) {
        height: 600px;
    }
    ${({ collectionStylingChanges }) => collectionStylingChanges ?? ''}
`;

const CollectionDetails = newStyled.div`
    position: absolute;
    top: 425px;
    left: 50%;
    font-size: 50px;
    transform: translate(-50%, 0%);
    padding: 10px;
    color: #ffffff;
    @media (max-width: 800px) {
      top: 300px;
      font-size: 40px;
      width: max-content;
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

const ProductsCategory = () => {
  const [selected, setSelected] = useState<Collection | null>(null);
  const [sort, setSort] = useState<string>('Featured');
  const [productsToShow, setProductsToShow] = useState<Products>([]);
  const [collectionProducts, setColletionProducts] = useState<Products>([]);
  const { category } = useParams<{ category: string }>();
  const { collections, products } = useProduct();
  const route = useRouter();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const productsCount = isMobile ? 6 : 12;

  const collection = useMemo(
    () =>
      collections.find(
        (collection) =>
          collection.id === `gid://shopify/Collection/${category}`,
      ),
    [category, collections],
  );

  useEffect(() => {
    if (!!collection) {
      setSelected(collection);
      let productsToShow: Products = [];
      collection.products.forEach((product) => {
        const productToShow = products.find((p) => p.id === product.id);
        if (productToShow) {
          productsToShow.push(productToShow);
        }
      });
      setColletionProducts(productsToShow);
    }
  }, [collection, products]);

  useEffect(() => {
    if (products.length && collection) {
      let productsToShow: Products = collectionProducts;

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
          Math.min(collectionProducts.length, productsCount * currentPage),
        ),
      );
    }
  }, [sort, collectionProducts, collection, currentPage]);

  const customStyling: Record<string, string> = {
    '479846400247': '@media (max-width: 800px) { object-position: 65% 0%; }',
    '479846596855': '@media (max-width: 800px) { object-position: 35% 0%; }',
  };

  return (
    <>
      <div>
        <BannerImg
          src={collection?.image}
          alt={collection?.title}
          width={'100%'}
          collectionStylingChanges={customStyling[category]}
        />
        <CollectionDetails>
          <div className="header">{collection?.title}</div>
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
            Home / Collections /&nbsp;
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
                  {selected?.title}
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
        totalItems={collectionProducts.length}
      />
      <FooterCarousel rounded={false} />
    </>
  );
};

export default ProductsCategory;
