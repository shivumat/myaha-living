'use client';
import { useToast } from '#/context/ToastContext';
import newStyled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';
import Colors from '../colors/colors';
import PaymentComponent from '../components/Payment';

export const CONST_COD_CHARGES = 40;

/* ---------- Styled ---------- */

const FormContainer = newStyled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 20px 0px 10px;
  justify-content: flex-start;
  align-items: stretch;
  gap: 24px;
  width: 100%;
  background: ${Colors.white};
  @media (max-width: 800px) {
    max-width: 100%;
    margin: 10px 0px 10px;
  }
`;

const Container = newStyled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/* Payment option card */
const OptionCard = newStyled.label<{ selected?: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 2px solid ${(p) => (p.selected ? '#1976d2' : '#e6e6e6')};
  box-shadow: ${(p) => (p.selected ? '0 4px 12px rgba(25,118,210,0.08)' : 'none')};
  padding: 16px;
  cursor: pointer;
  transition: all 160ms ease-in-out;
  background: #fff;
  overflow: hidden;

  @media (max-width: 800px) {
    padding: 12px;
  }
`;

/* Top row inside a payment card */
const OptionTopRow = newStyled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
`;

/* left block for radio + title */
const OptionLeft = newStyled.div`
  display:flex;
  align-items:center;
  gap:12px;
`;

/* radio visuals */
const HiddenRadio = newStyled.input`
  display: none;
`;

const RadioCircle = newStyled.div<{ selected?: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${(p) => (p.selected ? '#1976d2' : '#333')};
  border-radius: 50%;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
`;

const InnerCircle = newStyled.div<{ selected?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(p) => (p.selected ? '#1976d2' : 'transparent')};
`;

/* small title text */
const OptionTitle = newStyled.div`
  font-size:16px;
  font-weight:500;
`;

/* icons area */
const IconsRow = newStyled.div`
  display:flex;
  align-items:center;
  gap:8px;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

/* illustration area (big grey box like screenshot) */
const IllustrationBox = newStyled.div`
  margin-top:12px;
  background: #f6f6f6;
  border-radius: 6px;
  min-height:140px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  color:#666;
  padding:18px;
  border: 1px solid #e9e9e9;
  text-align:center;
`;

/* small caption under illustration */
const IllustrationCaption = newStyled.div`
  margin-top:12px;
  font-size:14px;
  color:#444;
  line-height:1.4;
`;

/* COD compact row (smaller text) */
const CODRow = newStyled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  margin-top:4px;
`;

/* Billing address card */

/* Big primary button */
const PayButton = newStyled.button<{ variant?: 'primary' | 'outline' }>`
  height:56px;
  border-radius:8px;
  border: none;
  font-size:18px;
  font-weight:600;
  cursor:pointer;
  width:100%;
  background: ${(p) => (p.variant === 'outline' ? '#fff' : '#0b63d6')};
  color: ${(p) => (p.variant === 'outline' ? '#111' : '#fff')};
  box-shadow: ${(p) => (p.variant === 'outline' ? 'none' : '0 6px 18px rgba(11,99,214,0.12)')};
  border: ${(p) => (p.variant === 'outline' ? '1px solid #ccc' : 'none')};
`;

/* small utility img */
const IconImg = newStyled.img`
  width:36px;
  height:22px;
  object-fit:contain;
`;

/* small muted text */
const Muted = newStyled.div`
  font-size:13px;
  color:#666;
`;

/* row for two small action buttons */
const ActionRow = newStyled.div`
  display:flex;
  gap:12px;
  width:100%;
  margin-top:8px;
