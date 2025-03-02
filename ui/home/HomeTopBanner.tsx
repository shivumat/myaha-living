'use client';
import { useIsMobile } from '#/hooks/useMobile';
import styled from '@emotion/styled';
import Carousel from '../components/Carousel';

// List of images in the public folder
const desktopImages: string[] = [
  '/images/home/desktop_home_banner1.png',
  '/images/home/desktop_home_banner2.png',
  '/images/home/desktop_home_banner3.png',
];

const mobileImages: string[] = [
  '/images/home/protrait_banner1.png',
  '/images/home/protrait_banner2.png',
  '/images/home/protrait_banner3.png',
];

// Styled Components
const Gallery = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  margin: auto;
  height: 90%;
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;

  &:nth-of-type(1) {
    grid-row: span 2;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const MobileWrapper = styled.div`
  padding: 0px 20px;
`;

// Desktop Grid Layout Component
const ImageGrid: React.FC = () => (
  <Gallery>
    {desktopImages.map((src, index) => (
      <ImageWrapper key={index}>
        <img src={src} alt={`Image ${index + 1}`} />
      </ImageWrapper>
    ))}
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
