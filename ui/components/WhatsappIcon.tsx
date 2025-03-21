import styled from '@emotion/styled';

const FloatingButton = styled.a`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #25d366;
  color: white;
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #1ebe57;
    transform: scale(1.1);
  }
`;

const WhatsAppButton = () => {
  const phoneNumber = '916350533372';

  return (
    <FloatingButton
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="Whatsapp"
      />
    </FloatingButton>
  );
};

export default WhatsAppButton;
