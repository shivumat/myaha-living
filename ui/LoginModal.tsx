import { useAuth } from '#/context/AuthContext';
import { useToggle } from '#/hooks/useToggle';
import styled from '@emotion/styled';
import { useState } from 'react';
import Colors from './colors/colors';
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
  color: ${Colors.white};
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

const GoogleButton = styled(Button)`
  background: ${Colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.black};
  padding: 20px;
  margin-bottom: 20px;
`;

const InputDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  color: ${Colors.white};
  justify-content: center;
  margin-bottom: 10px;
  background-color: ${Colors.white};
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
  color: ${Colors.black};
  :focus {
    outline: none;
    border: none;
    box-shadow: none;
  }

  @media (max-width: 800px) {
    font-size: 14px;
  }
`;

const InputLabel = styled.div`
  padding-left: 20px;
  opacity: 0.5;
`;

const ErrorText = styled.p`
  color: ${Colors.white};
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

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const LoginButton = styled(Button)`
  background: ${Colors.white};
  color: ${Colors.white};
  padding: 20px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const Footer = styled.p`
  margin-top: 10px;
  color: ${Colors.white};
  font-size: 14px;
  > a {
    color: ${Colors.white};
    cursor: pointer;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Ordiv = styled.div`
  flex: 1;
  height: 0.5px;
  background-color: ${Colors.white};
`;

const Login = (props: {
  isOpen: boolean;
  onClose: () => void;
  toggleSignUp: () => void;
}) => {
  const { isOpen: showPassword, toggle: togglePassword } = useToggle();
  const { loginWithGoogle, login, userDetails } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
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

  const handleLogin = () => {
    if (!emailError && !passwordError && email && password) {
      // Perform login action
      login(email, password, checked);
    }
  };

  const isFormValid = email && password && !emailError && !passwordError;

  const onClose = () => {
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
    props.onClose();
  };

  if (!!userDetails) {
    return null;
  }

  return (
    <Modal isOpen={props.isOpen} onClose={onClose} title="Login">
      <Container onClick={(e) => e.stopPropagation()}>
        <Card>
          <Title>Login</Title>
          <GoogleButton onClick={loginWithGoogle}>
            <img
              height={30}
              width={30}
              style={{ marginRight: '10px' }}
              src="https://upload.wikimedia.org/wikipedia/commons/d/dc/Google-g-icon.png"
            />
            Login with Google
          </GoogleButton>
          <FlexContainer>
            <Ordiv></Ordiv>
            <p style={{ margin: '0 10px' }}>OR</p>
            <Ordiv></Ordiv>
          </FlexContainer>

          {/* Email Input */}
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

          {/* Checkbox */}
          <CheckboxContainer>
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
                checked={checked}
                onClick={() => setChecked((prev) => !prev)}
              />{' '}
              Remember me
            </label>
            {/* <a href="#">Forgot Password?</a> */}
          </CheckboxContainer>

          {/* Login Button */}
          <LoginButton onClick={handleLogin} disabled={!isFormValid}>
            Login
          </LoginButton>

          {/* Footer */}
          <Footer>
            Don’t have an account?{' '}
            <a
              onClick={() => {
                props.toggleSignUp();
              }}
            >
              Register
            </a>
          </Footer>
        </Card>
      </Container>
    </Modal>
  );
};

export default Login;
