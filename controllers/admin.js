import express from "express";
import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import Resource from "../models/resource.js";
import SubCategory from "../models/subCategory.js";
import Contributer from "../models/Contributer.js";
import Category from "../models/category.js";
const router = express.Router();

// @desc    Admin Signup
// @route   POST /admin/signup
// @access  Admin

const signUp = async (req, res) => {
  try {
    var adminUser = new Admin({
      email: req.body.email,
      password: req.body.password,
    });
    await adminUser.save();
    const token = await adminUser.generateAuthToken();
    const resources = await Resource.find();
    const categories = await Category.find();
    const subCategories = await SubCategory.find()
      .sort({ category: 1 })
      .populate("category");
    const requests = await Contributer.find();

    const data = {
      resources,
      categories,
      subCategories,
      requests,
    };

    res.status(200).json({
      msg: "User Logged In",
      email: req.body.email,
      token,
      data,
    });
  } catch (e) {
    if (e.code == 11000) {
      res.json({ msg: "Email Already Exists" }).status(403);
    }
  }
};

// @desc    Admin SignIn
// @route   POST /admin/
// @access  Admin

const signIn = async (req, res) => {
  try {
    const user = await Admin.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(401).send("Admin not found");
    } else {
      bcrypt.compare(req.body.password, user.password, async (err, result) => {
        if (err) {
          res.send("some error occured").status(500);
        }
        if (result) {
          const token = await user.generateAuthToken();
          const resources = await Resource.find();
          const categories = await Category.find();
          const subCategories = await SubCategory.find()
            .sort({ category: 1 })
            .populate("category");
          const requests = await Contributer.find();

          const data = {
            resources,
            categories,
            subCategories,
            requests,
          };

          res.status(200).json({
            msg: "User Logged In",
            email: user.email,
            token,
            data,
          });
        } else {
          res.send("Admin not Verified").status(404);
        }
      });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Some Error Occured",
    });
  }
};

// @desc    Accept / Deny Contribution
// @route   POST /admin/review/?ObjdctId
// @access  Admin

const reviewContribution = async (req, res) => {
  try {
    const status = req.body.status;
    const _id = req.query.reqId;
    if (status) {
      const resource = await Contributer.findById(_id);
      const newResource = new Resource({
        title: resource.title,
        link: resource.link,
        description: req.body.description,
        imagesrc: req.body.imagesrc,
        subCategory: req.body.subCategory,
      });
      await newResource.save();
    }
    await Contributer.findByIdAndDelete(_id);
    const resources = await Resource.find();
    const requests = await Contributer.find();
    res.status(200).json({
      msg: "Request Updated",
      data: {
        resources,
        requests,
      },
    });
  } catch (error) {
    console.log(error, "new error");
    res.status(500).send("Some Error Occured");
  }
};

export { signUp, signIn, reviewContribution };
