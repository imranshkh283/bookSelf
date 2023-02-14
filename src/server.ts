import bodyParser from "body-parser";
import express from "express";
import connectDB from "../config/database";
import language from "./routes/language";
import category from "./routes/category";
import subCategory from "./routes/subcategory";
import book from "./routes/book";
const app = express();

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("API Running");
});


app.use("/api/language", language);
app.use("/api/category", category);
app.use("/api/subcategory", subCategory);
app.use("/api/book", book);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
