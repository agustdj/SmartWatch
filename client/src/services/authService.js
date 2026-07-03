import axios from "axios";
import API from "./api";

export const login = (data) => {
  return API.post("/auth/login", data);
};

export const register = (data) => API.post("/auth/register", data);
