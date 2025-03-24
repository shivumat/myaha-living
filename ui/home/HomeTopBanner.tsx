'use client';
import { useIsMobile } from '#/hooks/useMobile';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
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
  height: 90%;
`;

const MobileWrapper = styled.div`
  padding: 0px;
`;

const StyledCarousel = styled(Carousel)``;

// Desktop Grid Layout Component
const ImageGrid: React.FC<{ onClick: () => void }> = (props) => (
  <Gallery>
    <Carousel
      clickableImages={[0]}
      onClick={props.onClick}
      isCircle
      autoScroll
      images={desktopImages}
      height="85vh"
    />
  </Gallery>
);

// Main Component
const HomeTopBanner: React.FC = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const onClick = () => {
    router.push('/products');
  };

  return isMobile ? (
    <MobileWrapper>
      <StyledCarousel
        clickableImages={[0]}
        onClick={onClick}
        isCircle
        autoScroll
        images={mobileImages}
        height="450px"
      />
    </MobileWrapper>
  ) : (
    <ImageGrid onClick={onClick} />
  );
};

export default HomeTopBanner;
