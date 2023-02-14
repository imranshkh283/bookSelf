import express, { Router } from "express";
const subCategory : Router = express.Router();
import * as controller from "../controller/subcategory";

subCategory.get("/", controller.read).get("/read", controller.read);
subCategory.post("/add", controller.add);
subCategory.post("/update/:id", controller.update);

export default subCategory;