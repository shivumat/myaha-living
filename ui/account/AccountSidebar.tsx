import { useAuth } from '#/context/AuthContext';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import OrderLogo from '../svg/order-logo';
import SignInLogo from '../svg/sign-in-logo';
import UserLogo from '../svg/user-logo';

const SidebarContainer = newStyled.div`
    width: 400px;
    background-color: #192211;
    color: white;
    padding: 40px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    @media (max-width: 1200px) {
        width: 100%;
        padding: 10px 50px;
    }
`;

const AccountSidebar = (props: {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}) => {
  const router = useRouter();
  const { userDetails, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <SidebarContainer>
      <div
        style={{
          margin: '60px 0px',
          borderRadius: '10px',
          width: '100%',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <img src="/images/dp.png" />
        <div style={{ color: 'black' }}>
          {userDetails?.firstName ?? userDetails?.email}
        </div>
        <div
          onClick={() => props.setIndex(0)}
          style={{
            padding: '30px',
            cursor: 'pointer',
            height: '60px',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: props.index === 0 ? 'lightgray' : 'white',
          }}
        >
          <OrderLogo />{' '}
          <span style={{ color: 'black', marginLeft: '10px' }}>
            Orders history
          </span>
        </div>
        <div
          onClick={() => props.setIndex(1)}
          style={{
            padding: '30px',
            cursor: 'pointer',
            height: '60px',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '5px',
            backgroundColor: props.index === 1 ? 'lightgray' : 'white',
          }}
        >
          <UserLogo />{' '}
          <span style={{ color: 'black', marginLeft: '10px' }}>
            Profile details
          </span>
        </div>
        <div
          onClick={handleLogout}
          style={{
            marginTop: '10px',
            padding: '30px',
            cursor: 'pointer',
            height: '60px',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <SignInLogo />{' '}
          <span style={{ color: 'black', marginLeft: '10px' }}>Log out</span>
        </div>
      </div>
    </SidebarContainer>
  );
};

export default AccountSidebar;
