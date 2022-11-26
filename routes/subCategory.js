import express from "express";
import { createSubCategory, getAllSubCategory } from "../controllers/subCategory.js";

const router = express.Router();

router.route("/").get(getAllSubCategory).post(createSubCategory);

export default router;
