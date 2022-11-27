import express from "express";
import {
  requestContribution,
} from "../controllers/contributer.js";
const router = express.Router();

router.route("/").post(requestContribution);
export default router;