import { Collection, useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import React from 'react';
import Carousel from '../components/Carousel';

const Container = newStyled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid lightgray;
  gap: 20px;
  margin-bottom: 20px;
  .title{
    font-size: 24px;
    font-weight: 500;
    width: 100%;
  }
    @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    }
`;

const Arrow = newStyled.span`
    cursor: pointer;
    font-size: 12px;
    color: darkgray;
    border: 1px solid darkgray;
    border-radius: 50%;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CollectionContainer = newStyled.div`
    display: flex;
    column-gap: 20px;
    overflow-x: auto;
    width: 100%;
    scroll-behavior: smooth;
`;

const CategoryContainer = newStyled.div`
    padding: 20px 0px;
    cursor: pointer;
    display: flex;
    flex: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: calc(33.33% - 20px);
    border: 1px solid lightgray;
    @media (max-width: 800px) {
        padding: 20px 0px 30px;
        width: calc(100% - 48px);
        height: 440px;
    }
`;

const Categories = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { collections } = useProduct();
  const isMobile = useIsMobile();
  const router = useRouter();

  const scroll = (right?: boolean) => {
    if (!ref.current) return;
    const { clientWidth } = ref.current;
    const delta = clientWidth;
    if (right) ref.current.scrollLeft += delta;
    else ref.current.scrollLeft -= delta;
  };

  const getCategoryElement = (collection: Collection) => (
    <CategoryContainer
      onClick={() =>
        router.push(
          `products/${collection.id.replace('gid://shopify/Collection/', '')}`,
        )
      }
      key={collection.id}
    >
      <img
        className="clickable"
        src={collection.productImage}
        alt={collection.title}
        style={{ width: '240px', height: '360px', objectFit: 'cover' }}
      />
      <span className="clickable">{collection.title}</span>
    </CategoryContainer>
  );

  const CollectionComponent = isMobile ? (
    <Carousel height="360px">
      {collections.map((collection: any) => {
        return getCategoryElement(collection);
      })}
    </Carousel>
  ) : (
    <CollectionContainer ref={ref}>
      {collections.map((collection: any) => {
        return getCategoryElement(collection);
      })}
    </CollectionContainer>
  );
  return (
    <Container>
      <div className="title">
        <div>Product Category</div>
        {!isMobile && (
          <div style={{ display: 'flex', columnGap: '40px' }}>
            <Arrow className="clickable" onClick={() => scroll()}>
              <img
                src="/images/caret.png"
                alt="sort"
                style={{
                  width: '10px',
                  height: '10px',
                  transform: 'rotate(90deg)',
                }}
              />
            </Arrow>
            <Arrow className="clickable" onClick={() => scroll(true)}>
              <img
                src="/images/caret.png"
                alt="sort"
                style={{
                  width: '10px',
                  height: '10px',
                  transform: 'rotate(-90deg)',
                }}
              />
            </Arrow>
          </div>
        )}
      </div>
      {CollectionComponent}
    </Container>
  );
};

export default Categories;
