import { Products, useProduct } from '#/context/ProductContext';
import { getRandomSubArray } from '#/lib/util';
import React, { useEffect, useRef, useState } from 'react';
import Container from '../components/ContainerBox';
import ProductWithDetails from '../components/ProductWithDetails';
import Textbox from '../components/Textbox';

const FeaturedProducts = () => {
  const { products } = useProduct();
  const grandparentRef = useRef<HTMLDivElement | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Products>([]);

  useEffect(() => {
    if (featuredProducts.length === 0) {
      const featured = products.filter((product) => !!product.featured);
      if (featured.length > 0) {
        setFeaturedProducts(featured);
      } else {
        setFeaturedProducts(getRandomSubArray(products, 4));
      }
    }
  }, [products]);

  const getGrandparentWidth = () => {
    if (grandparentRef.current) {
      return grandparentRef.current?.offsetWidth;
    }
    return 0;
  };

  return (
    <Container
      ref={grandparentRef}
      padding="0px"
      margin="0px"
      width="100%"
      overflow="hidden"
    >
      <Textbox fontSize="24px">MOST LOVED</Textbox>
      <Container
        padding="0px"
        margin="0px"
        flexRow
        width="max-content"
        style={{ maxWidth: '100%' }}
      >
        {featuredProducts.map((product) => (
          <ProductWithDetails
            getGrandparentWidth={getGrandparentWidth}
            isEven
            key={product.id}
            product={product}
          />
        ))}
        {featuredProducts.map((product) => (
          <ProductWithDetails
            getGrandparentWidth={getGrandparentWidth}
            isEven
            key={product.id}
            product={product}
          />
        ))}
        {featuredProducts.map((product) => (
          <ProductWithDetails
            getGrandparentWidth={getGrandparentWidth}
            isEven
            key={product.id}
            product={product}
          />
        ))}
      </Container>
    </Container>
  );
};

export default React.memo(FeaturedProducts);
