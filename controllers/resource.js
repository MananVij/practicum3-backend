import Resource from "../models/resource.js";

// @desc    Create a new resource
// @route   POST /resource/
// @access  Public

const createResource = async (req, res) => {
  try {
    let { title, link, description, imagesrc, subCategory } = req.body;
    const resource = new Resource({
      title,
      link,
      description,
      imagesrc,
      subCategory,
    });

    if (!resource) throw new Error("Error creating new resource");
    await resource.save();

    res.status(201).json({
      status: "Successfully Created Resource",
    });
  } catch (error) {
    throw new Error(error);
  }
};

// @desc    get a particular type of resource
// @route   POST /resource/:subCategory
// @access  Public

const getResource = async (req, res) => {
  try {
    let { subCategory } = req.params;
    const resources = await Resource.find({
      subCategory: subCategory,
    })
      .sort({ _id: 1 })
      .populate("subCategory");

    if (!resources) throw new Error("Error fetching resource");

    res.status(200).json({
      status: "Successfully fetched Resource",
      data: resources,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export { createResource, getResource };
