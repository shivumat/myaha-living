import { useAuth } from '#/context/AuthContext';
import { useCart } from '#/context/CartContext';
import { Product, Products, useProduct } from '#/context/ProductContext';
import { useIsDesktopHomeOnTop } from '#/hooks/useIsDesktopHomeOnTop';
import { useIsMobile } from '#/hooks/useMobile';
import { useToggle } from '#/hooks/useToggle';
import { navRoutes } from '#/lib/constants/routes';
import newStyled from '@emotion/styled';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Dropdown } from '../components/Dropdown';
import PlusMInusOpen from '../components/PlusMInusOpen';
import ProductDropdownItem from '../components/ProductDropDownItem';
import SearchInput from '../components/SearchInput';
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
}>`
  margin: 0;
  padding: 0;
  display: flex; 
  width: 100vw;
  height: 60px;
  background-color: ${({ showTransparent, showAboutUs }) => (showTransparent ? 'transparent' : showAboutUs ? '#5F1E1E' : 'white')};
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

const LogosContainer = newStyled.div<{ showTransparent?: boolean }>`
  display: ${({ showTransparent }) => (showTransparent ? 'none' : 'flex')};
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
    display: flex
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

const StyledSearchLogo = newStyled(SearchLogo)<{ showTransparent?: boolean }>`
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
  ${({ showAboutUs, showTransparent }) => (!(showAboutUs || showTransparent) ? 'filter: invert(1);' : '')}
  ${({ margin = '' }) => (!!margin ? `margin: ${margin};` : '')}
  ${({ showTransparent }) =>
    showTransparent
      ? `transform: scale(1.2); &.clickable:hover {
                                              transform: scale(1.3);
                                            }`
      : ''}
`;

