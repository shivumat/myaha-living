import { useState } from 'react';

export function useToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (value?: boolean) => setIsOpen((prev) => value ?? !prev);

  return { isOpen, toggle };
}
