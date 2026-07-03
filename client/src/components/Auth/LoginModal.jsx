import { useEffect, useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { toast } from "react-toastify";

import { login as loginApi } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function LoginModal({ show, onClose, onShowRegister }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [show, onClose]);
  if (!show) return null;
  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toast.warning("Please enter your email and password.");
      return;
    }
    try {
      setLoading(true);
      const res = await loginApi({
        email,
        password,
      });
      login(res.data.user, res.data.token);
      toast.success("Login successfully!");
      resetForm();
      onClose();
    } catch (err) {
      resetForm();
      toast.error(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content shadow-lg border-0 rounded-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header border-0 position-relative">
              <h4 className="modal-title fw-bold w-100 text-center mb-0">
                Welcome Back 👋
              </h4>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body p-4">
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text">
                    <FiMail />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text">
                    <FiLock />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLogin();
                      }
                    }}
                  />
                </div>
              </div>
              <button
                className="btn btn-dark w-100 py-2"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <div className="text-center mt-4">
                <small>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none"
                    onClick={onShowRegister}
                  >
                    Register
                  </button>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose} />
    </>
  );
}
