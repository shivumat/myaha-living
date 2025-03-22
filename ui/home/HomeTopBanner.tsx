'use client';
import { useIsMobile } from '#/hooks/useMobile';
import styled from '@emotion/styled';
import Carousel from '../components/Carousel';

// List of images in the public folder
const desktopImages: string[] = [
  'https://i.postimg.cc/ZRMk0WX5/1.png',
  'https://i.postimg.cc/JnnV1N6F/2.png',
  'https://i.postimg.cc/Xvx6SH8F/3.png',
];

const mobileImages: string[] = [
  'https://i.postimg.cc/QNFCm18S/1.png',
  'https://i.postimg.cc/HncqMpC4/2.png',
  'https://i.postimg.cc/wMCScSqK/3.png',
];
// Styled Components
const Gallery = styled.div`
  width: 100%;
  margin: auto;
  height: 90%;
`;

const MobileWrapper = styled.div`
  padding: 0px;
`;

const StyledCarousel = styled(Carousel)`
  div {
    > img {
      object-position: 0% 20%;
    }
  }
  div:nth-child(3) {
    > img {
      object-position: 0% -10%;
    }
  }
`;

// Desktop Grid Layout Component
const ImageGrid: React.FC = () => (
  <Gallery>
    <Carousel isCircle autoScroll images={desktopImages} height="85vh" />
  </Gallery>
);

// Main Component
const HomeTopBanner: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? (
    <MobileWrapper>
      <StyledCarousel
        isCircle
        autoScroll
        images={mobileImages}
        height="400px"
      />
    </MobileWrapper>
  ) : (
    <ImageGrid />
  );
};

export default HomeTopBanner;
