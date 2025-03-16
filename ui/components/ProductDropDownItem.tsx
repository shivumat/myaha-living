import styled from '@emotion/styled';
import React from 'react';

interface Product {
  id: string;
  title: string;
  variants: { images: string[] }[]; // Assuming the first variant has the main image
}

interface ProductDropdownItemProps {
  product: Product;
}

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #f5f5f5;
  }
`;

const ProductImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
`;

const ProductTitle = styled.p`
  font-size: 14px;
  color: #333;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductDropdownItem: React.FC<ProductDropdownItemProps> = ({
  product,
}) => {
  const imageUrl = product.variants[0]?.images[0] || '/placeholder.png'; // Fallback if no image

  return (
    <DropdownItem>
      <ProductImage src={imageUrl} alt={product.title} />
      <ProductTitle>{product.title}</ProductTitle>
    </DropdownItem>
  );
};

export default ProductDropdownItem;
