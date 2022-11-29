import express from "express";
import {
  getCategories,
  getRequests,
  getResources,
  getSubCategories,
  reviewContribution,
  signIn,
  signUp,
} from "../controllers/admin.js";
const router = express.Router();

router.route("/").post(signIn);
router.route("/signup").post(signUp);
router.route("/review").post(reviewContribution);
router.route("/getresources").get(getResources);
router.route("/getcategories").get(getCategories);
router.route("/getrequests").get(getRequests);
router.route("/getsubcategories").get(getSubCategories);
export default router;
