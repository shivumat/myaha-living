// PincodeInput.js

import { ChangeEventHandler, useState } from 'react';

const PincodeInput = (props: {
  onPincodeChange?: (value: string, isValid: boolean) => void;
  className?: string;
  edd?: string;
}) => {
  const [pincode, setPincode] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handlePincodeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setPincode(value);
  };

  const handleBlur = () => {
    // Basic pincode validation (6 digits, numeric)
    const pincodeRegex = /^[0-9]{6}$/;
    const isValidPincode = pincodeRegex.test(pincode);
    setIsValid(isValidPincode);
    props.onPincodeChange?.(pincode, isValid);
  };

  return (
    <div className={props.className}>
      <input
        type="text"
        id="pincode"
        value={pincode}
        onChange={handlePincodeChange}
        onBlur={handleBlur}
        maxLength={6}
        style={{
          padding: '10px 20px',
          borderRadius: '10px',
          width: '150px',
          appearance: 'none',
        }}
        placeholder="Enter pincode"
      />
      {!isValid && pincode.length > 0 && (
        <p style={{ color: 'red', fontSize: '12px' }}>Invalid pincode.</p>
      )}
      {!!props.edd && (
        <p style={{ color: '#608B1A', fontSize: '12px' }}>
          Estimated delivery date: {props.edd}
        </p>
      )}
    </div>
  );
};

export default PincodeInput;
