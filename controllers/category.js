import Category from "../models/category.js";
import { unique } from "../utils/uniqueFinder.js";

// @desc    Create a new category
// @route   POST /category/
// @access  Public

const createCategory = async (req, res) => {
  try {
    let { name } = req.body;
    const uni = await unique(name, Category);
    if (!uni) {
      throw new Error(`Category already exists.`);
    }
    const category = new Category({ name });
    if (!category) throw new Error("Error creating a new category");
    await category.save();

    res.status(201).json({
      status: "Successfully Created category",
      data: category,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// @desc    Get all Categories
// @route   GET /category/
// @access  Public

const getAllCategory = async (req, res) => {
  try {
    const Categories = await Category.find();
    res.status(200).json({
      status: "Successfully fetched Categories",
      data: Categories,
    });
  } catch (error) {
    res.status(404).end("Not Found");
  }
};

export { createCategory, getAllCategory };
