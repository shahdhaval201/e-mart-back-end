const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getAllUser,
  getUser,
  deleteUser,
  updatedUser,
  blockedUser,
  unblockedUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishList,
  saveAddress,
} = require("../controller/useCtrl");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.get("/getAllUsers", getAllUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishList);
router.put("/address", authMiddleware, saveAddress);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.delete("/:id", deleteUser);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, blockedUser);
router.put("/unblock-user/:id", authMiddleware, unblockedUser);

module.exports = router;
