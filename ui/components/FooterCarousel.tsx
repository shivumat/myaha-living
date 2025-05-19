import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';

const Container = newStyled.div<{ rounded: boolean }>`
    background-color: #4B4B39;
    ${({ rounded }) => (rounded ? 'border-radius: 10px;' : '')}
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

import { TouchEvent, useState } from 'react';
import Colors from '../colors/colors';

const CarouselContainer = newStyled.div<{ rounded: boolean }>`
    background-color: #4B4B39;
    ${({ rounded }) => (rounded ? 'border-radius: 10px;' : '')}
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

const CarouselDiv = newStyled.div`
  min-width: 33%;
  position: relative;
  @media (max-width: 800px) {
    min-width: 100%;
  }
`;

const CarousleIcon = newStyled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    color: ${Colors.white};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 180px;
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
  border: 1px solid ${Colors.white};
  background: ${(props) => (props.active ? 'black' : 'transparent')};
  cursor: pointer;
`;

const MobileFooterCarousel = ({ rounded = true }: { rounded?: boolean }) => {
  const [index, setIndex] = useState<number>(0);
  const [startX, setStartX] = useState<number | null>(null);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!startX) return;
    const diff = startX - e.touches[0].clientX;

    if (diff > 50) {
      setIndex((prev) => (prev + 1) % 3);
      setStartX(null);
    } else if (diff < -50) {
      setIndex((prev) => (prev - 1 + 3) % 3);
      setStartX(null);
    }
  };

  return (
    <CarouselContainer
      rounded={rounded}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <CarouselWrapper index={index}>
        <CarouselDiv>
          <CarousleIcon>
            <img src="/images/low-banner/low-banner1.svg" />
            Sustainability centric production
          </CarousleIcon>
        </CarouselDiv>
        <CarouselDiv>
          <CarousleIcon>
            <img src="/images/low-banner/low-banner2.svg" />
            Luxury in detail
          </CarousleIcon>
        </CarouselDiv>
        <CarouselDiv>
          <CarousleIcon>
            <img src="/images/low-banner/low-banner3.svg" />
            Thoughtfully handmade
          </CarousleIcon>
        </CarouselDiv>
      </CarouselWrapper>
      <DotsContainer>
        {[1, 2, 3].map((_, idx) => (
          <Dot key={idx} active={index === idx} onClick={() => setIndex(idx)} />
        ))}
      </DotsContainer>
    </CarouselContainer>
  );
};

const FooterCarousel = ({ rounded = true }: { rounded?: boolean }) => {
  const isMobile = useIsMobile();

  if (isMobile) return <MobileFooterCarousel rounded={rounded} />;

  return (
    <Container rounded={rounded}>
      <CarouselDiv>
        <CarousleIcon>
          <img src="/images/low-banner/low-banner1.svg" />
          Sustainability centric production
        </CarousleIcon>
      </CarouselDiv>
      <CarouselDiv>
        <CarousleIcon>
          <img src="/images/low-banner/low-banner2.svg" />
          Luxury in detail
        </CarousleIcon>
      </CarouselDiv>
      <CarouselDiv>
        <CarousleIcon>
          <img src="/images/low-banner/low-banner3.svg" />
          Thoughtfully handmade
        </CarousleIcon>
      </CarouselDiv>
    </Container>
  );
};

export default FooterCarousel;
