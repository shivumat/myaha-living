'use client';
import { useIsMobile } from '#/hooks/useMobile';
import styled from '@emotion/styled';
import Carousel from '../components/Carousel';

// List of images in the public folder
const desktopImages: string[] = [
  'https://i.postimg.cc/XJ0F0pDt/1.png',
  'https://i.postimg.cc/JhXJgbKb/2.png',
  'https://i.postimg.cc/Qdw106g8/3.png',
];

const mobileImages: string[] = [
  'https://i.postimg.cc/2SZV8CvY/1.png',
  'https://i.postimg.cc/FsqY4YYG/2.png',
  'https://i.postimg.cc/4NnYq6xm/3.png',
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
  div:nth-child(3) {
    > img {
      object-position: 0% 0%;
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
