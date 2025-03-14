import newStyled from '@emotion/styled';
import React, { ReactNode, TouchEvent, useState } from 'react';

const CarouselContainer = newStyled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  position: relative;
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

const Carousel = (props: {
  images?: string[];
  height: string;
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  const { images = [], height, children } = props;
  const [index, setIndex] = useState<number>(0);
  const [startX, setStartX] = useState<number | null>(null);

  const dotMap = !!images.length ? images : React.Children.toArray(children);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!startX) return;
    const diff = startX - e.touches[0].clientX;

    if (diff > 50) {
      setIndex((prev) => (prev + 1) % dotMap.length);
      setStartX(null);
    } else if (diff < -50) {
      setIndex((prev) => (prev - 1 + dotMap.length) % dotMap.length);
      setStartX(null);
    }
  };

  const CarouselChildren = (
    <>
      {React.Children.map(children, (child) => (
        <CarouselImageDiv>{child}</CarouselImageDiv>
      ))}
    </>
  );

  const CarouselComponents = !!images?.length ? (
    <>
      {images.map((src, idx) => (
        <CarouselImageDiv key={idx}>
          <CarouselImage src={src} alt={`Image ${idx + 1}`} height={height} />
        </CarouselImageDiv>
      ))}
    </>
  ) : (
    CarouselChildren
  );

  return (
    <CarouselContainer
      className={props.className}
      onClick={props.onClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <CarouselWrapper index={index}>{CarouselComponents}</CarouselWrapper>
      {dotMap.length > 1 && (
        <DotsContainer>
          {dotMap.map((_, idx) => (
            <Dot
              key={idx}
              active={index === idx}
              onClick={() => setIndex(idx)}
            />
          ))}
        </DotsContainer>
      )}
    </CarouselContainer>
  );
};

export default Carousel;
