import styled from '@emotion/styled';
import React from 'react';
import Colors from '../colors/colors';

export interface TextboxProps {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  fontSize?: string;
  fontWeight?: string;
  textDecoration?: string;
  textAlign?: string;
  textTransform?: string;
  textOverflow?: string;
  htmlTag?: React.ElementType;
  isTextHTML?: boolean;
  isTextLinkExternal?: boolean;
  isTextLink?: boolean;
  isTextLinkUnderline?: boolean;
  href?: string;
  italic?: boolean;
  allCaps?: boolean;
  allLowercase?: boolean;
  style?: React.CSSProperties;
}

const StyledText = styled.div<TextboxProps>`
  color: ${({ color = Colors.black }) => color};
  font-size: ${({ fontSize = 'inherit' }) => fontSize};
  font-weight: ${({ fontWeight = 'normal' }) => fontWeight};
  text-decoration: ${({ textDecoration = 'none' }) => textDecoration};
  text-align: ${({ textAlign = 'left' }) => textAlign};
  text-transform: ${({ textTransform, allCaps, allLowercase }) =>
    allCaps
      ? 'uppercase'
      : allLowercase
        ? 'lowercase'
        : textTransform || 'none'};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
  text-overflow: ${({ textOverflow = 'initial' }) => textOverflow};
  overflow: hidden;
  white-space: nowrap;
`;

const Textbox: React.FC<TextboxProps> = ({
  children,
  htmlTag = 'div',
  isTextHTML = false,
  isTextLink = false,
  isTextLinkExternal = false,
  isTextLinkUnderline = false,
  href = '#',
  ...styleProps
}) => {
  const Tag = htmlTag;

  const linkStyle = {
    textDecoration: isTextLinkUnderline ? 'underline' : 'none',
    color: styleProps.color || 'inherit',
    fontSize: styleProps.fontSize || 'inherit',
    fontWeight: styleProps.fontWeight || 'normal',
  };

  if (isTextLink) {
    return (
      <a
        href={href}
        target={isTextLinkExternal ? '_blank' : '_self'}
        rel={isTextLinkExternal ? 'noopener noreferrer' : undefined}
        style={linkStyle}
      >
        {isTextHTML && typeof children === 'string' ? (
          <span dangerouslySetInnerHTML={{ __html: children }} />
        ) : (
          children
        )}
      </a>
    );
  }

  return (
    <StyledText as={Tag} {...styleProps}>
      {isTextHTML && typeof children === 'string' ? (
        <span dangerouslySetInnerHTML={{ __html: children }} />
      ) : (
        children
      )}
    </StyledText>
  );
};

export default Textbox;
