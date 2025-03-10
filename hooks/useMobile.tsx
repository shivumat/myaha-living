import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint: number = 800) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.outerWidth <= breakpoint);
    };

    checkScreenSize(); // Check on mount
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [breakpoint, window.innerWidth]);

  return isMobile;
}
