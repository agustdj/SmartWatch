const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductDetail,
} = require("../controllers/productController");

router.post("/", addProduct);

router.get("/", getProducts);

router.get("/:id", getProductDetail);

module.exports = router;
