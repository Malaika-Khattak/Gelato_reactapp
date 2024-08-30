import React, { createContext, useState } from "react";

export const Cartcontext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, quantity) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem._id !== item._id)
    );
  };
  const updateCart = (updatedItem) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === updatedItem._id ? updatedItem : item
      )
    );
  };

  return (
    <Cartcontext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCart }}
    >
      {children}
    </Cartcontext.Provider>
  );
};
