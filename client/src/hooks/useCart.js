import { useAuth } from "../context/AuthContext";
import { useAuthModal } from "../context/AuthModalContext";
import { useCartContext } from "../context/CartContext";
import { addToCart } from "../services/cartService";

export function useCart() {
  const { isLoggedIn } = useAuth();
  const { openLogin } = useAuthModal();
  const { fetchCart } = useCartContext();

  const handleAddToCart = async (productId, quantity = 1) => {
    if (!isLoggedIn) {
      openLogin();
      return {
        success: false,
        requireLogin: true,
        message: "Please login to continue.",
      };
    }

    try {
      const res = await addToCart(productId, quantity);
      await fetchCart();
      return {
        success: true,
        requireLogin: false,
        data: res.data,
        message: res.data?.message || "Added to cart successfully!",
      };
    } catch (err) {
      return {
        success: false,
        requireLogin: false,
        message: err.response?.data?.message || "Add to cart failed.",
      };
    }
  };

  return {
    handleAddToCart,
  };
}
