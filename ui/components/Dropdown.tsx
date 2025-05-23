import styled from '@emotion/styled';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Colors from '../colors/colors';

interface DropdownProps<T> {
  options: T[];
  onSelect: (option: any) => void;
  renderTrigger: (
    toggle: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  ) => ReactNode;
  renderOption: (option: T) => ReactNode;
  children?: ReactNode;
  maxHeight?: string;
  onClose?: () => void;
  openOnHover?: boolean; // New prop
}

export function Dropdown<T>({
  options,
  onSelect,
  renderTrigger,
  renderOption,
  children,
  maxHeight,
  onClose,
  openOnHover = false, // Default value is false
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null); // Ref for the trigger element
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const calculatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      setPosition({
        top: rect.bottom + scrollTop,
        left: rect.left + scrollLeft,
      });
    }
  }, []);

  const handleOpen = useCallback(() => {
    calculatePosition();
    setOpen(true);
  }, [calculatePosition]);

  const toggleDropdown = useCallback(
    (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!openOnHover) {
        handleOpen();
      }
    },
    [openOnHover, handleOpen],
  );

  // Close dropdown when clicking outside (for non-hover open)
  useEffect(() => {
    if (!openOnHover) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
          onClose?.();
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
    }
  }, [open, openOnHover, onClose]);

  // Open on hover functionality
  useEffect(() => {
    if (openOnHover && triggerRef.current) {
      const handleMouseEnter = () => {
        calculatePosition();
        setOpen(true);
      };

      const handleMouseLeaveTrigger = (event: MouseEvent) => {
        // Set a timeout to close only if not hovering over the menu
        setTimeout(() => {
          if (
            menuRef.current &&
            !isMouseInside(menuRef.current, event as MouseEvent)
          ) {
            setOpen(false);
            onClose?.();
          }
        }, 100); // Small delay to allow entering the menu
      };

      triggerRef.current.addEventListener('mouseenter', handleMouseEnter);
      triggerRef.current.addEventListener(
        'mouseleave',
        handleMouseLeaveTrigger,
      );

      return () => {
        triggerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
        triggerRef.current?.removeEventListener(
          'mouseleave',
          handleMouseLeaveTrigger,
        );
      };
    }
  }, [openOnHover, onClose, calculatePosition]);

  // Close on leaving the dropdown menu
  useEffect(() => {
    if (openOnHover && menuRef.current) {
      const handleMouseLeaveMenu = (event: MouseEvent) => {
        setTimeout(() => {
          if (
            triggerRef.current &&
            !isMouseInside(triggerRef.current, event as MouseEvent)
          ) {
            setOpen(false);
            onClose?.();
          }
        }, 100); // Small delay to avoid immediate close when transitioning
      };

      menuRef.current.addEventListener('mouseleave', handleMouseLeaveMenu);

      return () => {
        menuRef.current?.removeEventListener(
          'mouseleave',
          handleMouseLeaveMenu,
        );
      };
    }
  }, [openOnHover, onClose]);

  const isMouseInside = (element: HTMLElement, event: MouseEvent): boolean => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    const mouseX = event?.clientX;
    const mouseY = event?.clientY;

    return (
      mouseX >= rect.left &&
      mouseX <= rect.right &&
      mouseY >= rect.top &&
      mouseY <= rect.bottom
    );
  };

  return (
    <Wrapper ref={dropdownRef}>
      <div ref={triggerRef} onMouseEnter={openOnHover ? handleOpen : undefined}>
        {renderTrigger(toggleDropdown)}
      </div>

      {open &&
        createPortal(
          <DropdownMenu
            noOptions={options.length === 0}
            ref={menuRef}
            style={{
              top: position?.top ?? 0,
              left: position?.left ?? 0,
              maxHeight: maxHeight ?? 'auto',
            }}
          >
            <div style={{ position: 'sticky', top: 0 }}>{children}</div>
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

const DropdownMenu = styled.div<{ noOptions?: boolean }>`
  position: absolute;
  background: ${Colors.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  min-width: 160px;
  padding: ${({ noOptions }) => (noOptions ? '0px' : '8px 0')};
  z-index: 1500;
  overflow-y: auto;
`;

const DropdownItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #f3f3f3;
  }
`;
