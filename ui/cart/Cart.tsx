'use client';
import { useCart } from '#/context/CartContext';
import { useProduct } from '#/context/ProductContext';
import { useIsMobile } from '#/hooks/useMobile';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Colors from '../colors/colors';
import CartItem from '../components/CartItem';
import Sidebar from '../components/Sidebar';

const Cart = () => {
  const [hasCart, setHasCart] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const isMobile = useIsMobile();
  const { products } = useProduct();

  useEffect(() => {
    setHasCart(searchParams.has('cart'));
  }, [searchParams]);

  const { cart } = useCart();
  useProduct();

  const toggle = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('cart');
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const EmptyScreen = (
    <div
      style={{
        width: '100%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        padding: '40px 20px',
        color: Colors.white,
        backgroundColor: '#5B1D1D',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '22px', fontWeight: '500' }}>
        You haven’t added anything in the cart yet.
      </div>
      <div style={{ fontSize: '16px', fontWeight: '300', opacity: 0.9 }}>
        Explore our selection of premium products and place your first order
        today.
      </div>
      <button
        style={{
          marginTop: '10px',
          backgroundColor: 'transparent',
          color: Colors.white,
          fontSize: '16px',
          fontWeight: '500',
          padding: '10px 20px',
          borderRadius: '8px',
          border: `1px solid ${Colors.white}`,
          cursor: 'pointer',
          transition: 'background 0.3s',
        }}
        onClick={() => router.push('/products')}
      >
        Browse Products
      </button>
    </div>
  );

  return (
    <Sidebar
      isOpen={hasCart}
      onClose={toggle}
      side="right"
      width={isMobile ? '85%' : '40%'}
      title="Cart"
    >
      {cart.length === 0 ? (
        EmptyScreen
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxHeight: '90vh',
            margin: '20px 0px',
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxHeight: '80%',
              margin: '30px 0px',
              overflowY: 'auto',
            }}
          >
            {cart.map((item) => {
              const product = products.find((product) =>
                product.variants.some((variant) =>
                  variant.id.includes(item.variant_id),
                ),
              );
              if (!product) return null;
              const variants = product.variants.filter((variant) =>
                variant.id.includes(item.variant_id),
              );
              return (
                <CartItem
                  key={item.variant_id}
                  product={{ ...product, variants }}
                  showAddtoCart
                />
              );
            })}
          </div>
          <button
            style={{
              marginTop: 'auto',
              backgroundColor: 'black',
              color: Colors.white,
              fontSize: '16px',
              fontWeight: '500',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.3s',
              border: `1px solid ${Colors.white}`,
            }}
            onClick={() => router.push('/checkout')}
            className="clickable"
          >
            Checkout
          </button>
          <button
            style={{
              marginTop: '0px',
              backgroundColor: 'transparent',
              color: 'black',
              fontSize: '16px',
              fontWeight: '500',
              padding: '10px 20px',
              borderRadius: '8px',
              border: `1px solid ${Colors.black}`,
              cursor: 'pointer',
              transition: 'background 0.3s',
            }}
            onClick={toggle}
            className="clickable"
          >
            Continue shopping
          </button>
        </div>
      )}
    </Sidebar>
  );
};

export default Cart;
