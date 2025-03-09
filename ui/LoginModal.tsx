import styled from '@emotion/styled';
import Modal from './components/ModalComponent';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #652821;
  border-radius: 10px;
  width: 60%;
  height: 80%;
  padding: 150px;
  @media (max-width: 800px) {
    padding: 50px;
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
  background: white;
  color: black;
  padding: 20px;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const LoginButton = styled(Button)`
  background: black;
  color: white;
`;

const Footer = styled.p`
  margin-top: 10px;
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
  background-color: white;
`;

const Login = (props: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} title="Login">
      <Container>
        <Card>
          <Title>Login</Title>
          <GoogleButton>Login with Google</GoogleButton>
          <FlexContainer>
            <Ordiv></Ordiv>
            <p style={{ margin: '0 10px' }}>OR</p>
            <Ordiv></Ordiv>
          </FlexContainer>
          <InputField type="email" placeholder="Email" />
          <InputField type="password" placeholder="Password" />
          <CheckboxContainer>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </CheckboxContainer>
          <LoginButton>Login</LoginButton>
          <Footer>
            Don’t have an account? <a href="#">Register</a>
          </Footer>
        </Card>
      </Container>
    </Modal>
  );
};

export default Login;