const Navbar = () => {
  const isMobile = useIsMobile();
  const { isOpen, toggle } = useToggle();
  const router = useRouter();
  const [showCollection, setShowCollection] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState<Products>([]);
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

  const { cart } = useCart();

  const totalCartItem = cart.reduce((acc, item) => acc + item.quantity, 0);

  const { collections, onSearchProducts } = useProduct();

  const Cart = (
    <div style={{ position: 'relative' }} onClick={toggleCart}>
      {totalCartItem > 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: isMobile ? '10px' : '16px',
            height: isMobile ? '10px' : '16px',
            border: `1px solid ${showAboutUs ? 'white' : 'black'}`,
            fontSize: isMobile ? '5px' : '8px',
            padding: '2px',
            borderRadius: '50%',
            backgroundColor: showAboutUs ? '#5F1E1E' : 'white',
            zIndex: 20,
            right: isMobile ? '2px' : '-3px',
            ...(isMobile ? {} : { top: '-3px' }),
            position: 'absolute',
          }}
        >
          {totalCartItem}
        </div>
      ) : null}
      <StyledCartLogo
        className="clickable"
        color={showAboutUs ? 'white' : 'black'}
      />
    </div>
  );

  if (isMobile) {
    return (
      <>
        <NavContainer>
          <Burger onClick={() => toggle()}>☰</Burger>
          <StyledMyahaLogo
            className="clickable"
            onClick={() => router.push('/')}
            margin="auto 0px auto auto"
            width="111"
            height="30"
          />
          <LogosContainer>
            <Dropdown
              maxHeight="400px"
              onClose={() => {
                setSearchedProducts([]);
              }}
              options={searchedProducts}
              onSelect={(item: Product) =>
                router.push(
                  `/product/${item.id.replace('gid://shopify/Product/', '')}`,
                )
              }
              renderTrigger={(toggle: any) => (
                <StyledSearchLogo
                  className="clickable"
                  color={showAboutUs ? 'white' : 'black'}
                  onClick={toggle}
                />
              )}
              renderOption={(option: Product) => (
                <ProductDropdownItem product={option} />
              )}
            >
              <SearchInput
                onSearch={(searchValue) => {
                  const productsonSearch = onSearchProducts(searchValue);
                  setSearchedProducts(productsonSearch);
                }}
              />
            </Dropdown>
            {Cart}
          </LogosContainer>
        </NavContainer>
        ;
        <Sidebar
          title={
            <StyledMyahaLogo
              className="clickable"
              onClick={() => {
                toggle();
                router.push('/');
              }}
              margin="auto"
              width="96.75"
              height="30"
            />
          }
          side="left"
          isOpen={isOpen}
          onClose={() => toggle()}
        >
          <LinksContainer>
            {navRoutes.map((route, index) => {
              if (route.path === '/products')
                return (
                  <PlusMInusOpen
                    key={index}
                    label="Shop"
                    items={['Shop all', ...collections.map((c) => c.title)]}
                    handleLinkClick={(index) => {
                      toggle();
                      handleLinkClick(
                        index === 0
                          ? '/products'
                          : `/products/${collections[index + 1]?.id.replace('gid://shopify/Collection/', '')}`,
                      );
                    }}
                  />
                );
              return (
                <div
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
        {showTransparent && (
          <Burger style={{ filter: 'invert(1)' }} onClick={() => toggle()}>
            ☰
          </Burger>
        )}
        <StyledMyahaLogo
          className="clickable"
          onClick={() => router.push('/')}
          showAboutUs={showAboutUs}
          width={showTransparent ? '111' : '99'}
          height={showTransparent ? '30' : '27'}
          showTransparent={showTransparent}
        />
        {!showTransparent && (
          <LinksContainer>
            {navRoutes.map((route, index) => {
              if (route.path === '/products') {
                return (
                  <div
                    className="clickable"
                    onMouseEnter={() => {
                      setShowCollection(true);
                      setShowAboutUs(false);
                      clearTimeout(timer);
                    }}
                    onMouseLeave={() => {
                      timer = setTimeout(() => setShowCollection(false), 500);
                    }}
                    onClick={() => {
                      handleLinkClick(route.path);
                    }}
                  >
                    {showCollection ? 'Shop all' : 'Shop'}
                  </div>
                );
              }
              if (route.path === '/about-us') {
                return (
                  <div
                    className="clickable"
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
                    About Us
                  </div>
                );
              }
              return (
                <div
                  className="clickable"
                  onClick={() => handleLinkClick(route.path)}
                  key={index}
                >
                  {route.name}
                </div>
              );
            })}
          </LinksContainer>
        )}
        <LogosContainer showTransparent={showTransparent}>
          <Dropdown
            maxHeight="400px"
            onClose={() => {
              setSearchedProducts([]);
            }}
            options={searchedProducts}
            onSelect={(item: Product) =>
              router.push(
                `/product/${item.id.replace('gid://shopify/Product/', '')}`,
              )
            }
            renderTrigger={(toggle: any) => (
              <StyledSearchLogo
                className="clickable"
                color={showAboutUs ? 'white' : 'black'}
                onClick={(e: any) => {
                  toggle(e);
                }}
              />
            )}
            renderOption={(option: Product) => (
              <ProductDropdownItem product={option} />
            )}
          >
            <SearchInput
              onSearch={(searchValue) => {
                const productsonSearch = onSearchProducts(searchValue);
                setSearchedProducts(productsonSearch);
              }}
            />
          </Dropdown>

          {!showTransparent &&
            (!user ? (
              <StyledUserLogo
                className="clickable"
                color={showAboutUs ? 'white' : 'black'}
                onClick={toggleLogin}
              />
            ) : (
              <StyledUserLogo
                className="clickable"
                color={showAboutUs ? 'white' : 'black'}
                onClick={() => router.push('/account')}
              />
            ))}
          {!showTransparent && Cart}
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
              height: '450px',
              backgroundColor: showAboutUs ? '#5F1E1E' : 'white',
              position: 'absolute',
              top: '60px',
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
      </NavContainer>
    </>
  );
};

export default Navbar;
