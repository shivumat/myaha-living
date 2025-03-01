'use client';
import styled from '@emotion/styled';
import { TouchEvent, useEffect, useState } from 'react';

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

// Hook to detect mobile view
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile;
};

// Styled Components
const Gallery = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  margin: auto;
  height: 95%;
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

const CarouselContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  position: relative;
  touch-action: pan-x;
`;

const CarouselWrapper = styled.div<{ index: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.index * -100}%);
`;

const CarouselImageDiv = styled.div`
  min-width: 100%;
  position: relative;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 720px;
  object-fit: fill;
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 40px;
  height: 5px;
  border-radius: 12px;
  border: 1px solid black;
  background: ${(props) => (props.active ? 'black' : 'transparent')};
  cursor: pointer;
`;

const Carousel: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [startX, setStartX] = useState<number | null>(null);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!startX) return;
    const diff = startX - e.touches[0].clientX;

    if (diff > 50) {
      setIndex((prev) => (prev + 1) % mobileImages.length);
      setStartX(null);
    } else if (diff < -50) {
      setIndex(
        (prev) => (prev - 1 + mobileImages.length) % mobileImages.length,
      );
      setStartX(null);
    }
  };

  return (
    <CarouselContainer
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <CarouselWrapper index={index}>
        {mobileImages.map((src, idx) => (
          <CarouselImageDiv key={idx}>
            <CarouselImage src={src} alt={`Image ${idx + 1}`} />
          </CarouselImageDiv>
        ))}
      </CarouselWrapper>
      <DotsContainer>
        {mobileImages.map((_, idx) => (
          <Dot key={idx} active={index === idx} onClick={() => setIndex(idx)} />
        ))}
      </DotsContainer>
    </CarouselContainer>
  );
};

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
  return isMobile ? <Carousel /> : <ImageGrid />;
};

export default HomeTopBanner;
