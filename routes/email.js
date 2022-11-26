import express from "express";
import { sendEmail, NewsletterEmail } from "../controllers/email.js";

const router = express.Router();

router.route("/").post(sendEmail);
router.route("/newsletter").post(NewsletterEmail);

export default router;
