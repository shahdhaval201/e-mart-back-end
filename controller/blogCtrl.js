const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getBlog = await Blog.findById(id);
    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlog = asyncHandler(async (req, res) => {
  try {
    const getAllBlog = await Blog.find();
    res.json(getAllBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleteBlog = await Blog.findByIdAndDelete(id, req.body, {
      new: true,
    });
    res.json(deleteBlog);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createBlog, updateBlog, deleteBlog, getBlog, getAllBlog };
