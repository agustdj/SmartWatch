import API from "./api";

export const subscribe = (email) => {
  return API.post("/newsletter", {
    email,
  });
};
