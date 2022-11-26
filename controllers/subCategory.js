import SubCategory from "../models/subCategory.js";
import { uniqueSubCategory } from "../utils/uniqueSubCategory.js";

// @desc    Create a new subCategory
// @route   POST /subCategory/
// @access  Public

const createSubCategory = async (req, res) => {
  try {
    let { title, text, imageSrc, category } = req.body;
    const uni = await uniqueSubCategory(title, SubCategory);
    if (!uni) {
      throw new Error(`Category already exists.`);
    }
    const subcategory = new SubCategory({ title, text, imageSrc, category });
    if (!subcategory) throw new Error("Error creating a new subcategory");
    await subcategory.save();

    res.status(201).json({
      status: "Successfully Created subcategory",
      data: subcategory,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// @desc    Get all SubCategories
// @route   GET /subCategory/
// @access  Public

const getAllSubCategory = async (req, res) => {
  try {
    const SubCategories = await SubCategory.find().sort({ "category": 1 }).populate("category");
    res.status(200).json({
      status: "Successfully fetched Sub Categories",
      data: SubCategories,
    });
  } catch (error) {
    res.status(404).end("Not Found");
  }
};

export { createSubCategory, getAllSubCategory };
