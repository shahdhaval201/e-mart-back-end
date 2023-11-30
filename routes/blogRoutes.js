const express = require("express");
const router = express.Router();
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  uploadImages,
} = require("../controller/blogCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const { uploadPhoto, blogImageResize } = require("../middleware/uploadImages");

router.post("/", authMiddleware, isAdmin, createBlog);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  blogImageResize,
  uploadImages
);
router.put("/likes", authMiddleware, isAdmin, likeBlog);
router.put("/dislikes", authMiddleware, isAdmin, disLikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/getblog/:id", authMiddleware, isAdmin, getBlog);
router.get("/getallblog", authMiddleware, isAdmin, getAllBlog);
router.delete("/getdeleteblog/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;
