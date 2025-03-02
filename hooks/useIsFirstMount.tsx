'use client';
import { useEffect, useState } from 'react';

export const useIsFirstMount = () => {
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    setIsFirstMount(false);
  }, []);

  return isFirstMount;
};
