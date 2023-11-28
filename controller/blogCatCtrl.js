const BCategory = require("../models/blogCatModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbid");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const category = await BCategory.create(req.body);
    res.json(category);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const getCategory = await BCategory.findById(id);
    res.json(getCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const getAllCategory = await BCategory.find();
    res.json(getAllCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCategory = await BCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCategory = await BCategory.findByIdAndDelete(id);
    res.json(deleteCategory);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
