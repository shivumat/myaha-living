import newStyled from '@emotion/styled';
import Image from 'next/image';
import Modal from './components/ModalComponent';

const Container = newStyled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding: 40px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  @media (max-width: 1000px) {
    width: 100%;
    padding: 30px;
  }
  @media (max-width: 800px) {
    width: 100%;
    padding: 20px;
  }
`;

const Laoding = (props: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <Container>
        <Image
          src={'/images/loading-buffering.gif'}
          alt="loading"
          width={40}
          height={40}
        />
      </Container>
    </Modal>
  );
};

export default Laoding;
