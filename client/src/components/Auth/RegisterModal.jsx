import { useEffect, useState } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { toast } from "react-toastify";

import { register } from "../../services/authService";

export default function RegisterModal({ show, onClose, onShowLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password.trim() ||
      !form.confirmPassword.trim()
    ) {
      toast.warning("Please fill all fields.");
      return;
    }

    if (!form.email.toLowerCase().endsWith("@gmail.com")) {
      toast.warning("Please use a Gmail address.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.warning("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      toast.success(res.data.message || "Register successfully!");
      resetForm();
      onShowLogin();
    } catch (err) {
      toast.error(err.response?.data?.message || "Register failed.");
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
                Create Account 🚀
              </h4>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body p-4">
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text">
                    <FiUser />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text">
                    <FiMail />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text">
                    <FiLock />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
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
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleRegister();
                      }
                    }}
                  />
                </div>
              </div>
              <button
                className="btn btn-dark w-100 py-2"
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
              <div className="text-center mt-4">
                <small>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none"
                    onClick={onShowLogin}
                  >
                    Login
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
