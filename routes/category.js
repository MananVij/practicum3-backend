import express from "express";
import { createCategory, getAllCategory } from "../controllers/category.js";

const router = express.Router();

router.route("/").get(getAllCategory).post(createCategory);

export default router;
