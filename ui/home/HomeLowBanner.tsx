'use client';
import { useIsMobile } from '#/hooks/useMobile';
import styled from '@emotion/styled';
import Carousel from '../components/Carousel';

const mobileImages: string[] = [
  'https://i.postimg.cc/YCsfT27w/1.jpg',
  'https://i.postimg.cc/sD3ch0mb/2-1.png',
  'https://i.postimg.cc/MGfbwkZf/3.jpg',
];

// Styled Components
const Gallery = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  column-gap: 20px;
  margin: auto;
  height: 60%;
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
  padding: 20px;
  height: 650px;
`;

// Desktop Grid Layout Component
const ImageGrid: React.FC = () => (
  <Gallery>
    {mobileImages.map((src, index) => (
      <ImageWrapper key={index}>
        <img src={src} alt={`Image ${index + 1}`} />
      </ImageWrapper>
    ))}
  </Gallery>
);

// Main Component
const HomeLowBanner: React.FC = () => {
  const isMobile = useIsMobile();
  const Body = isMobile ? (
    <MobileWrapper>
      <Carousel images={mobileImages} height="720px" />
    </MobileWrapper>
  ) : (
    <ImageGrid />
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: isMobile ? '24px' : '36px',
          fontWeight: '600',
          padding: '0px 20px',
        }}
      >
        Stories you can feel, designs you can cherish.
      </div>
      <div
        style={{
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: 'lighter',
          padding: '0px 20px',
        }}
      >
        Step behind the scenes at Myaha, where stories come to life through
        thoughtful design and meticulous craftsmanship. From the first sketch to
        the final polish, every piece is inspired by emotions, nature, and
        culture, ensuring it resonates deeply with those who experience it.
        Discover the journey of creating decor that’s not just beautiful but
        meaningful—designed to be cherished for a lifetime.
      </div>
      {Body}
    </div>
  );
};

export default HomeLowBanner;
