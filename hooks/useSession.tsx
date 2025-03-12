'use client';
import { useEffect, useState } from 'react';

// sessionUtil.js

const CART_KEY = 'cart';

// Function to retrieve the cart from session storage
const getCart = (): { variant_id: string; quantity: number }[] => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

// Function to clear the cart from session storage
const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

// Function to update the cart in session storage
const addLineItem = (varient_id: string) => {
  const cartItems = getCart();
  let updatedCart = cartItems.map((item) => {
    if (item.variant_id === varient_id) {
      return { ...item, quantity: item.quantity + 1 };
    }
    return item;
  });
  if (!updatedCart.some((item) => item.variant_id === varient_id)) {
    updatedCart = [...updatedCart, { variant_id: varient_id, quantity: 1 }];
  }
  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
};

const addLineItemWIthCount = (varient_id: string, count: number) => {
  const cartItems = getCart();
  let updatedCart = cartItems.map((item) => {
    if (item.variant_id === varient_id) {
      return { ...item, quantity: count };
    }
    return item;
  });
  if (!updatedCart.some((item) => item.variant_id === varient_id)) {
    updatedCart = [...updatedCart, { variant_id: varient_id, quantity: count }];
  }
  localStorage.setItem(
    CART_KEY,
    JSON.stringify(updatedCart.filter((item) => item.quantity > 0)),
  );
};

const removeLineItem = (varient_id: string) => {
  const cartItems = getCart();
  const updatedCart = cartItems
    .map((item) => {
      if (item.variant_id === varient_id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    })
    .filter((item) => item.quantity > 0);
  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
};

const useCart = () => {
  const [cart, setCart] =
    useState<{ variant_id: string; quantity: number }[]>(getCart());

  useEffect(() => {
    const handleStorageChange = () => {
      setCart(getCart());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addItem = (variant_id: string) => {
    addLineItem(variant_id);
    setCart(getCart());
  };

  const removeItem = (variant_id: string) => {
    removeLineItem(variant_id);
    setCart(getCart());
  };

  const setVariantCount = (variant_id: string, count: number) => {
    addLineItemWIthCount(variant_id, count);
    setCart(getCart());
  };

  const clear = () => {
    clearCart();
    setCart([]);
  };

  return {
    cart,
    addItem,
    removeItem,
    clear,
    setVariantCount,
  };
};

export default useCart;
