import { useAuth } from '#/context/AuthContext';
import { useProduct } from '#/context/ProductContext';
import { useToast } from '#/context/ToastContext';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Colors from './colors/colors';
import Modal from './components/ModalComponent';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.white};
  border-radius: 12px;
  width: 50%;
  height: auto;
  padding: 40px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  @media (max-width: 1000px) {
    width: 80%;
    padding: 30px;
  }
  @media (max-width: 800px) {
    width: 90%;
    padding: 20px;
  }
`;

const Card = styled.div`
  width: 100%;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #652821;
  margin-bottom: 8px;
`;

const Message = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 12px;
`;

const ReferenceCode = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #444;
  background: #f3f3f3;
  padding: 8px 16px;
  border-radius: 8px;
  margin: 10px 0;
`;

const OrderCreated = (props: {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
}) => {
  const { userDetails } = useAuth();
  const [referennceId, setReferenceId] = useState('');

  const fetchOrderDetails = async (orderId: string) => {
    // Fetch order details
    const data = await fetch('/api/order/getOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: orderId }),
    });
    const { orderDetails } = await data.json();
    setReferenceId(orderDetails.shopifyOrderId);
  };

  const { stopLoading } = useToast();
  const { fetchData } = useProduct();

  useEffect(() => {
    if (!props.orderId) return;
    fetchData();
    stopLoading();
    fetchOrderDetails(props.orderId);
  }, [props.orderId]);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Card>
          <Title>
            Thank You {userDetails?.firstName ?? userDetails?.email ?? ''}!
          </Title>
          <Message>
            Your order has been successfully created with <strong>Myaha</strong>
            .
          </Message>
          <Message>
            We’ll be reaching out to you soon with more details.
          </Message>
          {!!referennceId && (
            <ReferenceCode>Order Ref: {referennceId}</ReferenceCode>
          )}
        </Card>
      </Container>
    </Modal>
  );
};

export default OrderCreated;
