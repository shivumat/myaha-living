'use client';
import newStyled from '@emotion/styled';
import React from 'react';

const InputWrapper = newStyled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = newStyled.label`
  position: absolute;
  top: -7px;
  left: 12px;
  background: white;
  padding: 0 4px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  @media (max-width: 800px) {
    font-size: 12px;
}
`;

const StyledInput = newStyled.input<{ disabled?: boolean }>`
  width: 100%;
  padding: 12px;
  padding-top: 18px;
  border: 2px solid #000;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  background: ${({ disabled }) => (disabled ? '#d1d1d1' : 'white')};
  @media (max-width: 800px) {
        font-size: 14px;
    }

  &:focus {
    border-color: #007bff;
  }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  setValue: (val: string) => void;
}

const AccountTextInput: React.FC<InputProps> = ({
  label,
  value,
  setValue,
  ...props
}) => {
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <StyledInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    </InputWrapper>
  );
};

export default AccountTextInput;
