import newStyled from '@emotion/styled';

const Container = newStyled.div`
    background-color: #B89B5E; /* Muted Sunset Orange */
    color: #FFFFFF; /* White Text */
    padding: 15px;
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    width: 100%;
    border-radius: 4px; /* Slight rounded corners for premium feel */
`;
const ProductOffer = ({ text }: { text: string }) => {
  return <Container dangerouslySetInnerHTML={{ __html: text }} />;
};

export default ProductOffer;
