import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const { product, quantity } = item;
  return (
    <div className="card cart-item shadow-sm mb-3">
      <div className="card-body d-flex align-items-center">
        <img src={product.image} alt={product.name} className="cart-image" />
        <div className="flex-grow-1 ms-4">
          <h5>{product.name}</h5>
          <p className="text-muted mb-2">${product.price}</p>
          <div className="quantity-box">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => onDecrease(product._id)}
            >
              <FiMinus />
            </button>
            <span>{quantity}</span>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => onIncrease(product._id)}
            >
              <FiPlus />
            </button>
          </div>
        </div>
        <div className="text-end">
          <h5 className="mb-3">${(product.price * quantity).toFixed(2)}</h5>
          <button
            className="btn btn-outline-danger"
            onClick={() => onRemove(product._id)}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
}
