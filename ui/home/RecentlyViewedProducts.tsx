import { Products, useProduct } from '#/context/ProductContext';
import { getLastViewedProducts } from '#/lib/util';
import newStyled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import Colors from '../colors/colors';
import Container from '../components/ContainerBox';
import ProductWithVariants from '../components/ProductWithVariants';

const Heading = newStyled.h2`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
  letter-spacing: 2px;
  color: ${Colors.black};
`;

const Grid = newStyled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  justify-items: center;
  width: 100%;
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const RecentlyViewedProducts: React.FC = () => {
  const { products } = useProduct();
  const [lastViewedProducts, setLastViewedProducts] = useState<Products>([]);
  useEffect(() => {
    if (!products || products.length === 0) return;

    const lastViewedIds = getLastViewedProducts(); // <- Move here
    if (lastViewedIds && lastViewedIds.length > 0) {
      const viewedProducts = lastViewedIds
        .map((id) => products.find((product) => product.id === id))
        .filter(
          (product): product is Products[number] => product !== undefined,
        );

      setLastViewedProducts(viewedProducts);
    }
  }, [products]);

  if (!lastViewedProducts || lastViewedProducts.length === 0) {
    return null; // or return a message indicating no recently viewed products
  }

  return (
    <Container width="100%" margin="40px 0px" horizontalCenter>
      <Heading>RECENTLY VIEWED</Heading>
      <Grid>
        {lastViewedProducts
          ?.slice(0, 4)
          ?.map((product) => (
            <ProductWithVariants key={product.id} product={product} />
          ))}
      </Grid>
    </Container>
  );
};

export default React.memo(RecentlyViewedProducts);
