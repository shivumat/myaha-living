import Colors from '#/ui/colors/colors';
import Container from '#/ui/components/ContainerBox';
import Textbox from '#/ui/components/Textbox';
import newStyled from '@emotion/styled';

const Wrapper = newStyled(Container)`
  border: 1px dashed ${Colors.black};
  padding: 60px 20px;
  text-align: center;
  margin-top: 40px;
  border-radius: 12px;
  background: ${Colors.white};
`;

const SubText = newStyled(Textbox)`
  font-size: 16px;
  font-weight: 400;
  color: ${Colors.black};
  margin-top: 10px;
`;

const NoProductsAvailable = () => {
  return (
    <Wrapper horizontalCenter width="100%">
      <Textbox fontSize="20px" fontWeight="600">
        No products match the selected filters
      </Textbox>
      <SubText>
        Try adjusting the filters to find what you're looking for.
      </SubText>
    </Wrapper>
  );
};

export default NoProductsAvailable;
