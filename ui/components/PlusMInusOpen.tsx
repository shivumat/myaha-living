import newStyled from '@emotion/styled';
import { ReactNode, useState } from 'react';
import { HiOutlineMinusSmall, HiOutlinePlusSmall } from 'react-icons/hi2';
import Colors from '../colors/colors';
import Container from './ContainerBox';

const MobileContainer = newStyled.div`
  border-top: 0.5px solid ${Colors.white};
`;
const MobileHeaderContainer = newStyled.div<{ isOpen: boolean }>`
  padding: 2px 0px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  align-items: center;
  ${({ isOpen }) => !isOpen && `margin-bottom: 10px;`}
`;

const Links = newStyled.div`
  font-size: 16px;
  height: 44px;
  cursor: pointer;
  font-weight: lighter;
  @media (max-width: 800px) {
    font-size: 12px;
    height: 24px;
    margin-top: 10px;
    font-weight: 400;
  }
`;

const PlusMInusOpen = ({
  handleLinkClick,
  label,
  items,
  children,
}: {
  handleLinkClick?: (index: number) => void;
  label: string;
  items: string[];
  children?: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MobileContainer>
      <MobileHeaderContainer
        isOpen={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="clickable">{label}</div>
        <div className="clickable">
          {isOpen ? <HiOutlineMinusSmall /> : <HiOutlinePlusSmall />}
        </div>
      </MobileHeaderContainer>

      {!!isOpen && (
        <Container>
          {children
            ? children
            : items.map((item, index) => (
                <Links
                  className="clickable"
                  key={index}
                  onClick={() => handleLinkClick?.(index)}
                >
                  {item}
                </Links>
              ))}
        </Container>
      )}
    </MobileContainer>
  );
};

export default PlusMInusOpen;
