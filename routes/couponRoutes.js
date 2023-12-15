const express = require("express");
const {
  createCoupon,
  getAllCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controller/couponCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/getallcoupon", authMiddleware, isAdmin, getAllCoupon);
router.get("/getcoupon/:id", authMiddleware, isAdmin, getCoupon);
router.put("/updatecoupon/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/deletecoupon/:id", authMiddleware, isAdmin, deleteCoupon);

module.exports = router;
