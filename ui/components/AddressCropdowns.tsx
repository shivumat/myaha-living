'use client';
import newStyled from '@emotion/styled';
import Colors from '../colors/colors';

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
  background: ${Colors.white};
  padding: 0 4px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  @media (max-width: 800px) {
    font-size: 12px;
  }
`;

const StyledSelect = newStyled.select<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px;
  padding-top: 18px;
  border: 2px solid ${({ hasError }) => (hasError ? 'red' : Colors.black)};
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  background: ${Colors.white};
  @media (max-width: 800px) {
    font-size: 14px;
  }

  &:focus {
    border-color: ${({ hasError }) => (hasError ? 'red' : '#007bff')};
  }
`;

const ErrorMessage = newStyled.p`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  setValue: (val: string) => void;
  error?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  setValue,
  error,
}) => {
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <StyledSelect
        value={value}
        onChange={(e) => setValue(e.target.value)}
        hasError={!!error}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default Dropdown;
