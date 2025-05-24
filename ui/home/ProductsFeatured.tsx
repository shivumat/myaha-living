import { Products, useProduct } from '#/context/ProductContext';
import { getRandomSubArray } from '#/lib/util';
import newStyled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import Colors from '../colors/colors';
import Container from '../components/ContainerBox';
import ProductWithDetails from '../components/ProductWithDetails';
import Textbox from '../components/Textbox';

const StyledContainer = newStyled(Container)`
  position: relative;
`;

const StyledLeftButton = newStyled(HiOutlineChevronLeft)`
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: -30px;
`;

const StyledRightButton = newStyled(HiOutlineChevronRight)`
  position: absolute;
  top: 50%;
  right: -30px;
  cursor: pointer;
`;

const FeaturedProducts = () => {
  const { products } = useProduct();
  const grandparentRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Products>([]);
  const [scrolledItem, setScrolledItem] = useState<number>(0);

  let interval: NodeJS.Timeout | null = null;

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

  const startTimer = () => {
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
      setScrolledItem((prev) => (prev + 1) % featuredProducts.length);
    }, 5000); // Change every 5 seconds
  };

  useEffect(() => {
    const totalItems = featuredProducts.length;
    if (totalItems === 0) return; // No items to scroll
    startTimer();
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [featuredProducts.length]);

  useEffect(() => {
    if (innerRef.current) {
      const itemWidth = innerRef.current.offsetWidth;
      const scrollLeft = itemWidth * scrolledItem;
      innerRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [scrolledItem, innerRef]); // Changed dependency to just innerRef

  const getGrandparentWidth = () => {
    if (grandparentRef.current) {
      return grandparentRef.current?.offsetWidth;
    }
    return 0;
  };

  const handleLeftClick = () => {
    setScrolledItem(
      (prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length,
    );
    // If you want to reset the automatic scroll timer on manual click, uncomment this:
    // startTimer();
  };

  const handleRightClick = () => {
    setScrolledItem((prev) => (prev + 1) % featuredProducts.length);
    // If you want to reset the automatic scroll timer on manual click, uncomment this:
    // startTimer();
  };

  return (
    <StyledContainer
      ref={grandparentRef}
      padding="0px"
      margin="0px"
      width="100%"
    >
      <StyledLeftButton
        color={Colors.black}
        onClick={handleLeftClick}
        size={24}
      />
      <StyledRightButton
        color={Colors.black}
        onClick={handleRightClick}
        size={24}
      />
      <Textbox fontSize="24px">MOST LOVED</Textbox>
      <Container
        ref={innerRef}
        padding="0px"
        margin="0px"
        flexRow
        width="max-content"
        overflow="hidden"
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
      </Container>
    </StyledContainer>
  );
};

export default React.memo(FeaturedProducts);
