'use client';
import FooterCarousel from '#/ui/components/FooterCarousel';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

const Container = styled.div`
  padding: 45px 0px;
  @media (max-width: 800px) {
    padding: 15px 0px;
  }
  .subHeader {
    text-align: center;
    margin-top: 20px;
  }
  > img {
    width: 100%;
  }
`;

// Styled Components
const TabContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 20px;

  @media (max-width: 800px) {
    padding: 10px;
  }
`;

const TabHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ccc;
`;

const TabButton = styled.div`
  padding: 12px 20px;
  flex: 1;
  text-align: center;
  cursor: pointer;
  font-size: 26px;
  font-weight: 600;
  background: '#888';
  color: '#fff';
  border: none;
  outline: none;
  transition: 0.3s;

  &:hover {
    background: '#666';
  }
  @media (max-width: 800px) {
    padding: 5px 15px;
  }
`;

const ContentContainer = styled.div`
  padding: 20px;
  background: #fff;
  line-height: 1.6;
  color: #333;

  @media (max-width: 800px) {
    padding: 15px;
  }
`;

const SectionTitle = styled.h2`
  font-weight: bold;
  font-size: 20px;
  text-decoration: underline;
  margin: 20px 0px 10px 0px;
`;

const SectionDescription = styled.ul<{ noBottomBorder?: boolean }>`
  margin-top: 10px;
  font-weight: lighter;
  list-style-type: disc;
  width: 100%;
  ${({ noBottomBorder }) =>
    noBottomBorder
      ? ''
      : 'border-bottom: 1px solid #ccc; padding-bottom: 20px;'}
  >li {
    display: list-item;
  }
`;

const PolicyComponent = (props: {
  title: string;
  subHeader: ReactNode;
  steps: { header: string; subHeader: ReactNode; pointer: ReactNode[] }[];
}) => {
  const { title, subHeader, steps } = props;

  return (
    <>
      <Container>
        <img src="https://i.postimg.cc/ZnGy0S12/AMJ-6.jpg" />
        <TabContainer>
          {/* Tab Header */}
          <TabHeader>
            <TabButton id="privacy">{title}</TabButton>
          </TabHeader>
          <div className="subHeader">{subHeader}</div>

          {/* Tab Content */}
          <ContentContainer>
            {steps.map((step, index) => (
              <div key={index}>
                <SectionTitle>{step.header}</SectionTitle>
                {!!step.subHeader && (
                  <SectionDescription noBottomBorder={!!step.pointer.length}>
                    {step.subHeader}
                  </SectionDescription>
                )}
                {!!step.pointer.length && (
                  <SectionDescription>
                    {step.pointer.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </SectionDescription>
                )}
              </div>
            ))}
          </ContentContainer>
        </TabContainer>
      </Container>
      <FooterCarousel rounded={false} />
    </>
  );
};

export default PolicyComponent;
