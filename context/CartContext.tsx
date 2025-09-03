'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

// sessionUtil.js

const CART_KEY = 'cart';

// Function to retrieve the cart from session storage
const getCart = (): {
  variant_id: string;
  quantity: number;
  inventoryId: string;
}[] => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

// Function to clear the cart from session storage
const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

// Function to update the cart in session storage
const addLineItem = ({
  variant_id,
  inventoryId,
}: {
  variant_id: string;
  inventoryId: string;
}) => {
  const cartItems = getCart();
  let updatedCart = cartItems.map((item) => {
    if (item.variant_id === variant_id) {
      return { ...item, quantity: item.quantity + 1 };
    }
    return item;
  });
  if (!updatedCart.some((item) => item.variant_id === variant_id)) {
    updatedCart = [
      ...updatedCart,
      { variant_id: variant_id, quantity: 1, inventoryId },
    ];
  }
  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
};

const addLineItemWIthCount = ({
  variant_id,
  inventoryId,
  count,
}: {
  variant_id: string;
  count: number;
  inventoryId: string;
}) => {
  const cartItems = getCart();
  let updatedCart = cartItems.map((item) => {
    if (item.variant_id === variant_id) {
      return { ...item, quantity: count };
    }
    return item;
  });
  if (!updatedCart.some((item) => item.variant_id === variant_id)) {
    updatedCart = [
      ...updatedCart,
      { variant_id: variant_id, quantity: count, inventoryId },
    ];
  }
  localStorage.setItem(
    CART_KEY,
    JSON.stringify(updatedCart.filter((item) => item.quantity > 0)),
  );
};

const removeLineItem = (variant_id: string) => {
  const cartItems = getCart();
  const updatedCart = cartItems
    .map((item) => {
      if (item.variant_id === variant_id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    })
    .filter((item) => item.quantity > 0);
  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
};

interface CartContextType {
  cart: { variant_id: string; quantity: number; inventoryId: string }[];
  addItem: (params: { variant_id: string; inventoryId: string }) => void;
  removeItem: (variant_id: string) => void;
  clear: () => void;
  setVariantCount: (params: {
    variant_id: string;
    inventoryId: string;
    count: number;
  }) => void;
  toggleCart: () => void;
  buyNow: (variant_id: string, inventoryId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] =
    useState<{ variant_id: string; quantity: number; inventoryId: string }[]>(
      getCart(),
    );

  useEffect(() => {
    const handleStorageChange = () => {
      setCart(getCart());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addItem = ({
    variant_id,
    inventoryId,
  }: {
    variant_id: string;
    inventoryId: string;
  }) => {
    addLineItem({ variant_id, inventoryId });
    setCart(getCart());
  };

  const removeItem = (variant_id: string) => {
    removeLineItem(variant_id);
    setCart(getCart());
  };

  const setVariantCount = ({
    variant_id,
    count,
    inventoryId,
  }: {
    variant_id: string;
    inventoryId: string;
    count: number;
  }) => {
    addLineItemWIthCount({ variant_id, count, inventoryId });
    setCart(getCart());
  };

  const buyNow = (variant_id: string, inventoryId: string) => {
    const cartItems = getCart();
    const updatedCart =
      cartItems?.filter((item) => item.variant_id === variant_id) ?? [];
    if (updatedCart.length === 0) {
      updatedCart.push({ variant_id, quantity: 1, inventoryId });
    }
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    setCart(getCart());
  };

  const clear = () => {
    clearCart();
    setCart([]);
  };

  const searchParams = useSearchParams();
  const router = useRouter();

  const toggleCart = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('cart', 'true');
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clear,
        setVariantCount,
        toggleCart,
        buyNow,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
