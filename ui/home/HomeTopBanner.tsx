'use client';
import { useIsMobile } from '#/hooks/useMobile';
import styled from '@emotion/styled';
import Carousel from '../components/Carousel';

// List of images in the public folder
const desktopImages: string[] = [
  '/images/home/desktop_home_banner3.png',
  '/images/home/desktop_home_banner1.png',
  '/images/home/desktop_home_banner2.png',
];

const mobileImages: string[] = [
  '/images/home/protrait_banner3.png',
  '/images/home/protrait_banner1.png',
  '/images/home/protrait_banner2.png',
];

// Styled Components
const Gallery = styled.div`
  width: 100%;
  margin: auto;
  height: 90%;
`;

const MobileWrapper = styled.div`
  padding: 0px 20px;
`;

// Desktop Grid Layout Component
const ImageGrid: React.FC = () => (
  <Gallery>
    <Carousel images={desktopImages} height="85vh" />
  </Gallery>
);

// Main Component
const HomeTopBanner: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? (
    <MobileWrapper>
      <Carousel images={mobileImages} height="720px" />
    </MobileWrapper>
  ) : (
    <ImageGrid />
  );
};

export default HomeTopBanner;
