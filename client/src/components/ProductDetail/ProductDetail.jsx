import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./ProductDetail.css";

import { getProductById } from "../../services/productService";
import { useCart } from "../../hooks/useCart";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { handleAddToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await getProductById(id);
      setProduct(res.data.data);
    } catch (error) {
      console.error("Get product failed:", error);
      toast.error("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  const onAddToCart = async () => {
    const result = await handleAddToCart(product._id);
    if (result.success) {
      toast.success(result.message);
      return;
    }
    if (!result.requireLogin) {
      toast.error(result.message);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <Skeleton height={180} />
        <Skeleton count={2} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h4>Product not found.</h4>
      </div>
    );
  }

  return (
    <section className="product-detail py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="detail-image">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid"
              />
            </div>
            <div className="d-flex gap-3 my-4 justify-content-end">
              <button
                className="btn btn-outline-dark d-inline-flex align-items-center gap-2"
                onClick={() => navigate(-1)}
              >
                <FiArrowLeft />
                Back
              </button>
              <button className="btn btn-dark btn-lg" onClick={onAddToCart}>
                Add To Cart
              </button>
            </div>
          </div>
          <div className="col-lg-6">
            {product.badge && (
              <span className="badge bg-primary mb-3">{product.badge}</span>
            )}
            <h1 className="mb-3">{product.name}</h1>
            <h2 className="price mb-4">${product.price}</h2>
            <p className="description">{product.description}</p>
            <hr />
            <h4 className="mb-4">Specifications</h4>
            <table className="table table-borderless spec-table">
              <tbody>
                {product.specifications?.map((spec) => (
                  <tr key={spec._id}>
                    <td>{spec.name}</td>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
