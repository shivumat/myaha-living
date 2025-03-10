import styled from '@emotion/styled';
import { JSX, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Backdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
`;

const ModalContainer = styled.div<{ isOpen: boolean }>`
  background: transparent;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  transform: ${({ isOpen }) => (isOpen ? 'scale(1)' : 'scale(0.95)')};
  transition: transform 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Modal({
  isOpen,
  onClose,
  children,
}: ModalProps): JSX.Element | null {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <Backdrop isOpen={isOpen} onClick={onClose}>
      <ModalContainer isOpen={isOpen}>{children}</ModalContainer>
    </Backdrop>,
    document.body,
  );
}
