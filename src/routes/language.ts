import express, { Router } from "express";
const language: Router = express.Router();
import * as controller from '../controller/language';

language.get('/', controller.read);
language.post('/add', controller.add);
language.post('/update/:id', controller.update);

export default language;