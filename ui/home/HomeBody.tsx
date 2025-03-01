'use client';
import newStyled from '@emotion/styled';

const Container = newStyled.div`
  padding: 20px;
  height: 200%;
`;

const TestContainer = newStyled.div`
  height : 45%;
`;

const HomeBody = () => {
  return (
    <Container>
      <TestContainer>test</TestContainer>
      <TestContainer id="our_story">test</TestContainer>
    </Container>
  );
};

export default HomeBody;
