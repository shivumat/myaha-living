import newStyled from '@emotion/styled';
import { ReactNode, useState } from 'react';

const MobileContainer = newStyled.div`
  border-top: 0.5px solid white;
`;
const MobileHeaderContainer = newStyled.div`
  padding: 2px 0px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
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
      <MobileHeaderContainer onClick={() => setIsOpen((prev) => !prev)}>
        <div className="clickable">{label}</div>
        <div className="clickable">{isOpen ? '-' : '+'}</div>
      </MobileHeaderContainer>
      {!!isOpen &&
        (children
          ? children
          : items.map((item, index) => (
              <Links
                className="clickable"
                key={index}
                onClick={() => handleLinkClick?.(index)}
              >
                {item}
              </Links>
            )))}
    </MobileContainer>
  );
};

export default PlusMInusOpen;
