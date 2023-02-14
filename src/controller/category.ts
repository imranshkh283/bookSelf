import { Router, Response, RequestHandler,NextFunction } from "express";
import { check, validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import Request from "../types/Request";

import Category, { ICategory,TCategory } from '../models/Category';

export const add: RequestHandler = async (req:Request, res:Response, next:NextFunction) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { categoryname, short } = req.body;
    try {
        let cat = await Category.findOne({categoryname})
        if(cat){
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                errors:[{
                    msg : 'Category Already Exist !'
                }]
            })
        }

        const catFileds:TCategory = {
            categoryname,
            short,
        };

        cat = await new Category(catFileds)
        await cat.save();
        if(cat){
            res.status(HttpStatusCodes.OK).json({msg : 'Category Add Successfully' })
        }

    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
}

export const update = async (req:Request, res:Response, next:NextFunction) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { id } = req.params;
    let _id = await Category.findById(id)
    try {
        if(_id){
            let cat = await Category.findByIdAndUpdate(_id, req.body);
            res.status(HttpStatusCodes.OK).json({msg : 'Category Update Successfully' })
        }
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
    
}

export const read : RequestHandler = async (req:Request, res: Response, next: NextFunction) => {

    try {
        let cat = await Category.find();
        if(cat){
            let count : number = cat.length
            return res.status(HttpStatusCodes.OK).json({data:cat, count: count})
        }
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
}