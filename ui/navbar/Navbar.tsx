import { useAuth } from '#/context/AuthContext';
import { useProduct } from '#/context/ProductContext';
import { useIsDesktopHomeOnTop } from '#/hooks/useIsDesktopHomeOnTop';
import { useIsMobile } from '#/hooks/useMobile';
import { useToggle } from '#/hooks/useToggle';
import { navRoutes } from '#/lib/constants/routes';
import newStyled from '@emotion/styled';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PlusMInusOpen from '../components/PlusMInusOpen';
import Sidebar from '../components/Sidebar';
import CartLogo from '../svg/cart-logo';
import MyahaLogo from '../svg/myaha-logo';
import UserLogo from '../svg/user-logo';
import AboutUs from './AboutUs';
import Collections from './Collections';

const NavContainer = newStyled.div<{
  showTransparent?: boolean;
  showAboutUs?: boolean;
  showCollection?: boolean;
}>`
  margin: 0;
  padding: 0;
  display: flex; 
  width: 100vw;
  height: 60px;
  background-color: ${({ showTransparent, showAboutUs }) => (showTransparent ? 'transparent' : showAboutUs ? '#733216' : 'white')};
  color : ${({ showAboutUs }) => (showAboutUs ? 'white' : 'black')};
  transition: background-color 300ms linear;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1000;
  border-bottom: 0.2px solid ${({ showTransparent, showAboutUs, showCollection }) => (showTransparent || showAboutUs || showCollection ? 'transparent' : '#00000033')};
  @media (max-width: 800px) {
    height: 40px;
  }
`;

const Burger = newStyled.span`
  font-size: 36px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 20px;
  margin-left: 20px;
  @media (max-width: 800px) {
    font-size: 20px;
    margin-bottom: 5px;
    margin-right: auto;
  }
`;

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

const LogosContainer = newStyled.div<{ showTransparent?: boolean }>`
  display: flex;
  justify-content: flex-end;
  width: 100px;
  align-items: center;
  column-gap: 15px;
  margin-left: auto;
  margin-right:20px;
  >div {
    cursor: pointer;
  }
  @media (max-width: 800px) {
    column-gap: 1px;
  }
`;

const StyledUserLogo = newStyled(UserLogo)`
  cursor: pointer;
  @media (max-width: 800px) {
    transform: scale(0.65);
  }
`;

const StyledCartLogo = newStyled(CartLogo)`
  cursor: pointer;
  @media (max-width: 800px) {
    transform: scale(0.65);
  }
`;

const StyledMyahaLogo = newStyled(MyahaLogo)<{
  margin?: string;
  showAboutUs?: boolean;
}>`
  ${({ showAboutUs }) => (!showAboutUs ? 'filter: invert(1);' : '')}
  ${({ margin = '' }) => (!!margin ? `margin: ${margin};` : '')}
`;

