import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add items to the cart with size, color, and quantity
  const addToCart = (product, size = 'M', color = 'Default', quantity = 1) => {
    // Ensure quantity is a valid number and at least 1
    const validQuantity = Number.isInteger(quantity) && quantity > 0 ? quantity : 1;

    setCartItems((prevCartItems) => {
      // Use _id, size, and color to ensure uniqueness
      const existingItem = prevCartItems.find(
        (item) =>
          item._id === product._id &&
          item.size === size &&
          item.color === color
      );

      if (existingItem) {
        toast.info(`${product.name} (${size}, ${color}) quantity increased!`, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return prevCartItems.map((item) =>
          item._id === product._id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + validQuantity }
            : item
        );
      } else {
        toast.success(`${product.name} (${size}, ${color}) added to cart!`, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return [
          ...prevCartItems,
          { ...product, size, color, quantity: validQuantity },
        ];
      }
    });
  };

  // Function to remove items from the cart
  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item._id !== productId)
    );
  };

  // Function to update the size, color, and quantity of an item in the cart
  const updateCartItem = (productId, updates) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item._id === productId ? { ...item, ...updates } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};