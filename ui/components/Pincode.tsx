import newStyled from '@emotion/styled';
import { ChangeEventHandler, useState } from 'react';
import { FiLoader, FiSearch } from 'react-icons/fi';

const InputContainer = newStyled.div`
  position: relative;
  display: inline-block;
`;

const Input = newStyled.input`
  padding: 10px;
  border-radius: 10px;
  width: 150px;
  border: 1px solid #ccc;
  outline: none;
`;

const Button = newStyled.button`
  display: inline-block;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Message = newStyled.p<{ error?: boolean }>`
  font-size: 12px;
  margin-top: 5px;
  color: ${(props) => (props.error ? 'red' : '#608B1A')};
`;

const PincodeInput = (props: { className?: string }) => {
  const [pincode, setPincode] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [edd, setEdd] = useState<string>('');

  const checkPincode = async () => {
    const pincodeRegex = /^[0-9]{6}$/;
    const isValidPincode = pincodeRegex.test(pincode);
    setIsValid(isValidPincode);

    if (!isValidPincode) {
      setEdd('');
      return;
    }

    setFetching(true);
    const response = await fetch('/api/delivery/checkPincode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pincode }),
    });
    const data = await response.json();
    setFetching(false);
    setEdd(data.isAvailable ? 'Delivery available' : 'Delivery not available');

    setTimeout(() => setEdd(''), 5000);
  };

  const handlePincodeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPincode(e.target.value);
  };

  return (
    <InputContainer className={props.className}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Input
          type="text"
          id="pincode"
          value={pincode}
          onChange={handlePincodeChange}
          placeholder="Enter pincode"
          disabled={fetching}
        />
        <Button onClick={checkPincode} disabled={fetching}>
          {fetching ? <FiLoader className="animate-spin" /> : <FiSearch />}
        </Button>
      </div>
      {!isValid && pincode.length > 0 && (
        <Message error>Invalid pincode.</Message>
      )}
      {!!edd && <Message>{edd}</Message>}
    </InputContainer>
  );
};

export default PincodeInput;
