'use client';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Colors from '../colors/colors';
import FooterCarousel from '../components/FooterCarousel';
import OrderCreated from '../OrderCreatedModal';
import Categories from './Categories';
import OurStory from './OurStory';
import FeaturedProducts from './ProductsFeatured';

const Container = newStyled.div`
  padding: 20px;
`;

const Div1 = newStyled.div<{ isMobile: boolean }>`
  padding: 40px;
  color: ${Colors.white};
  background-color: #5B1D1D;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: lighter;
  .title{
    font-size: 24px;
    margin-bottom: 5px;
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

const FetaureConstainer = newStyled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 100%;
  .title{
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    width: 100%;
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
      <Div1 isMobile={isMobile}>
        <div className="title">
          Crafting emotions, not just essentials – where every design tells your
          story
        </div>
      </Div1>
      <Container>
        <Categories />
        <FetaureConstainer>
          <div className="title">Featured products</div>
          <FeaturedProducts />
        </FetaureConstainer>
        <FooterCarousel />
        <OurStory />
        {/* <CategoryProducts /> */}
        <OrderCreated
          isOpen={hasOrderCreated}
          orderId={searchParams.get('orderCreated')}
          onClose={toggleOrderCreated}
        />
      </Container>
    </>
  );
};

export default HomeBody;
