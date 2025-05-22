import newStyled from '@emotion/styled';
import Image from 'next/image';
import React, {
  ReactNode,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import Colors from '../colors/colors';

const CarouselContainer = newStyled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
  background: #f5f5f5;
  cursor: pointer;
`;

const CarouselWrapper = newStyled.div<{ index: number }>`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.index * -100}%);
`;

const CarouselImageDiv = newStyled.div`
  min-width: 100%;
  position: relative;
`;

const DotsContainer = newStyled.div<{ isCircle: boolean }>`
  position: absolute;
  bottom: 15px;
  left: ${({ isCircle }) => (isCircle ? '90%' : '50%')};
  transform: translateX(-${({ isCircle }) => (isCircle ? '90%' : '50%')});
  display: flex;
  gap: 5px;
`;

const Dot = newStyled.div<{ active: boolean; isCircle: boolean }>`
  width: ${(props) => (props.isCircle ? '10px' : '40px')};
  height: ${(props) => (props.isCircle ? '10px' : '5px')};
  border-radius: ${(props) => (props.isCircle ? '50%' : '12px')};
  border: 1px solid ${Colors.black};
  background: ${(props) => (props.active ? 'black' : 'transparent')};
  cursor: pointer;
`;

const Carousel = (props: {
  images?: string[];
  height: string;
  children?: ReactNode;
  onClick?: (index: number) => void;
  className?: string;
  isCircle?: boolean;
  autoScroll?: boolean;
  hoverScroll?: boolean; // ✅ New prop
  clickableImages?: number[];
}) => {
  const {
    images = [],
    children,
    isCircle = false,
    autoScroll = false,
    hoverScroll = false,
  } = props;

  const [index, setIndex] = useState<number>(0);
  const [startX, setStartX] = useState<number | null>(null);
  const scrollRef = useRef<NodeJS.Timeout | null>(null);

  const dotMap = images.length ? images : React.Children.toArray(children);

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

  useEffect(() => {
    if (!autoScroll || dotMap.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % dotMap.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoScroll, dotMap.length]);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  const handleMouseEnter = () => {
    if (!hoverScroll || dotMap.length <= 1) return;

    setIndex((prev) => (prev + 1) % dotMap.length);
    scrollRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % dotMap.length);
    }, 1500);
  };

  const handleMouseLeave = () => {
    if (scrollRef.current) {
      clearInterval(scrollRef.current);
      scrollRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (scrollRef.current) clearInterval(scrollRef.current);
    };
  }, []);

  const CarouselComponents = images.length ? (
    <>
      {images.map((src, idx) => (
        <CarouselImageDiv
          key={idx}
          onClick={() =>
            props.clickableImages?.includes(idx) && props.onClick?.(idx)
          }
        >
          <Image
            src={src}
            alt={`Image ${idx + 1}`}
            layout="fill"
            objectFit="cover"
            priority={idx === index}
          />
        </CarouselImageDiv>
      ))}
    </>
  ) : (
    React.Children.map(children, (child) => (
      <CarouselImageDiv>{child}</CarouselImageDiv>
    ))
  );

  return (
    <CarouselContainer
      className={props.className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CarouselWrapper
        index={index}
        onClick={() => !props.clickableImages?.length && props.onClick?.(index)}
      >
        {CarouselComponents}
      </CarouselWrapper>

      {dotMap.length > 1 && (
        <DotsContainer isCircle={isCircle}>
          {dotMap.map((_, idx) => (
            <Dot
              key={idx}
              active={index === idx}
              isCircle={isCircle}
              onClick={() => setIndex(idx)}
            />
          ))}
        </DotsContainer>
      )}
    </CarouselContainer>
  );
};

export default Carousel;
