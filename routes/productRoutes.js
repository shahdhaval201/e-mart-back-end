const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
} = require("../controller/productCtrl");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/:id", getProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.get("/", authMiddleware, isAdmin, getAllProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
