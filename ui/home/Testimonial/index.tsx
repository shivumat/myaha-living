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
  {
    name: 'Shivank Mathur',
    rating: 5,
    review:
      'This lamp completely changed the vibe of our living room. Love the ambient vibe it adds to our space and the green colour gives a lovely pop without being too loud. One of my favourite pieces at home right now.',
    images: ['/images/testimonials/5/1.jpeg', '/images/testimonials/5/2.jpeg'],
  },
  {
    name: 'Radhika Agarwal',
    rating: 5,
    review:
      'Got my hands on Divergence glasses for Diwali. Even plain drinks looked fancy in these glasses. Love how unique the designs are. We used them for mocktails at home and everyone kept asking about them.',
    images: ['/images/testimonials/6/1.jpeg'],
  },
  // Add more testimonials here

  {
    name: 'Divisha Ranka',
    rating: 5,
    review:
      'I have never gotten as many compliments on piece of crockery as I have on Myaha’s divergence glasses. And if someone’s not outright appreciated them, every single person has taken a second look - the pieces are truly that unique. I’ve got my eyes on the glitch set now😛',
    images: ['/images/testimonials/7/1.jpeg'],
  },
  {
    name: 'Zaid',
    rating: 5,
    review:
      'I’m genuinely loving these new decor pieces. These textured vases instantly elevated my living room! The bold red one has such a striking presence, and the off-white planter brings a calm, organic touch complementing the rug and the floor.',
    images: ['/images/testimonials/8/1.jpeg'],
  },
  {
    name: 'Zaid',
    rating: 5,
    review:
      'The light and dark green earthy planters are just beautiful. Their soft, rounded shapes just blend naturally into our space, giving the plants a warm, grounded feel. They add that subtle charm that makes the room feel more peaceful and cozy.',
    images: ['/images/testimonials/9/1.jpeg'],
  },
  {
    name: 'Arjun Bharadwaj',
    rating: 5,
    review:
      'Such cute little planters! They fit perfectly on my shelf and add so much character to the space. Finish feels very earthy and handmade. Also really impressed with how well they were packed everything arrived safely.',
    images: ['/images/testimonials/10/1.jpeg'],
  },
  {
    name: 'Mahima Arora',
    rating: 5,
    review:
      'I’d been searching for a tall vase for my side table and finally found one I love. This brown vase from Myaha fits my bedroom vibe perfectly and is also affordable for the size and quality of the product.',
    images: ['/images/testimonials/11/1.jpeg'],
  },
  {
    name: 'Tavishi Saxena',
    rating: 5,
    review:
      "Just couldn't have my eyes off this piece the moment I saw it. It looks beautiful both with flowers and even on its own. Everyone who visits ends up asking where it’s from. Feels very premium and thoughtfully made.",
    images: ['/images/testimonials/12/1.jpeg'],
  },
  {
    name: 'Maulik Bharadwaj',
    rating: 5,
    review:
      'Love how this Grace vase from Myaha doesn’t overpower my desk, but still adds such subtle character to it. The packaging was done really well, all the glass pieces arrived safely. Definitely ordering this one in more colours.',
    images: ['/images/testimonials/13/1.jpeg'],
  },
];

const StyledContainer = styled(Container)`
  position: relative;
`;

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 900px;
  margin: 20px 0px;
`;

const SlideTrack = styled.div<{ index: number }>`
  display: flex;
  transition: transform 0.6s ease;
  transform: translateX(${({ index }) => index * -100}%);
`;

const Arrow = styled.div<{
  direction: 'left' | 'right';
  isProductPage?: boolean;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ direction }) => (direction === 'left' ? `left: 20px;` : `right: 20px;`)}
  background: ${({ isProductPage }) =>
    isProductPage ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
  color: ${({ isProductPage }) =>
    isProductPage ? Colors.white : Colors.black};
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

const Dot = styled.span<{ active: boolean; isProductPage?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active, isProductPage }) =>
    !isProductPage ? (active ? '#fff' : '#999') : active ? '#000' : '#AAA'};
  transition: background-color 0.3s ease;
`;

const TestimonialCarousel: React.FC<{ isProductPage?: boolean }> = ({
  isProductPage,
}) => {
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
      bgColor={!isProductPage ? '#5B1D1D' : Colors.white}
      padding="40px"
    >
      <Textbox
        htmlTag={'h2'}
        fontSize="24px"
        color={!isProductPage ? Colors.white : Colors.black}
        textAlign="center"
      >
        What our customers are saying?
      </Textbox>
      <Arrow
        isProductPage={isProductPage}
        direction="left"
        onClick={handlePrev}
      >
        <HiOutlineChevronLeft />
      </Arrow>
      <Arrow
        isProductPage={isProductPage}
        direction="right"
        onClick={handleNext}
      >
        <HiOutlineChevronRight />
      </Arrow>
      <CarouselContainer>
        <SlideTrack index={currentIndex}>
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard
              key={idx}
              testimonial={testimonial}
              isProductPage={isProductPage}
            />
          ))}
        </SlideTrack>
      </CarouselContainer>
      <Dots>
        {testimonials.map((_, i) => (
          <Dot
            key={i}
            active={i === currentIndex}
            isProductPage={isProductPage}
          />
        ))}
      </Dots>
    </StyledContainer>
  );
};

export default TestimonialCarousel;
