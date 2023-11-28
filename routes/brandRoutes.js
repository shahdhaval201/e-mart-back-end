const express = require("express");
const {
  createBrand,
  getBrand,
  getAllBrand,
  updateBrand,
  deleteBrand,
} = require("../controller/brandCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBrand);
router.get("/brand/:id", authMiddleware, isAdmin, getBrand);
router.get("/brands", authMiddleware, isAdmin, getAllBrand);
router.put("/edit-brand/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/delete-brand/:id", authMiddleware, isAdmin, deleteBrand);

module.exports = router;
