'use client';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Colors from '../colors/colors';
import Container from '../components/ContainerBox';
import FooterCarousel from '../components/FooterCarousel';
import OrderCreated from '../OrderCreatedModal';
import Categories from './Categories';
import HomeLowBanner from './HomeLowBanner';
import InstagramFeed from './InstagramFeed';
import MaterialProducts from './MaterialProducts';
import OurStory from './OurStory';
import FeaturedProducts from './ProductsFeatured';
import SubscribeEmail from './SubscribeEmail';
import TestimonialCarousel from './Testimonial';

const Div1 = newStyled.div<{ isMobile: boolean }>`
  padding: 40px;
  color: ${Colors.white};
  background-color: #5B1D1D;
  font-size: 14px;
  font-weight: lighter;
  .title{
    font-size: 24px;
    color: ${Colors.white};
  }
  @media (max-width: 800px) {
    padding: 20px;
    font-size: 12px;
    .title{
      font-size: 20px;
    }
  }

`;

const StyledContainer = newStyled(Container)`
  padding: 0px 80px;
  margin: 60px 0px;
  width: 100%;
  @media (max-width: 800px) {
    padding: 20px;
    margin: 20px 0px;
  }
`;

const HomeBody = () => {
  const searchParams = useSearchParams();
  const [hasOrderCreated, setOrderCreated] = useState(false);

  useEffect(() => {
    setOrderCreated(searchParams.has('orderCreated'));
  }, [searchParams]);

  const toggleOrderCreated = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('orderCreated');
    window.location.href = '/';
  };

  const isMobile = useIsMobile();

  return (
    <>
      <StyledContainer>
        <Categories />
      </StyledContainer>
      <Div1 isMobile={isMobile}>
        <div className="title">
          Crafting emotions, not just essentials – where every design tells your
          story
        </div>
      </Div1>
      <StyledContainer horizontalCenter>
        <MaterialProducts />
      </StyledContainer>
      <FooterCarousel rounded={false} />
      <StyledContainer>
        <FeaturedProducts />
      </StyledContainer>
      <TestimonialCarousel />
      <InstagramFeed />
      <StyledContainer horizontalCenter>
        {isMobile && <OurStory />}
        <HomeLowBanner />
      </StyledContainer>
      <SubscribeEmail />
      <OrderCreated
        isOpen={hasOrderCreated}
        orderId={searchParams.get('orderCreated')}
        onClose={toggleOrderCreated}
      />
    </>
  );
};

export default HomeBody;
