import express from "express";
import Contributer from "../models/Contributer.js";
const router = express.Router();

// @desc    Resource Request From Contributer
// @route   POST /contributer/
// @access  Public

const requestContribution = async (req, res) => {
  try {
    var newResource = new Contributer(req.body);
    await newResource.save();
    console.log("Resource Request Added");
    res.status(200).json({
      msg: "Reuest Added",
    });
  } catch (e) {
    res.status(500).json({ msg: "Some Error Occured" });
    console.log("error in adding request resouces", e);
  }
};

export { requestContribution };
