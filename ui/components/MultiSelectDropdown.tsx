import styled from '@emotion/styled';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaCheck } from 'react-icons/fa';
import Colors from '../colors/colors';

const Checkbox = styled.div<{ checked: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 2px solid ${Colors.black};
  background: ${({ checked }) => (checked ? Colors.black : Colors.white)};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${Colors.white};
    font-size: 10px;
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
  }
`;

interface MultiSelectDropdownProps<T> {
  options: T[];
  selectedOptions: T[];
  onChange: (selected: T[]) => void;
  renderTrigger: (toggle: () => void, selected: T[]) => ReactNode;
  renderOptionLabel: (option: T) => string;
  maxHeight?: string;
  onClose?: () => void;
  openOnHover?: boolean; // New prop to control hover behavior
}

export function MultiSelectDropdown<T>({
  options,
  selectedOptions,
  renderTrigger,
  renderOptionLabel,
  maxHeight,
  onClose,
  onChange,
  openOnHover = false,
}: MultiSelectDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const handleSelect = (option: T) => {
    const exists = selectedOptions.includes(option);
    const newSelection = exists
      ? selectedOptions.filter((o) => o !== option)
      : [...selectedOptions, option];
    onChange(newSelection);
  };

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
    <Wrapper>
      <div ref={triggerRef} onClick={handleOpen}>
        {renderTrigger(handleOpen, selectedOptions)}
      </div>

      {open &&
        createPortal(
          <DropdownMenu
            ref={menuRef}
            style={{
              top: position?.top ?? 0,
              left: position?.left ?? 0,
              maxHeight: maxHeight ?? 'auto',
            }}
          >
            {options.map((option, index) => {
              const label = renderOptionLabel(option);
              const checked = selectedOptions.includes(option);
              return (
                <DropdownItem key={index} onClick={() => handleSelect(option)}>
                  <Checkbox checked={checked}>
                    <FaCheck />
                  </Checkbox>
                  <OptionLabel>{label}</OptionLabel>
                </DropdownItem>
              );
            })}
          </DropdownMenu>,
          document.body,
        )}
    </Wrapper>
  );
}

// === Styled Components ===
const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  background: ${Colors.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  min-width: 260px;
  z-index: 1500;
  overflow-y: auto;
`;

const DropdownItem = styled.div`
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f3f3f3;
  }
`;

const OptionLabel = styled.div`
  font-size: 14px;
  color: ${Colors.black};
`;
