import { useAuth } from '#/context/AuthContext';
import { useToggle } from '#/hooks/useToggle';
import styled from '@emotion/styled';
import { useState } from 'react';
import Modal from './components/ModalComponent';
import EmailLogo from './svg/email-logo';
import EyeOffLogo from './svg/eye-off-logo';
import EyeOnLogo from './svg/eye-on-logo';
import PasswordLogo from './svg/password-logo';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #652821;
  border-radius: 10px;
  width: 60%;
  height: 90%;
  padding: 150px;
  @media (max-width: 1000px) {
    padding: 50px;
    width: 80%;
  }
  @media (max-width: 800px) {
    padding: 50px;
    width: 90%;
  }
`;

const Card = styled.div`
  width: 100%;
  text-align: center;
  color: white;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 40px;
  @media (max-width: 800px) {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const InputDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  color: black;
  justify-content: center;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 5px;
  padding: 0px 20px;
  border: 2px solid transparent;
  &.error {
    border: 2px solid red;
  }

  @media (max-width: 800px) {
    padding: 0px 5px;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 0px 20px;
  border-radius: 5px;
  font-weight: 600;
  border: none;
  font-size: 16px;
  color: black;
  :focus {
    outline: none;
    border: none;
    box-shadow: none;
  }

  @media (max-width: 800px) {
    padding: 0px 0px 0px 10px;
    font-size: 12px;
  }
`;

const InputLabel = styled.div`
  padding-left: 20px;
  opacity: 0.5;
  @media (max-width: 800px) {
    padding: 0px 0px 0px 10px;
    font-size: 12px;
  }
`;

const ErrorText = styled.p`
  color: white;
  height: 20px;
  opacity: 0.5;
  font-size: 14px;
  margin: 10px 0px;
  text-align: left;
  width: 100%;
`;

const StyledPasswordLogo = styled(PasswordLogo)`
  margin-top: 8px;
  transform: scale(1.15);
`;

const LoginButton = styled(Button)`
  background: black;
  color: white;
  padding: 20px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const SignUp = (props: { isOpen: boolean; onClose: () => void }) => {
  const { isOpen: showPassword, toggle: togglePassword } = useToggle();

  const { userDetails, handleEmailSignup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleEmailBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!validateEmail(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handlePasswordBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!validatePassword(value)) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSignIn = () => {
    handleEmailSignup(email, password, {
      firstName,
      lastName,
      mobile,
      pincode,
      address,
    });
  };

  const isFormValid = email && password && !emailError && !passwordError;

  const onClose = () => {
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
    setFirstName('');
    setLastName('');
    setMobile('');
    setPincode('');
    setAddress('');
    props.onClose();
  };

  if (!!userDetails) {
    return null;
  }

  return (
    <Modal isOpen={props.isOpen} onClose={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Card>
          <Title>Sign In</Title>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            <InputDiv>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '7.5px 0px',
                  fontSize: '10px',
                  alignItems: 'baseline',
                }}
              >
                <InputLabel>First Name</InputLabel>
                <InputField
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </InputDiv>
            <InputDiv>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '7.5px 0px',
                  fontSize: '10px',
                  alignItems: 'baseline',
                }}
              >
                <InputLabel>Last Name</InputLabel>
                <InputField
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </InputDiv>
            <InputDiv>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '7.5px 0px',
                  fontSize: '10px',
                  alignItems: 'baseline',
                }}
              >
                <InputLabel>Mobile</InputLabel>
                <InputField
                  type="text"
                  placeholder="Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </InputDiv>
            <InputDiv>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '7.5px 0px',
                  fontSize: '10px',
                  alignItems: 'baseline',
                }}
              >
                <InputLabel>Pincode</InputLabel>
                <InputField
                  type="text"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            </InputDiv>
          </div>
          <InputDiv style={{ marginBottom: '40px' }}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '7.5px 0px',
                fontSize: '10px',
                alignItems: 'baseline',
              }}
            >
              <InputLabel>Address</InputLabel>
              <InputField
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </InputDiv>
          <InputDiv className={emailError ? 'error' : ''}>
            <EmailLogo />
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '7.5px 0px',
                fontSize: '10px',
                alignItems: 'baseline',
              }}
            >
              <InputLabel>Email</InputLabel>
              <InputField
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
              />
            </div>
          </InputDiv>
          <ErrorText>{!!emailError && emailError}</ErrorText>

          {/* Password Input */}
          <InputDiv className={passwordError ? 'error' : ''}>
            <StyledPasswordLogo />
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '7.5px 0px',
                fontSize: '10px',
                alignItems: 'baseline',
              }}
            >
              <InputLabel>Password</InputLabel>
              <InputField
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
              />
            </div>
            <div style={{ cursor: 'pointer' }}>
              {showPassword ? (
                <EyeOnLogo onClick={togglePassword} />
              ) : (
                <EyeOffLogo onClick={togglePassword} />
              )}
            </div>
          </InputDiv>
          <ErrorText>{!!passwordError && passwordError}</ErrorText>
          <LoginButton disabled={!isFormValid} onClick={handleSignIn}>
            Sign In
          </LoginButton>
        </Card>
      </Container>
    </Modal>
  );
};

export default SignUp;
