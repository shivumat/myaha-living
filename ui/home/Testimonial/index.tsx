import Colors from '#/ui/colors/colors';
import Container from '#/ui/components/ContainerBox';
import Textbox from '#/ui/components/Textbox';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import TestimonialCard, { Testimonial } from './TestimonialCard';

const testimonials: Testimonial[] = [
  {
    name: 'Vidhi Agarwal',
    rating: 5,
    review:
      'Received my second order from Myaha today. Packaging is top notch which ensures all glass products are delivered safely. Fits multiple flower stems and makes a beautiful centrepiece.',
    images: ['/images/testimonials/1/1.jpeg', '/images/testimonials/1/2.jpeg'],
  },
  {
    name: 'Swati Choudhary',
    rating: 5,
    review:
      'Myaha offers a refreshing blend of innovation and elegance. As promised, each design reflects a deep inspiration drawn from nature. I purchased the N.Y.C tumblers, they are exceptional in both form and function. A classy addition to my drinkware collection.',
    images: ['/images/testimonials/2/1.jpeg'],
  },
  {
    name: 'Rajat khandelwal',
    rating: 5,
    review:
      'Loved the design and quality. Has made my work-from-home days so much more fun!',
    images: ['/images/testimonials/3/1.jpeg'],
  },
  {
    name: 'Vidhi Agarwal',
    rating: 5,
    review:
      'True to its photos, the sunset vases add elegance to any dinner party tablescape. This visually stunning piece makes for a perfect gift for any occasion.',
    images: ['/images/testimonials/4/1.jpeg', '/images/testimonials/4/2.jpeg'],
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
