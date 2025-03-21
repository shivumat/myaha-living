import { useProduct } from '#/context/ProductContext';
import { getRandomSubArray } from '#/lib/util';
import newStyled from '@emotion/styled';
import { useMemo } from 'react';
import ProductWithVariants from '../components/ProductWithVariants';

const Conatiner = newStyled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    width: 100%;
    margin-bottom: 20px; 
    padding-bottom: 20px; 
    border-bottom: 1px solid lightgray;
    @media (max-width: 1200px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 800px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const FeaturedProducts = () => {
  const { products } = useProduct();
  const featuredProducts = useMemo(
    () => getRandomSubArray(products, 4),
    [products],
  );

  return (
    <Conatiner>
      {featuredProducts.map((product) => (
        <ProductWithVariants key={product.id} product={product} />
      ))}
    </Conatiner>
  );
};

export default FeaturedProducts;
