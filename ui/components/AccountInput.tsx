'use client';
import newStyled from '@emotion/styled';
import React, { useState } from 'react';
import Colors from '../colors/colors';

const InputWrapper = newStyled.div<{ focused?: boolean; filled?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* When focused or filled we add a subtle glow on the wrapper */
  ${({ focused }) =>
    focused &&
    `
    filter: drop-shadow(0 1px 0 rgba(0,0,0,0.02));
  `}
`;

const FloatingLabel = newStyled.label<{ visible?: boolean }>`
  position: absolute;
  left: 14px;
  top: ${({ visible }) => (visible ? '-10px' : '14px')};
  transform: translateY(${({ visible }) => (visible ? '0' : '0')});
  transition: all 160ms ease-in-out;
  background: ${Colors.white};
  padding: ${({ visible }) => (visible ? '0 6px' : '0')};
  font-size: ${({ visible }) => (visible ? '12px' : '16px')};
  color: #666;
  pointer-events: none;
  border-radius: 3px;

  @media (max-width: 800px) {
    font-size: ${({ visible }) => (visible ? '11px' : '14px')};
  }
`;

const StyledInputContainer = newStyled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  background: ${Colors.white};
  border: 1.6px solid #e6e6e6;
  box-shadow: inset 0 1px 0 rgba(0,0,0,0.02);
  transition: border-color 150ms ease, box-shadow 150ms ease;
  padding: 8px 12px;

  &:focus-within {
    border-color: #0a66ff; /* blue focus like Shopify */
    box-shadow: 0 0 0 3px rgba(10,102,255,0.06);
  }

  @media (max-width: 800px) {
    padding: 6px 10px;
    border-radius: 6px;
  }
`;

const IconSlot = newStyled.div<{ clickable?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-left: 2px;
  svg { width: 18px; height: 18px; opacity: 0.7; }
  ${({ clickable }) => clickable && `cursor: pointer;`}
`;

/* ---------- UPDATED: remove native input focus ring to avoid double border ---------- */
const StyledInput = newStyled.input<{ disabled?: boolean; hasError?: boolean }>`
  border: none;
  outline: none;
  flex: 1;
  min-width: 0; /* allow truncation in flex */
  font-size: 16px;
  padding: 10px 6px;
  background: transparent;
  color: #111;

  &::placeholder {
    color: #9b9b9b;
  }

  /* Remove browser-native focus visuals that create the inner thin blue border */
  &:focus {
    outline: none;
    box-shadow: none;
  }

  /* Firefox inner focus border removal */
  &::-moz-focus-inner {
    border: 0;
  }

  ${({ hasError }) =>
    hasError &&
    `
    /* small visual hint if there's an error */
    caret-color: red;
  `}

  ${({ disabled }) =>
    disabled &&
    `
    background: #f5f5f5;
    color: #777;
    cursor: not-allowed;
  `}

  @media (max-width: 800px) {
    font-size: 14px;
    padding: 8px 4px;
  }
`;
/* ----------------------------------------------------------------------------------- */

/* keep the error message compact */
const ErrorMessage = newStyled.p`
  color: #d32f2f;
  font-size: 12px;
  margin-top: 6px;
  margin-left: 4px;
`;

/* Props */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
  setValue: (val: string) => void;
  error?: string | null;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode; // e.g., Apply button or search icon wrapper
}

const AccountTextInput: React.FC<InputProps> = ({
  label,
  value,
  setValue,
  error,
  leftIcon,
  rightElement,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const filled = !!value && value.length > 0;
  const showLabelAbove = focused || filled;

  return (
    <InputWrapper focused={focused} filled={filled}>
      {!!label && (
        <FloatingLabel visible={showLabelAbove}>{label}</FloatingLabel>
      )}

      <StyledInputContainer>
        {leftIcon && <IconSlot>{leftIcon}</IconSlot>}

        <StyledInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          hasError={!!error}
          {...props}
        />

        {/* rightElement can be an Apply button, an icon badge, etc. */}
        {rightElement && <div style={{ marginLeft: 8 }}>{rightElement}</div>}
      </StyledInputContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default AccountTextInput;
