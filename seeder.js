import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

// import data
import categories from "./data/categories.js";
import subCategories from "./data/Design-tools/shape-pattern-generator.js";

import Category from "./models/category.js";
import SubCategory from "./models/subCategory.js";
import Resource from "./models/resource.js";

dotenv.config({ path: "./config/config.env" });

connectDB();

const importData = async () => {
  try {
    await Resource.insertMany(subCategories);
    // await subCategories.forEach((item) => Resource.InsertOne(item));

    console.log(`Data imported`.green.inverse);
    process.exit(0);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // await Category.deleteMany();
    // await Resource.deleteMany();

    console.log(`Data destroyed`.red.inverse);
    process.exit(0);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

process.argv[2] === "-d" ? destroyData() : importData();
