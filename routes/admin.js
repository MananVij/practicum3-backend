import express from "express";
import { reviewContribution, signIn, signUp } from "../controllers/admin.js";
const router = express.Router();

router.route("/").post(signIn);
router.route("/signup").post(signUp);
router.route("/review").post(reviewContribution);
export default router;
