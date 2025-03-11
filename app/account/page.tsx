'use client';
import { useAuth } from '#/context/AuthContext';
import { useIsMobile } from '#/hooks/useMobile';
import AccountTextInput from '#/ui/components/AccountInput';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Container = newStyled.div`
  display: flex;
  min-height: 100vh;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;

const Sidebar = newStyled.div`
    width: 400px;
    background-color: #192211;
    color: white;
    padding: 40px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    @media (max-width: 800px) {
        width: 100%;
        padding: 10px 50px;
    }
`;

const SidebarItem = newStyled.div`
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

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
    background-color: black;
    font-size: 16px;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    margin-left: auto;
    &.view{
        background-color: white;
        color: black;
        border: 1px solid black;
    }
    @media (max-width: 800px) {
        font-size: 12px;
        width: 80px;
    }
`;

const ProfileDetails = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [country, setCountry] = useState('');

  const router = useRouter();
  const isMobile = useIsMobile();
  const { userDetails, saveUserDetails } = useAuth();

  useEffect(() => {
    console.log(userDetails);
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

  return (
    <Container>
      {/* Form Section */}
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

      {/* Sidebar */}
      <Sidebar>
        <div
          style={{
            margin: '60px 0px',
            borderRadius: '10px',
            width: '100%',
            backgroundColor: 'white',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <h3>Menu</h3>
          <SidebarItem>Dashboard</SidebarItem>
          <SidebarItem>Profile</SidebarItem>
          <SidebarItem>Settings</SidebarItem>
          <SidebarItem>Logout</SidebarItem>
        </div>
      </Sidebar>
    </Container>
  );
};

export default ProfileDetails;
