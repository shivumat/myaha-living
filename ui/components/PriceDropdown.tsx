import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Colors from '../colors/colors';
import DualSlider from './DualSlider';

interface PriceFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (range: [number, number]) => void;
}

const PriceFilter = ({ min, max, value, onChange }: PriceFilterProps) => {
  const [range, setRange] = useState<[number, number]>(value);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
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

  const toggleDropdown = () => {
    if (!open) calculatePosition();
    setOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleClear = () => {
    setRange([min, max]);
    onChange([min, max]);
  };

  return (
    <Wrapper>
      FILTER BY PRICE :
      <Trigger ref={triggerRef} onClick={toggleDropdown}>
        <span>
          ₹{range[0]} - ₹{range[1]}
        </span>
        {open ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
      </Trigger>
      {open &&
        createPortal(
          <DropdownMenu
            ref={menuRef}
            style={{ top: position?.top, left: position?.left }}
          >
            <Label>
              ₹{range[0]} - ₹{range[1]}
            </Label>

            <DualSlider
              min={min}
              max={max}
              value={range}
              onChange={(newRange) => {
                if (newRange[0] <= newRange[1]) {
                  setRange(newRange);
                  onChange(newRange);
                }
              }}
            />

            <ClearButton onClick={handleClear}>Clear</ClearButton>
          </DropdownMenu>,
          document.body,
        )}
    </Wrapper>
  );
};

export default PriceFilter;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  @media (max-width: 800px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Trigger = styled.div`
  padding: 10px 14px;
  border: 1px solid ${Colors.black};
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  background-color: ${Colors.white};
  min-width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  background: ${Colors.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  min-width: 220px;
  padding: 16px;
  z-index: 1500;
`;

const Label = styled.div`
  font-size: 14px;
  margin-bottom: 12px;
  color: ${Colors.black};
`;

const ClearButton = styled.button`
  margin-top: 12px;
  background: transparent;
  color: ${Colors.black};
  border: none;
  text-decoration: underline;
  font-size: 13px;
  cursor: pointer;
  align-self: flex-end;
`;
