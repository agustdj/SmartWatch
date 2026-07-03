export default function CartSummary({ items, onCheckout, onClear }) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;
  return (
    <div className="card shadow-sm sticky-top">
      <div className="card-body">
        <h4>Order Summary</h4>
        <hr />
        <div className="summary-row">
          <span>Items</span>
          <strong>{totalItems}</strong>
        </div>
        <div className="summary-row">
          <span>Subtotal</span>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <strong>${shipping.toFixed(2)}</strong>
        </div>
        <hr />
        <div className="summary-row total">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
        <button className="btn btn-dark w-100 mt-4" onClick={onCheckout}>
          Checkout
        </button>
        <button className="btn btn-outline-danger w-100 mt-2" onClick={onClear}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}
