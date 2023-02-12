import express, { Router } from "express";
const category:Router = express.Router();

import * as controller from '../controller/category';
category.get('/', controller.read);
category.post('/add', controller.add);
category.post('/update/:id', controller.update);

export default category;