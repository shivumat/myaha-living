import styled from '@emotion/styled';
import React from 'react';

type ShopifyPriceProps = {
  price: string;
  compareAtPrice?: string;
  currency: string;
  fontSize?: string;
};

const PriceWrapper = styled.div<{ fontSize: string }>`
  font-size: ${({ fontSize }) => fontSize};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CurrentPrice = styled.span`
  font-weight: 600;
`;

const CompareAtPrice = styled.span`
  text-decoration: line-through;
  color: #999;
  font-weight: 400;
`;

const parsePrice = (value: string): number =>
  parseFloat(value.replace(/,/g, ''));

const ShopifyPrice: React.FC<ShopifyPriceProps> = ({
  price,
  compareAtPrice,
  currency,
  fontSize = '24px',
}) => {
  const numericPrice = parsePrice(price);
  const numericCompareAt = parsePrice(compareAtPrice || '');

  const isDiscounted = compareAtPrice && numericCompareAt !== numericPrice;

  return (
    <PriceWrapper fontSize={fontSize}>
      <CurrentPrice>
        {currency} {price}
      </CurrentPrice>
      {isDiscounted && (
        <CompareAtPrice>
          {currency} {compareAtPrice}
        </CompareAtPrice>
      )}
    </PriceWrapper>
  );
};

export default ShopifyPrice;
