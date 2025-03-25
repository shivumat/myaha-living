'use client';
import { useSearch } from '#/context/SearchContext';
import { useIsMobile } from '#/hooks/useMobile';
import { footerRoutes, FooterRouteTypes } from '#/lib/constants/routes';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Container = newStyled.div`
  width: 85%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  height: max-content;
  @media (max-width: 800px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Links = newStyled.div`
  font-size: 16px;
  height: 44px;
  cursor: pointer;
  font-weight: lighter;
  @media (max-width: 800px) {
    font-size: 12px;
    height: 24px;
    margin-top: 10px
  }
`;

const MobileContainer = newStyled.div`
  border-top: 0.5px solid white;
  margin-bottom: 20px;
`;
const MobileHeaderContainer = newStyled.div`
  padding: 2px 0px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const MobileLink = (props: {
  label: string;
  items: FooterRouteTypes[];
  handleLinkClick: (item: FooterRouteTypes) => void;
}) => {
  const { label, items, handleLinkClick } = props;
  const [isOpen, setIsOpen] = useState(false);
  const isSingle = items.length === 1;

  return (
    <MobileContainer>
      <MobileHeaderContainer
        onClick={
          isSingle
            ? () => handleLinkClick(items[0])
            : () => setIsOpen((prev) => !prev)
        }
      >
        <div>{label}</div>
        {!isSingle && <div>{isOpen ? '-' : '+'}</div>}
      </MobileHeaderContainer>
      {!isSingle &&
        !!isOpen &&
        items.map((route, index) => (
          <Links key={index} onClick={() => handleLinkClick(route)}>
            {route.name}
          </Links>
        ))}
    </MobileContainer>
  );
};

const FooterLinks = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { setSearchText } = useSearch();

  const routesGroupedBySection: { [key: string]: FooterRouteTypes[] } =
    footerRoutes.reduce(
      (group: { [key: string]: FooterRouteTypes[] }, route) => {
        const groupArray = group[route.section] ?? [];
        groupArray.push(route);
        group[route.section] = groupArray;
        return group;
      },
      {},
    );

  const handleLinkClick = (item: FooterRouteTypes) => {
    if (!!item.state) setSearchText(item.state);
    router.push(item.path);
  };

  const DesktopView = (
    <>
      {footerRoutes.map((route, index) => (
        <Links key={index} onClick={() => handleLinkClick(route)}>
          {route.name}
        </Links>
      ))}
    </>
  );

  const MobileView = (
    <>
      {Object.keys(routesGroupedBySection).map((key, index) => (
        <MobileLink
          key={index}
          label={key}
          items={routesGroupedBySection[key]}
          handleLinkClick={handleLinkClick}
        />
      ))}
    </>
  );

  return <Container>{isMobile ? MobileView : DesktopView}</Container>;
};

export default FooterLinks;
