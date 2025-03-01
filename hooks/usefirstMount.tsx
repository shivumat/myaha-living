'use client';
import { useEffect, useState } from 'react';

export const useFirstMount = () => {
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    setIsFirstMount(false);
  }, []);

  return isFirstMount;
};
