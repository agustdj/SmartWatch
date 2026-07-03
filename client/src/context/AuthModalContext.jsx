import { createContext, useContext, useState } from "react";

const AuthModalContext = createContext();

export function AuthModalProvider({ children }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const openLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const openRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const closeAuthModal = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <AuthModalContext.Provider
      value={{
        showLogin,
        showRegister,
        openLogin,
        openRegister,
        closeAuthModal,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return context;
}
