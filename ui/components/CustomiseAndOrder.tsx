import newStyled from '@emotion/styled';
import Colors from '../colors/colors';

const Container = newStyled.div<{ width?: string; height?: string }>`
    height: ${(props) => props.height || '30px'};
    width: ${(props) => props.width || '130px'};
    @media (max-width: 800px) {
        width: ${(props) => props.width || '100px'};
    }
  `;

const AddtoCart = newStyled.button<{ width?: string; height?: string }>`
    height: 100%;
    width: 100%;
    background-color: ${Colors.black};
    font-size: 18px;
    color: ${Colors.white};
    border: 0px solid ${Colors.black};
    border-radius: 3px;
    cursor: pointer;
    &.disabled{
        background-color: grey;
        cursor: not-allowed;
    }
    @media (max-width: 800px) {
        font-size: 14px;
    }
`;

const CustomiseAndOrder = (props: {
  variantId: string;
  inventoryId: string;
  quantityAvailable: number;
  className?: string;
  width?: string;
  height?: string;
}) => {
  const { quantityAvailable } = props;

  const phoneNumber = '916350533372';

  const handleDivClick = () => {
    // Open 'https://www.example.com' in a new tab
    window.open(
      `https://wa.me/${phoneNumber}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <Container width={props.width} height={props.height}>
      <AddtoCart
        className={`clickable ${props.className} ${quantityAvailable <= 0 ? 'disabled' : ''}`}
        onClick={handleDivClick}
      >
        Customise & order
      </AddtoCart>
    </Container>
  );
};

export default CustomiseAndOrder;
