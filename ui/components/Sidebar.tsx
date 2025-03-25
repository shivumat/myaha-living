'use client';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import CrossLogo from '../svg/cross-logo';

interface SidebarProps {
  isOpen: boolean;
  hideBackdrop?: boolean;
  width?: string;
  onClose: () => void;
  side?: 'left' | 'right';
  title?: React.ReactNode;
  children: React.ReactNode;
}

const SidebarWrapper = styled.div<{
  isOpen: boolean;
  side: 'left' | 'right';
  width?: string;
}>`
  position: fixed;
  top: 0;
  ${({ side }) => (side === 'left' ? 'left: 0;' : 'right: 0;')}
  width: ${({ width }) => width};
  height: 100dvh;
  background: white;
  box-shadow: ${({ side }) =>
    side === 'left'
      ? '2px 0 10px rgba(0, 0, 0, 0.1)'
      : '-2px 0 10px rgba(0, 0, 0, 0.1)'};
  transform: ${({ isOpen, side }) =>
    isOpen
      ? 'translateX(0)'
      : side === 'left'
        ? 'translateX(-100%)'
        : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  z-index: 1001;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Backdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.4);
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
  z-index: 1000;
`;

const Title = styled.h1`
  width: 90%;
  height: 50px;
  display: flex;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 800px) {
    height: 30px;
  }
`;

const Close = styled.span`
  cursor: pointer;
`;

const CloseButton = styled.button`
  background: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const StyledCrossLogo = styled(CrossLogo)`
  cursor: pointer;
`;

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  side = 'right',
  children,
  hideBackdrop = false,
  width = '300px',
  title = '',
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <>
      {!hideBackdrop && <Backdrop isOpen={isOpen} onClick={onClose} />}
      <SidebarWrapper isOpen={isOpen} side={side} width={width}>
        <CloseButton>
          <Title>{title ?? ' '}</Title>
          <Close onClick={onClose}>
            <StyledCrossLogo />
          </Close>
        </CloseButton>
        {children}
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