const Navbar = () => {
  const isMobile = useIsMobile();
  const { isOpen, toggle } = useToggle();
  const router = useRouter();
  const [showCollection, setShowCollection] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const isDesktopHomeOnTop = useIsDesktopHomeOnTop({
    turnBackToTransparent: !(showCollection || showAboutUs),
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isMobile && isDesktopHomeOnTop) {
      toggle(false);
    }
  }, [isMobile, isDesktopHomeOnTop]);

  const handleLinkClick = (path: string) => {
    router.push(path);
  };

  const { user, toggleLogin } = useAuth();

  const toggleCart = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('cart', 'true');
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const { collections } = useProduct();

  if (isMobile) {
    return (
      <>
        <NavContainer>
          <Burger onClick={() => toggle()}>☰</Burger>
          <StyledMyahaLogo
            onClick={() => router.push('/')}
            margin="auto 0px auto auto"
            width="111"
            height="30"
          />
          <LogosContainer showTransparent>
            <StyledCartLogo onClick={toggleCart} />
          </LogosContainer>
        </NavContainer>
        ;
        <Sidebar
          title={<StyledMyahaLogo margin="auto" width="111" height="30" />}
          side="left"
          isOpen={isOpen}
          onClose={() => toggle()}
        >
          <LinksContainer>
            {navRoutes.map((route, index) => {
              if (route.path === '/products')
                return (
                  <PlusMInusOpen
                    label="Shop by category"
                    items={collections.map((c) => c.title)}
                    handleLinkClick={(index) => {
                      toggle();
                      handleLinkClick(
                        `/products/${collections[index]?.id.replace('gid://shopify/Collection/', '')}`,
                      );
                    }}
                  />
                );
              return (
                <div
                  onClick={() => {
                    toggle();
                    handleLinkClick(route.path);
                  }}
                  key={index}
                >
                  {route.name}
                </div>
              );
            })}
            {!user ? (
              <div
                onClick={() => {
                  toggle();
                  toggleLogin();
                }}
              >
                <StyledUserLogo /> Log in
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
                onClick={() => {
                  toggle();
                }}
              >
                <div
                  style={{ display: 'flex', gap: '10px' }}
                  onClick={() => router.push('account')}
                >
                  <StyledUserLogo /> My account
                </div>
              </div>
            )}
          </LinksContainer>
        </Sidebar>
      </>
    );
  }

  const showTransparent = !isOpen && isDesktopHomeOnTop;
  let timer: NodeJS.Timeout;
  return (
    <>
      <NavContainer
        showTransparent={showTransparent}
        showAboutUs={showAboutUs}
        showCollection={showCollection}
      >
        {showTransparent && <Burger onClick={() => toggle()}>☰</Burger>}
        <StyledMyahaLogo
          showAboutUs={showAboutUs}
          width={showTransparent ? '111' : '99'}
          height={showTransparent ? '30' : '27'}
        />
        {!showTransparent && (
          <LinksContainer>
            {navRoutes.map((route, index) => {
              if (route.path === '/products') {
                return (
                  <div
                    onMouseEnter={() => {
                      setShowCollection(true);
                      setShowAboutUs(false);
                      clearTimeout(timer);
                    }}
                    onMouseLeave={() => {
                      timer = setTimeout(() => setShowCollection(false), 500);
                    }}
                  >
                    Shop
                  </div>
                );
              }
              if (route.path === '/about-us') {
                return (
                  <div
                    onMouseEnter={() => {
                      setShowAboutUs(true);
                      setShowCollection(false);
                      clearTimeout(timer);
                    }}
                    onMouseLeave={() => {
                      timer = setTimeout(() => setShowAboutUs(false), 500);
                    }}
                  >
                    About Us
                  </div>
                );
              }
              return (
                <div onClick={() => handleLinkClick(route.path)} key={index}>
                  {route.name}
                </div>
              );
            })}
          </LinksContainer>
        )}
        <LogosContainer showTransparent={showTransparent}>
          {!showTransparent &&
            (!user ? (
              <StyledUserLogo
                color={showAboutUs ? 'white' : 'black'}
                onClick={toggleLogin}
              />
            ) : (
              <StyledUserLogo
                color={showAboutUs ? 'white' : 'black'}
                onClick={() => router.push('/account')}
              />
            ))}
          {!showTransparent && (
            <StyledCartLogo
              color={showAboutUs ? 'white' : 'black'}
              onClick={toggleCart}
            />
          )}
        </LogosContainer>
        {(showCollection || showAboutUs) && (
          <div
            onMouseLeave={() => {
              if (showCollection) setShowCollection(false);
              if (showAboutUs) setShowAboutUs(false);
            }}
            onMouseEnter={() => {
              clearTimeout(timer);
            }}
            style={{
              width: '100%',
              height: '400px',
              backgroundColor: showAboutUs ? '#733216' : 'white',
              position: 'absolute',
              top: '60px',
            }}
          >
            {showCollection ? (
              <Collections toggle={() => setShowCollection(false)} />
            ) : (
              <AboutUs toggle={() => setShowAboutUs(false)} />
            )}
          </div>
        )}
      </NavContainer>
    </>
  );
};

export default Navbar;
