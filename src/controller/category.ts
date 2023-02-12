import { Router, Response } from "express";
import { check, validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import Request from "../../types/Request";

import Category, { ICategory,TCategory } from "../../models/Category";

const router = Router();

router.get("/", (req, res) => {
    res.send(" Category API works");
})

export default router;