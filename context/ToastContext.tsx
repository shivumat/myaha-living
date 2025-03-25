import { useIsMobile } from '#/hooks/useMobile';
import Laoding from '#/ui/LaodingLayover';
import CheckLogo from '#/ui/svg/check-logo';
import CrossLogo from '#/ui/svg/cross-logo';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type ToastType = 'success' | 'error' | null;

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
  startLoading: () => void;
  stopLoading: () => void;
  isloading: boolean;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
const slideIn = keyframes`
  from {
    left: -500px;
  }
  to {
    left: 20px;
  }
`;

const slideOut = keyframes`
  from {
    left: 20px;
  }
  to {
    left: -500px;
  }
`;

const ToastContainer = styled.div<{
  type: ToastType;
  visible: boolean;
  mounted: boolean;
}>`
  z-index: 1200;
  position: fixed;
  bottom: 40px;
  left: ${(props) => (props.visible ? '20px' : '-500px')};
  animation: ${(props) =>
      props.mounted ? (props.visible ? slideIn : slideOut) : 'none'}
    0.5s ease-in-out;
  background-color: white;
  max-width: 450px;
  border: 1px solid
    ${(props) => (props.type === 'success' ? '#4D6624' : '#D9534F')};
  border-left: ${(props) =>
    props.type === 'success' ? '15px solid #4D6624' : '15px solid #D9534F'};
  padding: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 800px) {
    bottom: 40px;
    max-width: 300px;
    padding: 10px;
  }
`;

const StyledCross = styled(CrossLogo)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<{ message: string; type: ToastType }>({
    message: '',
    type: null,
  });
  const [visible, setVisible] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const mounted = React.useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!mounted.current) {
        mounted.current = true;
      }
    }, 10); // Small delay to prevent animation on refresh

    return () => clearTimeout(timer);
  }, []);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  const isMobile = useIsMobile();

  return (
    <ToastContext.Provider
      value={{ showToast, startLoading, stopLoading, isloading }}
    >
      {children}
      <ToastContainer
        mounted={mounted.current}
        type={toast.type}
        visible={visible}
      >
        <div
          style={{
            height: '30px',
            width: '30px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: toast.type === 'success' ? '#4D6624' : '#D9534F',
          }}
        >
          {toast.type === 'success' ? (
            <CheckLogo width="24" height="24" color="white" />
          ) : (
            <StyledCross width="24" height="24" color="white" />
          )}
        </div>
        <div>
          <div
            style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: '700' }}
          >
            {toast.type === 'success' ? 'Success' : 'Error'}
          </div>
          <div
            style={{
              fontSize: isMobile ? '16px' : '20x',
              fontWeight: 'lighter',
            }}
          >
            {toast.message}
          </div>
        </div>
      </ToastContainer>
      <Laoding isOpen={isloading} onClose={() => {}} />
    </ToastContext.Provider>
  );
};
