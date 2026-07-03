import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function Cart({
  items,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
  onCheckout,
}) {
  const navigate = useNavigate();
  return (
    <section className="cart-page py-5">
      <div className="container">
        {items.length === 0 ? (
          <div className="cart-empty">
            <hr />
            <h4>Your cart is empty 🛒</h4>
            <hr />
          </div>
        ) : (
          <div className="row">
            <h2 className="mb-4">Shopping Cart</h2>
            <div className="col-lg-8">
              {items.map((item) => (
                <CartItem
                  key={item.product._id}
                  item={item}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onRemove={onRemove}
                />
              ))}
            </div>
            <div className="col-lg-4">
              <CartSummary
                items={items}
                onCheckout={onCheckout}
                onClear={onClear}
              />
              <hr />
              <div>
                <button
                  className="btn btn-outline-dark d-inline-flex align-items-center gap-2"
                  onClick={() => navigate(-1)}
                >
                  <FiArrowLeft />
                  Back
                </button>{" "}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
