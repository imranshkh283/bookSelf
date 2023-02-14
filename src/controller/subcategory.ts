import { Router, Response, RequestHandler,NextFunction } from "express";
import { check, validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import Request from "../types/Request";

import Category, {TCategory, ICategory} from "../models/Category";
import subCategory, {TSubCategory, ISubcategory} from "../models/Subcategory";


export const read  = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let subcat = await subCategory.find();
        if(!subcat){
            return res.status(HttpStatusCodes.NOT_FOUND).json({data: "No Data"})
        } else {
            let count : number = subcat.length;
            return res.status(HttpStatusCodes.OK).json({
                data: subcat,
                count:count,
            })
        }
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
}

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { categoryId, subcategoryname } = req.body;

    try {
        let subcat : ISubcategory = await subCategory.findOne({categoryId, subcategoryname});
        if(subcat) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                errors: [{
                    msg : 'Sub-Category Already Exist !'
                }]
            })
        }
        const subcatFields:TSubCategory = {
            categoryId,
            subcategoryname,
        }
        subcat = await new subCategory(subcatFields)
        await subcat.save();

        if(subcat){
            return res.status(HttpStatusCodes.OK).json({msg : "Sub-Category Add Successfully"})
        }

    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    
    try {
        const { id } = req.params;
        let _id = await subCategory.findById(id)
        if(_id){
            let subcat = await subCategory.findByIdAndUpdate(_id, req.body)
            res.status(HttpStatusCodes.OK).json({msg : 'Successfully Update' })
        } else {
            res.status(HttpStatusCodes.BAD_REQUEST).json({msg : 'Invalid Request' })
        } 
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }

}