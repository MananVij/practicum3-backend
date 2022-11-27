import mongoose from "mongoose";

const ContributerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  }
});

const Contributer = mongoose.model("Contributer", ContributerSchema);
export default Contributer;
