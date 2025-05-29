import newStyled from '@emotion/styled';
import React from 'react';
import Colors from '../colors/colors';

interface ConatinerProps {
  children: React.ReactNode;
  bgColor?: string;
  padding?: string;
  margin?: string;
  height?: string;
  width?: string;
  color?: string;
  center?: boolean; // shorthand for both horizontal and vertical
  horizontalCenter?: boolean;
  verticalCenter?: boolean;
  fontSize?: string;
  flexRow?: boolean;
  className?: string;
  overflow?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
  position?: string;
}

const StyledContent = newStyled.div<ConatinerProps>`
  display: flex;
  flex-direction: ${({ flexRow }) => (flexRow ? 'row' : 'column')};
  justify-content: ${({ center, verticalCenter }) =>
    center || verticalCenter ? 'center' : 'flex-start'};
  align-items: ${({ center, horizontalCenter }) =>
    center || horizontalCenter ? 'center' : 'flex-start'};
  background-color: ${({ bgColor = 'transparent' }) => bgColor};
  padding: ${({ padding = '12px' }) => padding};
  margin: ${({ margin = '0' }) => margin};
  height: ${({ height = 'auto' }) => height};
  width: ${({ width = '100%' }) => width};
  color: ${({ color = Colors.black }) => color};
  font-size: ${({ fontSize = '16px' }) => fontSize};
  overflow: ${({ overflow = 'visible' }) => overflow};
  font-weight: 500;
  transition: background-color 0.3s ease;
`;

const Container = (props: ConatinerProps) => {
  const { children, ...styleProps } = props;
  return <StyledContent {...styleProps}>{children}</StyledContent>;
};

export default Container;
