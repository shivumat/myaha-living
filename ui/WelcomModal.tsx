import { useAuth } from '#/context/AuthContext';
import styled from '@emotion/styled';
import Colors from './colors/colors';
import Modal from './components/ModalComponent';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #652821;
  border-radius: 10px;
  width: 50%;
  height: 70%;
  padding: 150px;
  @media (max-width: 1000px) {
    padding: 50px;
    width: 80%;
    height: 60%;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 10px;
  @media (max-width: 800px) {
    font-size: 16px;
  }
`;

const Welcome = (props: { isOpen: boolean; onClose: () => void }) => {
  const { userDetails } = useAuth();

  const onClose = () => {
    props.onClose();
  };

  if (!userDetails) {
    return null;
  }

  return (
    <Modal isOpen={props.isOpen} onClose={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Card>
          <Title>Welcome, {userDetails.firstName ?? userDetails.email}</Title>
          <Title>Your account has been created !</Title>
          <img src="/images/welcome.png" />
        </Card>
      </Container>
    </Modal>
  );
};

export default Welcome;
