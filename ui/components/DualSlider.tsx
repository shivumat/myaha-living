import styled from '@emotion/styled';
import React from 'react';

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
`;

const SliderTrack = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 6px;
  background: #ddd;
  width: 100%;
  border-radius: 3px;
`;

const SliderRange = styled.div<{ left: number; width: number; color: string }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 6px;
  background: ${(props) => props.color};
  border-radius: 3px;
  left: ${(props) => props.left}%;
  width: ${(props) => props.width}%;
`;

const RangeInput = styled.input`
  position: absolute;
  width: 100%;
  height: 40px;
  top: 0;
  background: none;
  pointer-events: none;
  appearance: none;
  z-index: 2;

  &::-webkit-slider-thumb {
    pointer-events: all;
    position: relative;
    z-index: 3;
    appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: black;
    cursor: pointer;
    border: 2px solid white;
  }

  &::-moz-range-thumb {
    pointer-events: all;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: black;
    cursor: pointer;
    border: 2px solid white;
  }
`;

interface DualSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (val: [number, number]) => void;
  trackColor?: string;
}

const DualSlider: React.FC<DualSliderProps> = ({
  min,
  max,
  value,
  onChange,
  trackColor = '#333',
}) => {
  const handleChange = (index: number, val: number) => {
    const newValue = [...value] as [number, number];
    newValue[index] = val;

    if (index === 0 && val > value[1]) newValue[0] = value[1];
    if (index === 1 && val < value[0]) newValue[1] = value[0];

    onChange(newValue);
  };

  const percentLeft = ((value[0] - min) / (max - min)) * 100;
  const percentRight = ((value[1] - min) / (max - min)) * 100;

  return (
    <SliderContainer>
      <SliderTrack />
      <SliderRange
        left={percentLeft}
        width={percentRight - percentLeft}
        color={trackColor}
      />
      <RangeInput
        type="range"
        min={min}
        max={max}
        value={value[0]}
        onChange={(e) => handleChange(0, Number(e.target.value))}
      />
      <RangeInput
        type="range"
        min={min}
        max={max}
        value={value[1]}
        onChange={(e) => handleChange(1, Number(e.target.value))}
      />
    </SliderContainer>
  );
};

export default DualSlider;