`;

/* ----- end styled ----- */

type Props = {
  codCharges: number;
  setCodCharges: Dispatch<SetStateAction<number>>;
  orderId?: string;
  amount: number;
  shippingCharges: number;
  email?: string;
  customerName?: string;
  customerNumber: string;
  onPaymentCompletion: (paymentId: string) => Promise<void>;
  discount: number;
  isDisabled: boolean;
  isMobile?: boolean;
};

const PaymentOptions = ({
  codCharges,
  setCodCharges,
  amount,
  shippingCharges,
  email,
  orderId,
  onPaymentCompletion,
  discount,
  customerName,
  customerNumber,
  isDisabled,
  isMobile,
}: Props) => {
  const [disabled, setDisabled] = useState(false);
  const [openRazorPay, setOpenRazorPay] = useState(false);
  const { startLoading } = useToast();

  const onRazorPayCompletion = (razorPayKey: string) => {
    setOpenRazorPay(false);
    startLoading();
    onPaymentCompletion(razorPayKey);
  };

  const onSubmit = () => {
    if (disabled) return;
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 3500);
    // If COD selected, codCharges > 0
    if (!codCharges) {
      // open razorpay modal
      setOpenRazorPay(true);
      return;
    }
    startLoading();
    onPaymentCompletion('');
  };

  return (
    <FormContainer>
      <h3
        style={{
          fontSize: isMobile ? '16px' : '24px',
          fontWeight: '400',
          margin: isMobile ? '10px 0px 10px' : '10px 0px 10px',
        }}
      >
        Payment
      </h3>

      <Container>
        {/* Razorpay */}
        <OptionCard selected={!codCharges} onClick={() => setCodCharges(0)}>
          <OptionTopRow>
            <OptionLeft>
              <HiddenRadio
                type="radio"
                name="payment"
                value="razorpay"
                checked={!codCharges}
                onChange={() => setCodCharges(0)}
              />
              <RadioCircle selected={!codCharges}>
                <InnerCircle selected={!codCharges} />
              </RadioCircle>
              <div>
                <OptionTitle>
                  Razorpay Secure (UPI, Cards, Wallets, NetBanking)
                </OptionTitle>
                <Muted>All transactions are secure and encrypted.</Muted>
              </div>
            </OptionLeft>

            <IconsRow>
              <IconImg
                src="https://upload.wikimedia.org/wikipedia/commons/6/6f/UPI_logo.svg"
                alt="upi"
              />
              <IconImg
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                alt="visa"
              />
              <IconImg
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="mastercard"
              />
            </IconsRow>
          </OptionTopRow>

          <IllustrationBox>
            {/* visual placeholder similar to screenshot */}
            <svg
              width="84"
              height="56"
              viewBox="0 0 84 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="4"
                width="82"
                height="48"
                rx="4"
                stroke="#dcdcdc"
                strokeWidth="2"
                fill="#fff"
              />
              <path
                d="M12 20H56"
                stroke="#d0d0d0"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 32H56"
                stroke="#d0d0d0"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <IllustrationCaption>
              After clicking “Pay now”, you will be redirected to Razorpay to
              complete your purchase securely.
            </IllustrationCaption>
          </IllustrationBox>
        </OptionCard>

        {/* Cash on Delivery */}
        <OptionCard
          selected={!!codCharges}
          onClick={() => {
            setOpenRazorPay(false);
            setCodCharges(CONST_COD_CHARGES);
          }}
        >
          <OptionTopRow>
            <OptionLeft>
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
              <RadioCircle selected={!!codCharges}>
                <InnerCircle selected={!!codCharges} />
              </RadioCircle>
              <div>
                <OptionTitle>Cash on Delivery</OptionTitle>
                <Muted>Pay with cash upon delivery</Muted>
              </div>
            </OptionLeft>

            <div style={{ fontWeight: 600 }}>+ ₹{CONST_COD_CHARGES}</div>
          </OptionTopRow>

          <CODRow>
            <Muted style={{ fontSize: 13 }}>
              Orders above ₹8,000 may not be eligible for COD.
            </Muted>
          </CODRow>
        </OptionCard>
      </Container>

      {/* Action buttons */}
      <ActionRow>
        <div style={{ flex: 1 }}>
          <PayButton
            className={`clickable ${disabled || isDisabled ? 'disabled' : ''}`}
            onClick={onSubmit}
            disabled={disabled || isDisabled}
          >
            Pay now
          </PayButton>
        </div>
      </ActionRow>

      {/* Payment modal / component */}
      {openRazorPay && email && customerName && (
        <PaymentComponent
          orderId={orderId}
          email={email}
          customerName={customerName}
          customerNumber={customerNumber}
          amount={amount + shippingCharges + codCharges - discount}
          onCompletion={onRazorPayCompletion}
          onExit={() => {
            setOpenRazorPay(false);
          }}
        />
      )}
    </FormContainer>
  );
};

export default PaymentOptions;
