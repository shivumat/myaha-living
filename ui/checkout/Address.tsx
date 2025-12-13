import { useAuth } from '#/context/AuthContext';
import { useIsMobile } from '#/hooks/useMobile';
import { OrderPayloadType } from '#/lib/types/order';
// Make sure to import your util functions from their actual path
import { getUserInfo, saveUserInfo } from '#/lib/util';
import newStyled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import AccountTextInput from '../components/AccountInput';
import { DiscountObjectType } from './CheckoutSidebar';
import PaymentOptions from './Payment';

// ... (Your styled components: FormContainer, Form, InputGroup remain unchanged) ...

const FormContainer = newStyled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  overflow-y: auto;
  height: calc(100vh - 10px);
  @media (max-width: 800px) {
    padding: 20px;
    overflow-y: hidden;
    height: auto;
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

export interface DBOrderType extends OrderPayloadType {
  status: string;
  id: string;
}

// Interface for the data structure we save to LocalStorage
interface SavedUserDataType {
  shippingAddress: OrderPayloadType['shipping_address'];
  billingAddress: OrderPayloadType['billing_address'];
  email: string;
  sameAsShipping: boolean;
}

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
  saveInfo: boolean;
  setSaveInfo: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
  createDBOrder: () => Promise<void>;
  codCharges: number;
  setCodCharges: (newCodCharges: number) => void;
  orderId?: string;
  amount: number;
  shippingCharges: number;
  email?: string;
  customerName?: string;
  customerNumber: string;
  onPaymentCompletion: (paymentId: string) => Promise<void>;
  discount: number;
  orderObj: DBOrderType | null;
  total: number;
  discountObject: DiscountObjectType | null;
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
  onPaymentCompletion,
  codCharges,
  setCodCharges,
  shippingCharges,
  discount,
  orderObj,
  total,
  createDBOrder,
  discountObject,
  saveInfo,
  setSaveInfo,
}: UserformProps) => {
  const [showEmail, setShowEmail] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const { userDetails } = useAuth();
  const isMobile = useIsMobile();

  // --- 1. SETUP STATE SETTERS (Existing code) ---
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

  // --- 2. IMPLEMENT LOAD & SAVE LOGIC ---

  // Load saved info on Mount
  useEffect(() => {
    // Only load if user is NOT logged in (or if you want local storage to override auth, remove this check)
    // Typically, we check LocalStorage first for guest checkout flows.
    const savedData = getUserInfo() as SavedUserDataType | null;

    if (savedData) {
      // Restore Checkbox State
      setSaveInfo(true);

      // Restore Addresses
      setShippingAddress(savedData.shippingAddress);
      setBillingAddress(savedData.billingAddress);
      setChecked(savedData.sameAsShipping);

      // Restore Email (only if Auth context doesn't provide one)
      if (!userDetails?.email && savedData.email) {
        setEmail(savedData.email);
      }
    }
  }, []); // Run once on mount

  // Save info whenever fields change (IF saveInfo is true)
  useEffect(() => {
    if (saveInfo) {
      const dataToSave: SavedUserDataType = {
        shippingAddress,
        billingAddress,
        email: email || '',
        sameAsShipping,
      };
      saveUserInfo(dataToSave);
    } else {
      // If user unchecks the box, clear the storage for privacy
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userInfo');
      }
    }
  }, [saveInfo, shippingAddress, billingAddress, email, sameAsShipping]);

  // --- 3. EXISTING LOGIC ---

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!pinCode.trim()) newErrors.pinCode = 'Pin-code is required';
    if (!state.trim()) newErrors.state = 'State is required';
    if (!phone.trim()) newErrors.phone = 'Phone is required';
    if (!country.trim()) newErrors.country = 'Country is required';

    if (!sameAsShipping) {
      if (!firstName1.trim()) newErrors.firstName1 = 'First name is required';
      if (!lastName1.trim()) newErrors.lastName1 = 'Last name is required';
      if (!address1.trim()) newErrors.address1 = 'Address is required';
      if (!city1.trim()) newErrors.city1 = 'City is required';
      if (!pinCode1.trim()) newErrors.pinCode1 = 'Pin-code is required';
      if (!state1.trim()) newErrors.state1 = 'State is required';
      if (!phone1.trim()) newErrors.phone1 = 'Phone is required';
      if (!country1.trim()) newErrors.country1 = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isEmailValid = userDetails?.email
    ? true
    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? '');

  useEffect(() => {
    setShowEmail(!userDetails?.email);
  }, [userDetails]);

  const isDisabled = Object.keys(errors).length > 0 || !isEmailValid;

  return (
    <FormContainer>
      <h3
        style={{
          fontSize: isMobile ? '16px' : '24px',
          fontWeight: '400',
          margin: isMobile ? '30px 0px 10px' : '60px 0px 10px',
        }}
      >
        Contact
      </h3>
      <Form
        onChange={() => {
          // Note: createDBOrder is called here.
          // Since we are using useEffect to save, we don't need to manually save here.
          if (validateForm()) {
            createDBOrder();
          }
        }}
      >
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
            checked={saveInfo}
            onClick={() => setSaveInfo((prev) => !prev)}
          />{' '}
          Save my information for next time
        </label>
        {showEmail ? (
          <>
            <AccountTextInput
              label="Email"
              value={email ?? ''}
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

        {/* ... Rest of your Form UI (Delivery, Billing, etc.) ... */}
        {/* ... I have truncated the UI for brevity as logic is above ... */}

        <h3
          style={{
            fontSize: isMobile ? '16px' : '24px',
            fontWeight: '400',
            margin: isMobile ? '10px 0px 10px' : '20px 0px 10px',
          }}
        >
          Delivery
        </h3>
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

        <AccountTextInput
          label="Country"
          value={country}
          setValue={setCountry}
          error={errors.country}
          disabled
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

            <AccountTextInput
              label="Country"
              value={country1}
              setValue={setCountry1}
              error={errors.country1}
              disabled
            />
          </Form>
        </>
      )}
      <PaymentOptions
        onPaymentCompletion={onPaymentCompletion}
        email={orderObj?.customerInfo.email}
        customerName={`${orderObj?.customerInfo.first_name ?? ''} ${orderObj?.customerInfo.last_name ?? ''}`}
        customerNumber={orderObj?.customerInfo.phone ?? ''}
        shippingCharges={shippingCharges}
        amount={total}
        orderId={orderObj?.id}
        codCharges={codCharges}
        discount={discount}
        setCodCharges={setCodCharges}
        isDisabled={isDisabled}
        isMobile={isMobile}
        discountObject={discountObject}
      />
    </FormContainer>
  );
};

export default Userform;
