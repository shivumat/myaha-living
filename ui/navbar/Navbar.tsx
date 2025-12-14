import { useAuth } from '#/context/AuthContext';
import { useCart } from '#/context/CartContext';
import { useProduct } from '#/context/ProductContext';
import { useIsDesktopHomeOnTop } from '#/hooks/useIsDesktopHomeOnTop';
import { useIsMobile } from '#/hooks/useMobile';
import { useToggle } from '#/hooks/useToggle';
import { mobileNavRoutes, navRoutes } from '#/lib/constants/routes';
import newStyled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Announcements from '../Announcements';
import Colors from '../colors/colors';
import CommandBar from '../components/Commandbar';
import PlusMInusOpen from '../components/PlusMInusOpen';
import Sidebar from '../components/Sidebar';
import CartLogo from '../svg/cart-logo';
import MyahaLogo from '../svg/myaha-logo';
import SearchLogo from '../svg/search-logo';
import UserLogo from '../svg/user-logo';
import AboutUs from './AboutUs';
import Collections from './Collections';

const NavContainer = newStyled.div<{
  showTransparent?: boolean;
  showAboutUs?: boolean;
  showCollection?: boolean;
  hasAnnouncements?: boolean;
}>`
  margin: 0;
  padding: 0;
  display: flex; 
  width: 100vw;
  height: 80px;
  background-color: ${({ showTransparent, showAboutUs }) => (showTransparent ? 'transparent' : showAboutUs ? '#5F1E1E' : Colors.white)};
  color : ${({ showAboutUs }) => (showAboutUs ? Colors.white : Colors.black)};
  transition: background-color 300ms linear;
  align-items: center;
  position: fixed;
  top: ${({ hasAnnouncements }) => (hasAnnouncements ? '38px' : '0')};
  z-index: 1000;
  border-bottom: 0.2px solid ${({ showTransparent, showAboutUs, showCollection }) => (showTransparent || showAboutUs || showCollection ? 'transparent' : '#00000033')};
  @media (max-width: 800px) {
    height: 60px;
  }
`;

const Burger = newStyled(GiHamburgerMenu)`
  margin-left: 20px;
`;

const LinksContainer = newStyled.div<{
  showTransparent?: boolean;
  showAboutUs?: boolean;
  showCollection?: boolean;
}>`
  display: flex;
  margin-left: auto;
  column-gap: 20px;
  >div {
    font-size: 16px;
    font-weight: lighter;
    cursor: pointer;
  }
  color: ${({ showTransparent, showAboutUs }) => (showTransparent || showAboutUs ? Colors.white : Colors.black)};
  @media (max-width: 800px) {
    height: 100%;
    flex-direction: column;
    row-gap: 20px;
    width: 100%;
    margin-top: 20px;
    >div {
      font-size: 14px;
      font-weight: 400;
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

const LogosContainer = newStyled.div`
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
    display: flex;
    column-gap: 1px;
  }
`;

const StyledUserLogo = newStyled(UserLogo)`
  cursor: pointer;
`;

const StyledCartLogo = newStyled(CartLogo)`
  cursor: pointer;
  @media (max-width: 800px) {
    transform: scale(0.65);
  }
`;

const StyledSearchLogo = newStyled(SearchLogo)`
  cursor: pointer;
  @media (max-width: 800px) {
    transform: scale(0.65);
  }
`;

const StyledMyahaLogo = newStyled(MyahaLogo)<{
  margin?: string;
  showAboutUs?: boolean;
  showTransparent?: boolean;
}>`
  @media (max-width: 800px) {
    width: inherit;
  }
  ${({ showAboutUs, showTransparent }) => (!(showAboutUs || showTransparent) ? 'filter: invert(1);' : '')}
  ${({ margin = '' }) => (!!margin ? `margin: ${margin};` : '')}
