import styled from '@emotion/styled';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface DropdownProps<T> {
  options: T[];
  onSelect: (option: any) => void;
  renderTrigger: (
    toggle: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  ) => ReactNode;
  renderOption: (option: T) => ReactNode;
}

export function Dropdown<T>({
  options,
  onSelect,
  renderTrigger,
  renderOption,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  );

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const x = e.pageX;
    const y = e.pageY;
    setCoords({ top: y, left: x });
    setOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        console.log('Clicked outside, closing dropdown');
        setOpen(false);
      }
    };

    if (open) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100); // Delay adding listener to avoid conflict
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <Wrapper ref={dropdownRef}>
      {renderTrigger(toggleDropdown)}

      {open &&
        createPortal(
          <DropdownMenu
            ref={menuRef}
            style={{
              top: coords?.top ?? 0,
              left: coords?.left ?? 0,
            }}
          >
            {options.map((option, index) => (
              <DropdownItem
                key={index}
                onClick={(event) => {
                  event.stopPropagation();
                  onSelect(option);
                  setTimeout(() => setOpen(false), 0); // Ensure selection before closing
                }}
              >
                {renderOption(option)}
              </DropdownItem>
            ))}
          </DropdownMenu>,
          document.body,
        )}
    </Wrapper>
  );
}

// Emotion-styled components
const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  min-width: 160px;
  padding: 8px 0;
  z-index: 999;
`;

const DropdownItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #f3f3f3;
  }
`;
