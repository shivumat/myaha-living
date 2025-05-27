'use client';
import { useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import Carousel from '../components/Carousel';

// List of images in the public folder
const desktopImages: string[] = [
  'https://i.postimg.cc/ZRMk0WX5/1.png',
  'https://i.postimg.cc/JnnV1N6F/2.png',
  'https://i.postimg.cc/Xvx6SH8F/3.png',
];

const mobileImages: string[] = [
  'https://i.postimg.cc/tgnQNGf2/1-1.png',
  'https://i.postimg.cc/K4hyRqQJ/2.png',
  'https://i.postimg.cc/WzkvpLmd/3.png',
];
// Styled Components
const Gallery = styled.div`
  width: 100%;
  margin: auto;
  height: 85vh;
`;

const MobileWrapper = styled.div`
  padding: 0px;
  height: 500px;
  position: relative;
  top: 15px;
`;

const StyledCarousel = styled(Carousel)``;

// Desktop Grid Layout Component
const ImageGrid: React.FC = () => {
  const { initData } = useProduct();
  const router = useRouter();
  const onClick = (index: number) => {
    router.push(`/${initData?.bannerRoutes?.[index]}`);
  };

  const clickableImages = useMemo(() => {
    const indices: number[] = [];
    initData?.bannerRoutes?.forEach((route, index) => {
      if (!!route) {
        indices.push(index);
      }
    });
    return indices;
  }, [initData?.bannerRoutes]);

  return (
    <Gallery>
      <Carousel
        clickableImages={clickableImages}
        onClick={onClick}
        isCircle
        autoScroll
        images={initData?.bannerImages?.map((i) => i.url) ?? desktopImages}
        height="100%"
      />
    </Gallery>
  );
};

// Main Component
const HomeTopBanner: React.FC = () => {
  const isMobile = useIsMobile();
  const { initData } = useProduct();
  const router = useRouter();

  const onClick = (index: number) => {
    router.push(`/${initData?.mobileBannerRoutes?.[index]}`);
  };

  const clickableImages = useMemo(() => {
    const indices: number[] = [];
    initData?.mobileBannerRoutes?.forEach((route, index) => {
      if (!!route) {
        indices.push(index);
      }
    });
    return indices;
  }, [initData?.mobileBannerRoutes]);

  return isMobile ? (
    <MobileWrapper>
      <StyledCarousel
        clickableImages={clickableImages}
        onClick={onClick}
        isCircle
        autoScroll
        images={initData?.mobileBannerImages?.map((i) => i.url) ?? mobileImages}
        height="500px"
      />
    </MobileWrapper>
  ) : (
    <ImageGrid />
  );
};

export default HomeTopBanner;
