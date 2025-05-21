import { useAuth } from '#/context/AuthContext';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Colors from '../colors/colors';
import AccountTextInput from '../components/AccountInput';

const FormContainer = newStyled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  @media (max-width: 800px) {
    padding: 20px;
    }
`;

const Form = newStyled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 12px;
`;

const InputGroup = newStyled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Submit = newStyled.button`
    height: 40px;
    width: 120px;
    background-color: ${Colors.black};
    font-size: 16px;
    color: ${Colors.white};
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    margin-left: auto;
    &.view{
        background-color: ${Colors.white};
        color: ${Colors.white};
        border: 1px solid ${Colors.black};
    }
    @media (max-width: 800px) {
        font-size: 12px;
        width: 80px;
    }
`;

const Userform = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [country, setCountry] = useState('');

  const isMobile = useIsMobile();
  const { userDetails, saveUserDetails } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    if (!userDetails) return;
    e.preventDefault();
    await saveUserDetails({
      uuid: userDetails.uuid,
      email: userDetails.email,
      firstName,
      lastName,
      birthdate,
      address,
      city,
      pincode: pinCode,
      country,
    });
  };

  const router = useRouter();

  useEffect(() => {
    if (!userDetails) {
      router.push('/');
      return;
    }
    setFirstName(userDetails.firstName ?? '');
    setLastName(userDetails.lastName ?? '');
    setBirthdate(userDetails.birthdate ?? '');
    setAddress(userDetails.address ?? '');
    setCity(userDetails.city ?? '');
    setPinCode(userDetails.pincode ?? '');
    setCountry(userDetails.country ?? '');
    setEmail(userDetails.email);
  }, [userDetails]);

  return (
    <FormContainer>
      <h2
        style={{
          fontSize: isMobile ? '20px' : '28px',
          fontWeight: '500',
          marginBottom: isMobile ? '30px' : '60px',
        }}
      >
        Profile details
      </h2>
      <Form>
        <InputGroup>
          <AccountTextInput
            label="First Name"
            value={firstName}
            setValue={setFirstName}
          />
          <AccountTextInput
            label="Last Name"
            value={lastName}
            setValue={setLastName}
          />
        </InputGroup>

        <AccountTextInput
          label="DOB (dd-mm-yyyy)"
          value={birthdate}
          setValue={setBirthdate}
          type="date"
        />

        <AccountTextInput
          label="Email Address"
          value={email}
          setValue={() => {}}
          disabled
        />

        <AccountTextInput
          label="Address"
          value={address}
          setValue={setAddress}
        />

        <InputGroup>
          <AccountTextInput label="City" value={city} setValue={setCity} />
          <AccountTextInput
            label="Pin-code"
            value={pinCode}
            setValue={setPinCode}
          />
        </InputGroup>

        <AccountTextInput
          label="Country"
          value={country}
          setValue={setCountry}
        />
        <Submit type="submit" onClick={onSubmit}>
          Save
        </Submit>
      </Form>
    </FormContainer>
  );
};

export default Userform;
