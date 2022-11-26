import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
