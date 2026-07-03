import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../services/cartService";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { isLoggedIn } = useAuth();
  const [cart, setCart] = useState({
    items: [],
  });

  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!isLoggedIn) {
      setCart({ items: [] });
      return;
    }
    try {
      setLoading(true);
      const res = await getCart();
      setCart(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isLoggedIn]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
