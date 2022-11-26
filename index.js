import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import categoryRoutes from "./routes/category.js";
import subCategoryRoutes from "./routes/subCategory.js";
import resourceRoutes from "./routes/resource.js";
import emailRoutes from "./routes/email.js";

const __dirname = path.resolve();

dotenv.config({ path: path.join(__dirname, "./config/config.env") }); //local

connectDB();

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.get("/", (req, res) => {
  res.send("api running");
});

app.use("/category", categoryRoutes);
app.use("/subCategory", subCategoryRoutes);
app.use("/resource", resourceRoutes);
app.use("/email", emailRoutes);

//PORT
const PORT = process.env.PORT || 8000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);
