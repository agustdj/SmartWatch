import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import LoginModal from "./components/Auth/LoginModal";
import RegisterModal from "./components/Auth/RegisterModal";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { AuthModalProvider, useAuthModal } from "./context/AuthModalContext";

function AppContent() {
  const { showLogin, showRegister, closeAuthModal, openRegister, openLogin } =
    useAuthModal();

  return (
    <ThemeProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <LoginModal
          show={showLogin}
          onClose={closeAuthModal}
          onShowRegister={openRegister}
        />

        <RegisterModal
          show={showRegister}
          onClose={closeAuthModal}
          onShowLogin={openLogin}
        />

        <ToastContainer
          position="top-right"
          autoClose={2500}
          pauseOnHover
          theme="light"
        />
      </CartProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthModalProvider>
        <AppContent />
      </AuthModalProvider>
    </AuthProvider>
  );
}
