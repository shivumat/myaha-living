'use client';
import { useAuth } from '#/context/AuthContext';
import OrderList from '#/ui/account/OrderList';
import Sidebar from '#/ui/account/Sidebar';
import Userform from '#/ui/account/Userform';
import newStyled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Container = newStyled.div`
  display: flex;
  min-height: 100vh;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;

const ProfileDetails = () => {
  const [index, setIndex] = useState(0);
  const { userDetails } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userDetails) {
      router.push('/');
      return;
    }
  }, [userDetails]);
  return (
    <Container>
      {index === 0 && <OrderList />}
      {index === 1 && <Userform />}
      <Sidebar index={index} setIndex={setIndex} />
    </Container>
  );
};

export default ProfileDetails;
