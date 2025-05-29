import styled from '@emotion/styled';
import React from 'react';

interface OverlayProps {
  children?: React.ReactNode;
  visible?: boolean;
  zIndex?: number;
  backgroundColor?: string;
  blurBackground?: boolean;
  onClick?: () => void;
}

const StyledOverlay = styled.div<
  Required<
    Pick<
      OverlayProps,
      'visible' | 'zIndex' | 'backgroundColor' | 'blurBackground'
    >
  >
>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  backdrop-filter: ${({ blurBackground }) =>
    blurBackground ? 'blur(4px)' : 'none'};
  z-index: ${({ zIndex }) => zIndex};
  transition: opacity 0.3s ease;
  opacity: ${({ visible }) => (visible ? 0.6 : 0)};
  :hover {
    opacity: 1;
  }
`;

const Overlay: React.FC<OverlayProps> = ({
  children,
  visible = true,
  zIndex = 500,
  backgroundColor = 'rgba(0, 0, 0, 0.5)',
  blurBackground = false,
  onClick,
}) => {
  return (
    <StyledOverlay
      visible={visible}
      zIndex={zIndex}
      backgroundColor={backgroundColor}
      blurBackground={blurBackground}
      onClick={onClick}
    >
      {children}
    </StyledOverlay>
  );
};

export default Overlay;
