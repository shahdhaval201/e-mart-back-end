const express = require("express");
const {
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/blogCatCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.get("/category/:id", authMiddleware, isAdmin, getCategory);
router.get("/categories", authMiddleware, isAdmin, getAllCategory);
router.put("/edit-category/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/delete-category/:id", authMiddleware, isAdmin, deleteCategory);

module.exports = router;
