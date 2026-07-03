import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { updateCart, removeCartItem, clearCart } from "../services/cartService";
import { useCartContext } from "../context/CartContext";

import Cart from "../components/Cart/Cart";

export default function CartPage() {
  const navigate = useNavigate();

  const { cart, loading, fetchCart } = useCartContext();

  const increaseQuantity = async (productId) => {
    try {
      const item = cart.items.find((i) => i.product._id === productId);
      if (!item) return;
      await updateCartItem(productId, item.quantity + 1);
      await fetchCart();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cannot update quantity.");
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      const item = cart.items.find((i) => i.product._id === productId);
      if (!item) return;
      if (item.quantity === 1) {
        await removeCartItem(productId);
      } else {
        await updateCartItem(productId, item.quantity - 1);
      }

      await fetchCart();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cannot update quantity.");
    }
  };

  const removeItem = async (productId) => {
    try {
      await removeCartItem(productId);
      toast.success("Item removed.");
      await fetchCart();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cannot remove item.");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      toast.success("Cart cleared.");
      await fetchCart();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cannot clear cart.");
    }
  };

  const handleCheckout = () => {
    if (!cart.items.length) {
      toast.warning("Your cart is empty.");
      return;
    }
    toast.error("Cannot checkout");
    //navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <Skeleton height={180} />
        <Skeleton count={2} />
      </div>
    );
  }

  return (
    <Cart
      items={cart.items}
      onIncrease={increaseQuantity}
      onDecrease={decreaseQuantity}
      onRemove={removeItem}
      onClear={handleClearCart}
      onCheckout={handleCheckout}
    />
  );
}
