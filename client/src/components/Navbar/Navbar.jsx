import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";
import "./Navbar.css";
import logo from "../../assets/images/sw-logo.webp";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useAuth } from "../../context/AuthContext";
import { useAuthModal } from "../../context/AuthModalContext";
import { useCartContext } from "../../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const { openLogin } = useAuthModal();
  const { cart } = useCartContext();
  const [open, setOpen] = useState(false);
  const totalQuantity = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const handleCartClick = (e) => {
    e?.preventDefault();
    if (!isLoggedIn) {
      openLogin();
      return;
    }
    navigate("/cart");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully!");
    navigate("/");
  };

  return (
    <header className="navbar-container">
      <div className="container navbar-content">
        <a href="/" className="logo">
          <img src={logo} alt="SmartWatch" loading="lazy" />
        </a>
        <nav className={open ? "nav-menu active" : "nav-menu"}>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
          <a href="#account" id="account">
            Account
          </a>
          <a href="#cart" id="cart" onClick={handleCartClick}>
            Cart
          </a>
        </nav>
        <div className="nav-icons">
          <ThemeToggle />
          <div
            className="cart-icon"
            onClick={handleCartClick}
            style={{ cursor: "pointer" }}
          >
            <FiShoppingCart size={22} />
            {totalQuantity > 0 && <span>{totalQuantity}</span>}
          </div>
          {!isLoggedIn ? (
            <FiUser
              size={22}
              style={{ cursor: "pointer" }}
              onClick={openLogin}
            />
          ) : (
            <div className="user-dropdown">
              <FiUser
                size={22}
                className="user-icon"
                style={{ cursor: "pointer" }}
              />
              <div className="user-dropdown-menu">
                <div className="user-header">
                  <strong>{user?.name}</strong>
                  <small>{user?.email}</small>
                </div>
                <hr />
                <button className="logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>
    </header>
  );
}
