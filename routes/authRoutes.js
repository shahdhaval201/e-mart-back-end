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
} = require("../controller/useCtrl");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

router.post("/login", loginUserCtrl);
router.post("/register", createUser);
router.put("/password", authMiddleware, updatePassword);
router.get("/getAllUsers", getAllUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.delete("/:id", deleteUser);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, blockedUser);
router.put("/unblock-user/:id", authMiddleware, unblockedUser);

module.exports = router;
