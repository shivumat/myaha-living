import newStyled from '@emotion/styled';
import { TouchEvent, useState } from 'react';

const CarouselContainer = newStyled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  position: relative;
  touch-action: pan-x;
`;

const CarouselWrapper = newStyled.div<{ index: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.index * -100}%);
`;

const CarouselImageDiv = newStyled.div`
  min-width: 100%;
  position: relative;
`;

const CarouselImage = newStyled.img<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
  object-fit: fill;
`;

const DotsContainer = newStyled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
`;

const Dot = newStyled.div<{ active: boolean }>`
  width: 40px;
  height: 5px;
  border-radius: 12px;
  border: 1px solid black;
  background: ${(props) => (props.active ? 'black' : 'transparent')};
  cursor: pointer;
`;

const Carousel = (props: { images: string[]; height: string }) => {
  const { images, height } = props;
  const [index, setIndex] = useState<number>(0);
  const [startX, setStartX] = useState<number | null>(null);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!startX) return;
    const diff = startX - e.touches[0].clientX;

    if (diff > 50) {
      setIndex((prev) => (prev + 1) % images.length);
      setStartX(null);
    } else if (diff < -50) {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
      setStartX(null);
    }
  };

  return (
    <CarouselContainer
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <CarouselWrapper index={index}>
        {images.map((src, idx) => (
          <CarouselImageDiv key={idx}>
            <CarouselImage src={src} alt={`Image ${idx + 1}`} height={height} />
          </CarouselImageDiv>
        ))}
      </CarouselWrapper>
      <DotsContainer>
        {images.map((_, idx) => (
          <Dot key={idx} active={index === idx} onClick={() => setIndex(idx)} />
        ))}
      </DotsContainer>
    </CarouselContainer>
  );
};

export default Carousel;