`;

const Navbar = () => {
  const isMobile = useIsMobile();
  const { isOpen, toggle } = useToggle();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const isDesktopHomeOnTop = useIsDesktopHomeOnTop({
    turnBackToTransparent: !(showCollection || showAboutUs),
  });
  useEffect(() => {
    if (!isMobile && isDesktopHomeOnTop) {
      toggle(false);
    }
  }, [isMobile, isDesktopHomeOnTop]);

  const handleLinkClick = (path: string) => {
    router.push(path);
  };

  const { user, toggleLogin } = useAuth();

  const { cart, toggleCart } = useCart();

  const totalCartItem = cart.reduce((acc, item) => acc + item.quantity, 0);

  const {
    collections,
    materialCollections,
    onSearchProducts,
    hasAnnouncements,
  } = useProduct();
  const showTransparent =
    !isOpen && isDesktopHomeOnTop && !showCollection && !showAboutUs;

  const Cart = (
    <div style={{ position: 'relative' }} onClick={toggleCart}>
      <AnimatePresence>
        {totalCartItem > 0 && (
          <motion.div
            key={totalCartItem} // Re-animates on count change
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 8 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: isMobile ? '10px' : '16px',
              height: isMobile ? '10px' : '16px',
              color: `${showTransparent || showAboutUs ? Colors.white : Colors.black}`,
              border: `0.5px solid ${showTransparent || showAboutUs ? Colors.white : Colors.black}`,
              fontSize: isMobile ? '5px' : '8px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              zIndex: 20,
              right: isMobile ? '2px' : '-3px',
              ...(isMobile ? {} : { top: '-3px' }),
              position: 'absolute',
            }}
          >
            {totalCartItem}
          </motion.div>
        )}
      </AnimatePresence>

      <StyledCartLogo
        className="clickable"
        color={
          (!isMobile && showTransparent) || showAboutUs
            ? Colors.white
            : Colors.black
        }
      />
    </div>
  );

  if (isMobile) {
    return (
      <>
        <Announcements />
        <NavContainer hasAnnouncements={hasAnnouncements}>
          <Burger size={35} onClick={() => toggle()} />
          <StyledMyahaLogo
            className="clickable"
            onClick={() => router.push('/')}
            margin="auto auto auto 30px"
            width="111"
            height="30"
          />
          <LogosContainer>
            <StyledSearchLogo
              className="clickable"
              color={showAboutUs ? Colors.white : Colors.black}
              onClick={() => setShowSearch(true)}
            />
            {Cart}
          </LogosContainer>
        </NavContainer>
        ;
        <Sidebar side="left" isOpen={isOpen} onClose={() => toggle()}>
          <LinksContainer>
            {mobileNavRoutes.map((route, index) => {
              if (route.path === '/collections')
                return (
                  <PlusMInusOpen
                    key={index}
                    label={route.name}
                    items={collections.map((c) => c.title.toUpperCase())}
                    handleLinkClick={(index) => {
                      toggle();
                      handleLinkClick(
                        `/products/${collections[index]?.id.replace('gid://shopify/Collection/', '')}`,
                      );
                    }}
                  />
                );
              if (route.path === '/material')
                return (
                  <PlusMInusOpen
                    key={index}
                    label={route.name}
                    items={materialCollections.map((c) =>
                      c.title.toUpperCase(),
                    )}
                    handleLinkClick={(index) => {
                      toggle();
                      handleLinkClick(
                        `/products/${materialCollections[index]?.id.replace('gid://shopify/Collection/', '')}`,
                      );
                    }}
                  />
                );

              return (
                <div
                  style={{ paddingBottom: '10px' }}
                  className="clickable"
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
                className="clickable"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
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
        <CommandBar
          isOpen={showSearch}
          onClose={() => setShowSearch(false)}
          onSearch={onSearchProducts}
        />
      </>
    );
  }

  let timer: NodeJS.Timeout;
  return (
    <>
      <Announcements />
      <NavContainer
        showTransparent={showTransparent}
        showAboutUs={showAboutUs}
        showCollection={showCollection}
        hasAnnouncements={hasAnnouncements}
      >
        <StyledMyahaLogo
          className="clickable"
          onClick={() => router.push('/')}
          showAboutUs={showAboutUs}
          width={'166.5'}
          height={'45'}
          showTransparent={showTransparent}
        />
        <LinksContainer
          showTransparent={showTransparent}
          showAboutUs={showAboutUs}
          showCollection={showCollection}
        >
          {navRoutes.map((route, index) => {
            if (route.path === '/products') {
              return (
                <div
                  className="clickable hover_underline"
                  onMouseEnter={() => {
                    setShowCollection(true);
                    setShowAboutUs(false);
                    clearTimeout(timer);
                  }}
                  onMouseLeave={() => {
                    timer = setTimeout(() => setShowCollection(false), 500);
                  }}
                >
                  {route.name}
                </div>
              );
            }
            if (route.path === '/about-us') {
              return (
                <div
                  className="clickable hover_underline"
                  onMouseEnter={() => {
                    setShowAboutUs(true);
                    setShowCollection(false);
                    clearTimeout(timer);
                  }}
                  onClick={() => {
                    if (showAboutUs) {
                      setShowAboutUs(false);
                    }
                    handleLinkClick(route.path);
                  }}
                  onMouseLeave={() => {
                    timer = setTimeout(() => setShowAboutUs(false), 500);
                  }}
                >
                  {route.name}
                </div>
              );
            }
            return (
              <div
                className="clickable hover_underline"
                onClick={() => handleLinkClick(route.path)}
                key={index}
              >
                {route.name}
              </div>
            );
          })}
        </LinksContainer>
        <LogosContainer>
          <StyledSearchLogo
            className="clickable"
            color={showTransparent || showAboutUs ? Colors.white : Colors.black}
            onClick={() => setShowSearch(true)}
          />

          {!user ? (
            <StyledUserLogo
              className="clickable"
              color={
                showTransparent || showAboutUs ? Colors.white : Colors.black
              }
              onClick={toggleLogin}
            />
          ) : (
            <StyledUserLogo
              className="clickable"
              color={
                showTransparent || showAboutUs ? Colors.white : Colors.black
              }
              onClick={() => router.push('/account')}
            />
          )}
          {Cart}
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
              height: showCollection ? '80px' : '450px',
              backgroundColor: showAboutUs ? '#5F1E1E' : Colors.white,
              position: 'absolute',
              top: '80px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              overflowX: 'auto',
            }}
          >
            {showCollection ? (
              <Collections toggle={() => setShowCollection(false)} />
            ) : (
              <AboutUs toggle={() => setShowAboutUs(false)} />
            )}
          </div>
        )}
        <CommandBar
          isOpen={showSearch}
          onClose={() => setShowSearch(false)}
          onSearch={onSearchProducts}
        />
      </NavContainer>
    </>
  );
};

export default Navbar;
