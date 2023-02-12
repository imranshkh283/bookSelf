import express, { Router } from "express";
const category:Router = express.Router();

import * as controller from '../controller/category';
category.post('/add', controller.add);

export default category;