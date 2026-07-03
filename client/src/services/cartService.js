import API from "./api";

export const addToCart = (productId, quantity = 1) => {
  return API.post("/cart", {
    productId,
    quantity,
  });
};

export const getCart = () => {
  return API.get("/cart");
};

export const updateCart = (productId, quantity) =>
  API.put("/cart", {
    productId,
    quantity,
  });

export const removeCartItem = (productId) => API.delete(`/cart/${productId}`);

export const clearCart = () => API.delete("/cart");
