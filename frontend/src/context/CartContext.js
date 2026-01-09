import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ADD OR INCREASE
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (p) => p._id === item._id && p.variant === item.variant
      );

      if (existing) {
        return prev.map((p) =>
          p._id === item._id && p.variant === item.variant
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  // INCREASE QTY
  const increaseQty = (_id, variant) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p._id === _id && p.variant === variant
          ? { ...p, qty: p.qty + 1 }
          : p
      )
    );
  };

  // DECREASE QTY
  const decreaseQty = (_id, variant) => {
    setCartItems((prev) =>
      prev
        .map((p) =>
          p._id === _id && p.variant === variant
            ? { ...p, qty: p.qty - 1 }
            : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
