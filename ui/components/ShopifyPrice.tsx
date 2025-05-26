import styled from '@emotion/styled';
import React from 'react';
import Colors from '../colors/colors';

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
  letter-spacing: 1px;
  color: ${Colors.black};
`;

const CompareAtPrice = styled.span`
  text-decoration: line-through;
  color: #999;
  font-weight: 400;
  letter-spacing: 1px;
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
  const numericCompareAt = compareAtPrice ? parsePrice(compareAtPrice) : 0;

  const isDiscounted = compareAtPrice && numericCompareAt > numericPrice;

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
