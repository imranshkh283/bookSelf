import express, { Router } from "express";
const book : Router = express.Router();
import * as controller from "../controller/book";

book.get("/", controller.read).get("/read", controller.read);
book.post("/add", controller.add);
book.post("/update/:id", controller.update);

export default book;