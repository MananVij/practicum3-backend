import express from "express";
import { createResource, getResource } from "../controllers/resource.js";

const router = express.Router();

router.route("/").post(createResource);
router.route("/:subCategory").post(getResource);

export default router;
