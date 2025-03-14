import { useAuth } from '#/context/AuthContext';
import { useIsMobile } from '#/hooks/useMobile';
import { OrderPayloadType } from '#/lib/types/order';
import newStyled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import AccountTextInput from '../components/AccountInput';
// import Dropdown from '../components/AddressCropdowns';

const FormContainer = newStyled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  justify-content: flex-start;
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
    height: 50px;
    background-color: black;
    font-size: 20px;
    padding: 10px 20px;
    max-width: 400px;
    width: 100%;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    margin: 20px auto 10px;
    &.view{
        background-color: white;
        color: black;
        border: 1px solid black;
        margin: 0px auto;
    }
    @media (max-width: 800px) {
        font-size: 18px;
    }
`;

interface UserformProps {
  shippingAddress: OrderPayloadType['shipping_address'];
  setShippingAddress: Dispatch<
    SetStateAction<OrderPayloadType['shipping_address']>
  >;
  billingAddress: OrderPayloadType['billing_address'];
  setBillingAddress: Dispatch<
    SetStateAction<OrderPayloadType['billing_address']>
  >;
  sameAsShipping: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  nextStep: Dispatch<SetStateAction<number>>;
  createDBOrder: () => Promise<void>;
}

const Userform = ({
  shippingAddress,
  setShippingAddress,
  billingAddress,
  setBillingAddress,
  sameAsShipping,
  setChecked,
  email,
  setEmail,
  nextStep,
  createDBOrder,
}: UserformProps) => {
  const [showEmail, setShowEmail] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const {
    first_name: firstName,
    last_name: lastName,
    address1: address,
    city,
    zip: pinCode,
    country,
    province: state,
    phone,
  } = shippingAddress;
  const setFirstName = (value: string) =>
    setShippingAddress((prev) => ({ ...prev, first_name: value }));
  const setLastName = (value: string) =>
    setShippingAddress((prev) => ({ ...prev, last_name: value }));
  const setAddress = (value: string) =>
    setShippingAddress((prev) => ({ ...prev, address1: value }));
  const setCity = (value: string) =>
    setShippingAddress((prev) => ({ ...prev, city: value }));
  const setState = (value: string) =>
    setShippingAddress((prev) => ({ ...prev, province: value }));
  const setPhone = (value: string) =>
    setShippingAddress((prev) => ({ ...prev, phone: value }));
  const setPinCode = (value: string) =>
    setShippingAddress((prev) => ({ ...prev, zip: value }));
  const setCountry = (value: string) =>
    setShippingAddress((prev) => ({ ...prev, country: value }));

  const {
    first_name: firstName1,
    last_name: lastName1,
    address1: address1,
    city: city1,
    zip: pinCode1,
    country: country1,
    province: state1,
    phone: phone1,
  } = billingAddress;
  const setFirstName1 = (value: string) =>
    setBillingAddress((prev) => ({ ...prev, first_name: value }));
  const setLastName1 = (value: string) =>
    setBillingAddress((prev) => ({ ...prev, last_name: value }));
  const setAddress1 = (value: string) =>
    setBillingAddress((prev) => ({ ...prev, address1: value }));
  const setCity1 = (value: string) =>
    setBillingAddress((prev) => ({ ...prev, city: value }));
  const setState1 = (value: string) =>
    setBillingAddress((prev) => ({ ...prev, province: value }));
  const setPhone1 = (value: string) =>
    setBillingAddress((prev) => ({ ...prev, phone: value }));
  const setPinCode1 = (value: string) =>
    setBillingAddress((prev) => ({ ...prev, zip: value }));
  const setCountry1 = (value: string) =>
    setBillingAddress((prev) => ({ ...prev, country: value }));

  const isMobile = useIsMobile();
  const { userDetails } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!address) newErrors.address = 'Address is required';
    if (!city) newErrors.city = 'City is required';
    if (!pinCode) newErrors.pinCode = 'Pin-code is required';
    if (!state) newErrors.state = 'State is required';
    if (!phone) newErrors.phone = 'Phone is required';
    if (!country) newErrors.country = 'Country is required';

    if (!sameAsShipping) {
      if (!firstName1) newErrors.firstName1 = 'First name is required';
      if (!lastName1) newErrors.lastName1 = 'Last name is required';
      if (!address1) newErrors.address1 = 'Address is required';
      if (!city1) newErrors.city1 = 'City is required';
      if (!pinCode1) newErrors.pinCode1 = 'Pin-code is required';
      if (!state1) newErrors.state1 = 'State is required';
      if (!phone1) newErrors.phone1 = 'Phone is required';
      if (!country1) newErrors.country1 = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      nextStep((prev) => prev + 1);
      createDBOrder();
    }
  };

  const isEmailValid = userDetails?.email
    ? true
    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // const fetchStates = async () => {
  //     const response = await fetch('https://api.teleport.org/api/countries/iso_alpha2:IN/admin1_divisions/');
  //     const data = await response.json();
  //     console.log(data); // List of Indian states
  //   };

  useEffect(() => {
    // fetchStates()
    setShowEmail(!userDetails?.email);
  }, [userDetails]);

  const isDisabled = Object.keys(errors).length > 0 || !isEmailValid;

  return (
    <FormContainer>
      <h2
        style={{
          fontSize: isMobile ? '20px' : '28px',
          fontWeight: '500',
          margin: isMobile ? '30px 0px 20px' : '60px 0px 20px',
        }}
      >
        01 Shipping
      </h2>
      <h3
        style={{
          fontSize: isMobile ? '16px' : '24px',
          fontWeight: '400',
          margin: isMobile ? '10px 0px' : '10px 0px 10px',
        }}
      >
        Shipping Address
      </h3>
      <Form onChange={() => validateForm()}>
        {showEmail ? (
          <>
            <AccountTextInput
              label="Email"
              value={email}
              setValue={setEmail}
              error={!isEmailValid ? 'Invalid email' : undefined}
            />
          </>
        ) : (
          <AccountTextInput
            label="Email"
            value={userDetails?.email ?? ''}
            setValue={() => {}}
            disabled
          />
        )}
        <InputGroup>
          <AccountTextInput
            label="First Name"
            value={firstName}
            setValue={setFirstName}
            error={errors.firstName}
          />
          <AccountTextInput
            label="Last Name"
            value={lastName}
            setValue={setLastName}
            error={errors.lastName}
          />
        </InputGroup>

        <AccountTextInput
          label="Address"
          value={address}
          setValue={setAddress}
          error={errors.address}
        />

        <InputGroup>
          <AccountTextInput
            error={errors.city}
            label="City"
            value={city}
            setValue={setCity}
          />
          <AccountTextInput
            label="Pin-code"
            value={pinCode}
            setValue={setPinCode}
            error={errors.pinCode}
          />
        </InputGroup>

        <InputGroup>
          <AccountTextInput
            label="State"
            value={state}
            setValue={setState}
            error={errors.state}
          />
          <AccountTextInput
            label="Phone"
            value={phone}
            setValue={setPhone}
            error={errors.phone}
          />
        </InputGroup>
        {/* <Dropdown label="Country" options={[]} value={country} setValue={(val) => { setCountry(val); setState(''); setCity(''); }} error={errors.country}/>
        <Dropdown label="State" options={[]} value={state} setValue={(val) => { setState(val); setCity(''); }} error={errors.state}/>
        <Dropdown label="City" options={[]} value={city} setValue={setCity} error={errors.city}/> */}

        <AccountTextInput
          label="Country"
          value={country}
          setValue={setCountry}
          error={errors.country}
        />
      </Form>
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '10px',
        }}
      >
        <input
          style={{ borderRadius: '50%' }}
          type="checkbox"
          checked={sameAsShipping}
          onClick={() => setChecked((prev) => !prev)}
        />{' '}
        Billing address same as shipping address
      </label>
      {!sameAsShipping && (
        <>
          <h3
            style={{
              fontSize: isMobile ? '16px' : '24px',
              fontWeight: '400',
              marginBottom: '30px',
            }}
          >
            Billing Address
          </h3>
          <Form>
            <InputGroup>
              <AccountTextInput
                label="First Name"
                value={firstName1}
                setValue={setFirstName1}
                error={errors.firstName1}
              />
              <AccountTextInput
                label="Last Name"
                value={lastName1}
                setValue={setLastName1}
                error={errors.lastName1}
              />
            </InputGroup>

            <AccountTextInput
              label="Address"
              value={address1}
              setValue={setAddress1}
              error={errors.address1}
            />

            <InputGroup>
              <AccountTextInput
                label="City"
                value={city1}
                setValue={setCity1}
                error={errors.city1}
              />
              <AccountTextInput
                label="Pin-code"
                value={pinCode1}
                setValue={setPinCode1}
                error={errors.pinCode1}
              />
            </InputGroup>

            <InputGroup>
              <AccountTextInput
                label="State"
                value={state1}
                setValue={setState1}
                error={errors.state1}
              />
              <AccountTextInput
                label="Phone"
                value={phone1}
                setValue={setPhone1}
                error={errors.phone1}
              />
            </InputGroup>
            {/* 
            <Dropdown label="Country" options={[]} value={country1} setValue={(val) => { setCountry1(val); setState1(''); setCity1(''); }} error={errors.country1}/>
            <Dropdown label="State" options={[]} value={state1} setValue={(val) => { setState1(val); setCity1(''); }} error={errors.state1}/>
            <Dropdown label="City" options={[]} value={city1} setValue={setCity1} error={errors.city1}/> */}

            <AccountTextInput
              label="Country"
              value={country1}
              setValue={setCountry1}
              error={errors.country1}
            />
          </Form>
        </>
      )}

      <Submit
        className={`clickable ${isDisabled ? 'disabled' : ''}`}
        type="submit"
        onClick={onSubmit}
        disabled={isDisabled}
      >
        Checkout
      </Submit>
      <Submit
        className="view clickable"
        type="submit"
        onClick={() => nextStep((prev) => prev - 1)}
      >
        Go Back
      </Submit>
    </FormContainer>
  );
};

export default Userform;
