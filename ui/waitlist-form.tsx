import newStyled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Header1 = newStyled.span`
    font-family: Roboto Flex;
    font-size: 20px;
    color: #ffffff;
    margin: 0 12px;
    text-align: center;
`;

const SubHeader1 = newStyled.span`
    font-family: Roboto Flex;
    font-style: italic;
    font-size: 16px;
    color: #ffffff;
    margin: 0 12px;
    text-align: center;
`;

const CTA1 = newStyled.span`
    cursor: pointer;
    font-family: Roboto Flex;
    font-size: 20px;
    color: #ffffff;
    text-decoration: underline;
    text-align: center;
`;

const Form = newStyled.div`
    height: 80%;
`;

export default function WaitlistForm(props: { updateStage: () => void }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  useEffect(() => {
    setEmail('');
    setName('');
    setOtp('');
    setStep(1);
  }, []);

  const sendOtpServer = async () => {
    if (!email.trim() || !name.trim()) {
      return;
    }
    console.log(email, name);
    const res = await fetch('/api/waitlist/sendOtp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    });

    console.log(res);
    setStep(2);
  };

  const verifyOtpServer = async () => {
    if (!email.trim() || !otp.trim()) {
      return;
    }
    const res = await fetch('/api/waitlist/verifyOtp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });

    console.log(res);
    props.updateStage();
  };

  return step === 1 ? (
    <Form className="flex flex-col items-center justify-center gap-y-4 ">
      <Header1>
        Let us know about you and we will make sure your are the first one to
        checkout the Designs to Cherish.
      </Header1>
      <input
        type="text"
        placeholder="Your Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type="email"
        placeholder="Your Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <CTA1 onClick={sendOtpServer}>Send OTP</CTA1>
    </Form>
  ) : (
    <Form className="flex flex-col items-center justify-center gap-y-4 ">
      <Header1>You're Almost There!</Header1>
      <SubHeader1>
        We’ve sent an OTP to your email. Please enter it below to confirm your
        spot on the waitlist.
      </SubHeader1>
      <input
        type="text"
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
        value={otp}
      />
      <CTA1 onClick={verifyOtpServer}>Verify OTP</CTA1>
    </Form>
  );
}
