import { useIsDesktopHomeOnTop } from '#/hooks/useIsDesktopHomeOnTop';
import { useIsMobile } from '#/hooks/useMobile';
import { useToggle } from '#/hooks/useToggle';
import { navRoutes, NavRouteTypes } from '#/lib/constants/routes';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
// import CartLogo from '../svg/cart-logo';
import MyahaLogo from '../svg/myaha-logo';
// import SearchLogo from '../svg/search-logo';
import UserLogo from '../svg/user-logo';

const NavContainer = newStyled.div<{ showTransparent?: boolean }>`
  margin: 0;
  padding: 0;
  display: flex; 
  width: 100%;
  height: 60px;
  background-color: ${({ showTransparent }) => (showTransparent ? 'transparent' : 'white')};
  transition: background-color 300ms linear;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1000;
  border-bottom: 0.2px solid ${({ showTransparent }) => (showTransparent ? 'transparent' : '#00000033')};
  @media (max-width: 800px) {
    height: 40px;
  }
`;

// const Burger = newStyled.span`
//   font-size: 36px;
//   cursor: pointer;
//   margin-bottom: 10px;
//   margin-right: 20px;
//   margin-left: 20px;
//   @media (max-width: 800px) {
//     font-size: 20px;
//     margin-bottom: 5px;
//     margin-right: auto;
//   }
// `;

const LinksContainer = newStyled.div`
  display: flex;
  margin-left: auto;
  column-gap: 20px;
  >div {
    font-size: 16px;
    font-weight: lighter;
    cursor: pointer;
  }
  @media (max-width: 800px) {
    height: 100%;
    flex-direction: column;
    row-gap: 20px;
    width: 100%;
    margin-top: 20px;
    >div {
      font-size: 14px;
      font-weight: lighter;
      cursor: pointer;
      border-bottom: 1px solid #00000033;
    }
    >div:last-child {
      display: flex;
      margin-top: auto;
      margin-bottom: 20px;
      padding-top: 20px;
      border-top: 1px solid #00000033;
      border-bottom: 1px solid transparent;
    }
  }
`;

// const LogosContainer = newStyled.div<{ showTransparent?: boolean }>`
//   display: flex;
//   justify-content: flex-end;
//   width: 100px;
//   align-items: center;
//   column-gap: 15px;
//   margin-left: auto;
//   margin-right:20px;
//   >div {
//     cursor: pointer;
//   }
//   @media (max-width: 800px) {
//     column-gap: 1px;
//   }
// `;

const StyledUserLogo = newStyled(UserLogo)`
  cursor: pointer;
  @media (max-width: 800px) {
    transform: scale(0.65);
  }
`;

// const StyledSearchLogo = newStyled(SearchLogo)`
//   cursor: pointer;
//   @media (max-width: 800px) {
//     transform: scale(0.65);
//   }
// `;

// const StyledCartLogo = newStyled(CartLogo)`
//   cursor: pointer;
//   @media (max-width: 800px) {
//     transform: scale(0.65);
//   }
// `;

const StyledMyahaLogo = newStyled(MyahaLogo)<{ margin?: string }>`
  filter: invert(1);
  cursor: pointer;
  ${({ margin = '' }) => (!!margin ? `margin: ${margin};` : '')}
`;

const Navbar = () => {
  const isMobile = useIsMobile();
  const { isOpen, toggle } = useToggle();
  const router = useRouter();
  // const isDesktopHomeOnTop = useIsDesktopHomeOnTop();
  const isDesktopHomeOnTop = useIsDesktopHomeOnTop({
    checkPath: '/coming-soon',
  });

  useEffect(() => {
    if (!isMobile && isDesktopHomeOnTop) {
      toggle(false);
    }
  }, [isMobile, isDesktopHomeOnTop]);

  const handleLinkClick = (item: NavRouteTypes) => {
    router.push(item.path);
  };

  if (isMobile) {
    return (
      <>
        <NavContainer>
          {/* <Burger onClick={() => toggle()}>☰</Burger> */}
          <StyledMyahaLogo
            onClick={() => router.push('/')}
            // margin="auto 0px auto auto"
            margin="auto"
            width="111"
            height="30"
          />
          {/* <LogosContainer showTransparent>
            <StyledSearchLogo />
            <StyledCartLogo />
          </LogosContainer> */}
        </NavContainer>
        ;
        <Sidebar
          title={<StyledMyahaLogo margin="auto" width="111" height="30" />}
          side="left"
          isOpen={isOpen}
          onClose={() => toggle()}
        >
          <LinksContainer>
            {navRoutes.map((route, index) => (
              <div
                onClick={() => {
                  toggle();
                  handleLinkClick(route);
                }}
                key={index}
              >
                {route.name}
              </div>
            ))}
            <div
              onClick={() => {
                toggle();
                router.push('/account');
              }}
            >
              <StyledUserLogo /> My Account
            </div>
          </LinksContainer>
        </Sidebar>
      </>
    );
  }

  const showTransparent = !isOpen && isDesktopHomeOnTop;

  return (
    <>
      <NavContainer showTransparent={showTransparent}>
        {/* {showTransparent && <Burger onClick={() => toggle()}>☰</Burger>} */}
        {/* <StyledMyahaLogo
          width={showTransparent ? '111' : '99'}
          height={showTransparent ? '30' : '27'}
        /> */}
        {!showTransparent && (
          <StyledMyahaLogo
            width={showTransparent ? '111' : '99'}
            height={showTransparent ? '30' : '27'}
            onClick={() => router.push('/')}
          />
        )}
        {/* {!showTransparent && (
          <LinksContainer>
            {navRoutes.map((route, index) => (
              <div onClick={() => handleLinkClick(route)} key={index}>
                {route.name}
              </div>
            ))}
          </LinksContainer>
        )}
        <LogosContainer showTransparent={showTransparent}>
          <StyledSearchLogo />
          {!showTransparent && <StyledUserLogo />}
          {!showTransparent && <StyledCartLogo />}
        </LogosContainer> */}
      </NavContainer>
    </>
  );
};

export default Navbar;
