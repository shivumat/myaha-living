import { useToast } from '#/context/ToastContext';
import { useIsMobile } from '#/hooks/useMobile';
import newStyled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';
import PaymentComponent from '../components/Payment';
// import PaymentComponent from "../components/Payment";

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
    margin: 20px auto;
    &.view{
        background-color: white;
        color: black;
        border: 1px solid black;
    }
    @media (max-width: 800px) {
        font-size: 18px;
    }
`;

const Container = newStyled.div`
  padding: 16px;
  width: 100%;
  @media (max-width: 800px) {
  }
`;

const Option = newStyled.label<{ selected: boolean }>`
  display: flex;
  align-items: center;
  border: 2px solid ${(props) => (props.selected ? '#007bff' : '#ccc')};
  padding: 40px 12px;
  cursor: pointer;
  box-shadow: ${(props) => (props.selected ? '0px 0px 5px rgba(0, 123, 255, 0.5)' : 'none')};
  @media (max-width: 800px) {
    padding: 20px 12px;
    flex-direction: column;
    gap: 10px;
    text-align: center;
    min-height: 150px;
    justify-content: center;
    align-items: center;
  }
`;

const HiddenRadio = newStyled.input`
  display: none;
`;

const RadioCircle = newStyled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const InnerCircle = newStyled.div<{ selected: boolean }>`
  width: 12px;
  height: 12px;
  background-color: ${(props) => (props.selected ? '#007bff' : 'transparent')};
  border-radius: 50%;
`;

const Text = newStyled.span`
  flex-grow: 1;
  font-size: 16px;
`;

const IconsContainer = newStyled.div`
  display: flex;
  gap: 8px;
`;

const Icon = newStyled.img`
  width: 32px;
  height: 20px;
`;

export const CONST_COD_CHARGES = 40;

const PaymentOptions = ({
  codCharges,
  setCodCharges,
  amount,
  shippingCharges,
  email,
  orderId,
  nextStep,
  onPaymentCompletion,
  discount,
}: {
  codCharges: number;
  setCodCharges: Dispatch<SetStateAction<number>>;
  orderId: string;
  amount: number;
  shippingCharges: number;
  email: string;
  nextStep: Dispatch<SetStateAction<number>>;
  onPaymentCompletion: (paymentId: string) => Promise<void>;
  discount: number;
}) => {
  const [disabled, setDisabled] = useState(false);
  const [openRazorPay, setOpenRazorPay] = useState(false);
  const isMobile = useIsMobile();
  const { startLoading } = useToast();

  const onRazorPayCompletion = (razorPayKey: string) => {
    onPaymentCompletion(razorPayKey);
  };

  const onSubmit = () => {
    if (disabled) return;
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 5000); // 5 seconds
    if (!codCharges) {
      setOpenRazorPay(true);
      return;
    }
    startLoading();
    onPaymentCompletion('');
  };

  return (
    <FormContainer>
      <h2
        style={{
          fontSize: isMobile ? '20px' : '28px',
          fontWeight: '500',
          marginBottom: isMobile ? '30px' : '60px',
        }}
      >
        01 Shipping
      </h2>
      <Container>
        {/* Razorpay Option */}
        <Option selected={!codCharges} onClick={() => setCodCharges(0)}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: 'auto 0px',
            }}
          >
            <HiddenRadio
              type="radio"
              name="payment"
              value="razorpay"
              checked={!codCharges}
              onChange={() => setCodCharges(0)}
            />
            <RadioCircle>
              <InnerCircle selected={!codCharges} />
            </RadioCircle>
          </div>
          <Text>Razorpay Secure (UPI, Cards, Wallets, NetBanking)</Text>
          <IconsContainer>
            <Icon
              src="https://upload.wikimedia.org/wikipedia/commons/6/6f/UPI_logo.svg"
              alt="UPI"
            />
            <Icon
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
              alt="Visa"
            />
            <Icon
              src="https://upload.wikimedia.org/wikipedia/commons/5/59/RuPay_logo.svg"
              alt="RuPay"
            />
            <Icon
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
            />
          </IconsContainer>
        </Option>

        {/* Cash on Delivery Option */}
        <Option
          selected={!!codCharges}
          onClick={() => {
            setOpenRazorPay(false);
            setCodCharges(CONST_COD_CHARGES);
          }}
        >
          <HiddenRadio
            type="radio"
            name="payment"
            value="cod"
            checked={!!codCharges}
            onChange={() => {
              setOpenRazorPay(false);
              setCodCharges(CONST_COD_CHARGES);
            }}
          />
          <RadioCircle>
            <InnerCircle selected={!!codCharges} />
          </RadioCircle>
          <Text>Cash on delivery (+ ₹{CONST_COD_CHARGES})</Text>
        </Option>
      </Container>
      <Submit className="clickable" type="submit" onClick={onSubmit}>
        Checkout
      </Submit>
      <Submit
        className="view clickable"
        type="submit"
        onClick={() => nextStep((prev) => prev - 1)}
      >
        Go Back
      </Submit>
      {openRazorPay && (
        <PaymentComponent
          orderId={orderId}
          email={email}
          amount={amount + shippingCharges + codCharges - discount}
          onCompletion={onRazorPayCompletion}
        />
      )}
    </FormContainer>
  );
};

export default PaymentOptions;
