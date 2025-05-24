import Colors from '#/ui/colors/colors';
import Container from '#/ui/components/ContainerBox';
import Textbox from '#/ui/components/Textbox';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import TestimonialCard, { Testimonial } from './TestimonialCard';

const testimonials: Testimonial[] = [
  {
    name: 'Priya S.',
    rating: 4,
    review:
      'Elevate your indoor or outdoor greenery with our Beige Vase. Its soft, soothing hue and clean lines add a touch of elegance to any space, blending seamlessly with a variety of decor styles.',
    images: ['/images/vase1.jpg', '/images/vase2.jpg'],
  },
  {
    name: 'Priya S1.',
    rating: 4,
    review:
      'Elevate your indoor or outdoor greenery with our Beige Vase. Its soft, soothing hue and clean lines add a touch of elegance to any space, blending seamlessly with a variety of decor styles.',
    images: ['/images/vase1.jpg', '/images/vase2.jpg'],
  },
  {
    name: 'Priya S2.',
    rating: 4,
    review:
      'Elevate your indoor or outdoor greenery with our Beige Vase. Its soft, soothing hue and clean lines add a touch of elegance to any space, blending seamlessly with a variety of decor styles.',
    images: ['/images/vase1.jpg', '/images/vase2.jpg'],
  },
  {
    name: 'Priya S3.',
    rating: 4,
    review:
      'Elevate your indoor or outdoor greenery with our Beige Vase. Its soft, soothing hue and clean lines add a touch of elegance to any space, blending seamlessly with a variety of decor styles.',
    images: ['/images/vase1.jpg', '/images/vase2.jpg'],
  },
  // Add more testimonials here
];

const StyledContainer = styled(Container)`
  position: relative;
`;

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 800px;
  margin: 20px 0px;
`;

const SlideTrack = styled.div<{ index: number }>`
  display: flex;
  transition: transform 0.6s ease;
  transform: translateX(${({ index }) => index * -100}%);
`;

const Arrow = styled.div<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ direction }) => (direction === 'left' ? `left: 20px;` : `right: 20px;`)}
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  gap: 8px;
`;

const Dot = styled.span<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#fff' : '#999')};
  transition: background-color 0.3s ease;
`;

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );

  const handleNext = () =>
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );

  return (
    <StyledContainer
      margin="0px"
      horizontalCenter
      bgColor="#5B1D1D"
      padding="40px"
    >
      <Textbox
        htmlTag={'h2'}
        fontSize="24px"
        color={Colors.white}
        textAlign="center"
      >
        What our customers are saying?
      </Textbox>
      <Arrow direction="left" onClick={handlePrev}>
        <HiOutlineChevronLeft />
      </Arrow>
      <Arrow direction="right" onClick={handleNext}>
        <HiOutlineChevronRight />
      </Arrow>
      <CarouselContainer>
        <SlideTrack index={currentIndex}>
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} testimonial={testimonial} />
          ))}
        </SlideTrack>
      </CarouselContainer>
      <Dots>
        {testimonials.map((_, i) => (
          <Dot key={i} active={i === currentIndex} />
        ))}
      </Dots>
    </StyledContainer>
  );
};

export default TestimonialCarousel;
