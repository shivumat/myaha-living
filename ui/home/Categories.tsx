import { useProduct } from '#/context/ProductContext';
import newStyled from '@emotion/styled';
import React from 'react';

const Container = newStyled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
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
    padding: 1.5px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// const CollectionContainer = newStyled.div`
//     display: flex;
//     column-gap: 20px;
//     overflow-x: auto;
//     width: 100%;
//     scroll-behavior: smooth;
// `

// const CategoryContainer = newStyled.div`
//     display: flex;
//     flex: none;
//     flex-direction: column;
//     gap: 20px;
//     width: calc(33.33% - 20px);
//     border: 1px solid lightgray;
// `

const Categories = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { collections } = useProduct();
  console.log(collections);

  const scroll = (right?: boolean) => {
    if (!ref.current) return;
    const { clientWidth } = ref.current;
    const delta = clientWidth;
    if (right) ref.current.scrollLeft += delta;
    else ref.current.scrollLeft -= delta;
  };

  // const CollectionComponent = <CollectionContainer ref={ref}>
  //     {collections.map((collection: any) => {
  //         return <CategoryContainer key={collection.id}>{collection.title}</CategoryContainer>
  //     })}
  // </CollectionContainer>
  return (
    <Container>
      <div className="title">
        <div>Product Category</div>
        <div style={{ display: 'flex', columnGap: '40px' }}>
          <Arrow onClick={() => scroll()}>{'<'}</Arrow>
          <Arrow onClick={() => scroll(true)}>{'>'}</Arrow>
        </div>
      </div>
      {/* {CollectionComponent} */}
    </Container>
  );
};

export default Categories;
