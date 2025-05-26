import { Collection, useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import React from 'react';
import Colors from '../colors/colors';
import Overlay from '../components/Overlay';
import Textbox from '../components/Textbox';

const Container = newStyled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  gap: 20px;
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
    color: ${Colors.black};
    border: 1px solid ${Colors.black};
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
    overflow-y: hidden;
    width: 100%;
    scroll-behavior: smooth;
`;

const CategoryContainer = newStyled.div`
    cursor: pointer;
    display: flex;
    position: relative;
    flex: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: calc(30%);
    @media (max-width: 800px) {
        padding: 20px 0px 30px;
        width: calc(85%);
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
      className="clickable"
      key={collection.id}
    >
      <Overlay>
        <Textbox
          htmlTag="h3"
          fontSize="24px"
          fontWeight="500"
          italic
          allLowercase
          color={Colors.white}
        >
          {collection.title}
        </Textbox>
      </Overlay>
      <img
        className="clickable"
        src={collection.categoryImage}
        alt={collection.title}
        style={{ width: '100%', height: '450px', objectFit: 'cover' }}
      />
      {/* <span className="clickable">{collection.title}</span> */}
    </CategoryContainer>
  );

  const CollectionComponent = (
    <CollectionContainer ref={ref}>
      {collections.map((collection: any) => {
        return getCategoryElement(collection);
      })}
    </CollectionContainer>
  );
  return (
    <Container>
      <div className="title">
        <div>SHOP BY CATEGORY</div>
        {!isMobile && (
          <div
            style={{ display: 'flex', columnGap: '40px', marginTop: '10px' }}
          >
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
      {isMobile && (
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
    </Container>
  );
};

export default Categories;
