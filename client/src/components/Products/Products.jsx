import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Products.css";

import { getProducts } from "../../services/productService";
import { useCart } from "../../hooks/useCart";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleAddToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data.data || []);
    } catch (error) {
      console.error("Get products failed:", error);
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const onAddToCart = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await handleAddToCart(productId);
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
      <section className="products section-padding">
        <div className="container text-center">
          <Skeleton height={180} />
          <Skeleton count={2} />
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="products section-padding">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">
            Explore our latest smartwatch collection.
          </p>
        </div>
        <div className="row g-4">
          {products.map((product) => (
            <div className="col-lg-4 col-md-6" key={product._id}>
              <Link
                to={`/product/${product._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="product-card">
                  <div className="product-image">
                    {product.badge && (
                      <span className="product-badge">{product.badge}</span>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="img-fluid"
                    />
                    <div className="product-overlay">
                      <button
                        className="btn btn-light"
                        onClick={(e) => onAddToCart(e, product._id)}
                      >
                        <i className="bi bi-cart-plus me-2"></i>
                        Add To Cart
                      </button>
                    </div>
                  </div>
                  <div className="product-content">
                    <h4>{product.name}</h4>
                    <h5>${product.price}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/* {!loading && products.length === 0 && (
          <div className="text-center mt-5">
            <h5>No products found.</h5>
          </div>
        )} */}
      </div>
    </section>
  );
}
