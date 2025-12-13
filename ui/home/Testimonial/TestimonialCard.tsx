import Colors from '#/ui/colors/colors';
import styled from '@emotion/styled';
import React from 'react';

export type Testimonial = {
  name: string;
  rating: number;
  review: string;
  images: string[];
};

const Card = styled.div<{ isProductPage?: boolean }>`
  min-width: 100%;
  background-color: ${({ isProductPage }) =>
    !isProductPage ? `${Colors.white}32` : `${Colors.black}32`};
  padding: 24px;
  color: ${({ isProductPage }) =>
    !isProductPage ? `${Colors.white}` : `${Colors.black}`};
  box-sizing: border-box;
  border-radius: 8px;
`;

const Images = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const Stars = styled.div`
  margin: 8px 0;
  color: gold;
`;

const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  isProductPage?: boolean;
}> = ({ testimonial, isProductPage }) => {
  return (
    <Card isProductPage={isProductPage}>
      <strong>{testimonial.name}</strong>
      <Stars>
        {'★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating)}
      </Stars>
      <p>{testimonial.review}</p>
      <Images>
        {testimonial.images.map((img, idx) => (
          <img key={idx} src={img} alt={`testimonial-${idx}`} />
        ))}
      </Images>
    </Card>
  );
};

export default TestimonialCard;
