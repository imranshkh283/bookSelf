import { Router, Response, RequestHandler,NextFunction } from "express";
import { check, validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import Request from "../types/Request";

import Category, {TCategory, ICategory} from "../models/Category";
import subCategory, {TSubCategory, ISubcategory} from "../models/Subcategory";
import Book, {TBook, IBook} from '../models/Book';

export const read  = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let book = await Book.find();
        if(!book){
            return res.status(HttpStatusCodes.NOT_FOUND).json({data: "No Data"})
        } else {
            let count : number = book.length;
            return res.status(HttpStatusCodes.OK).json({
                data: book,
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

    const { categoryId, subcategoryId, bookname, price } = req.body;

    try {
        let book : IBook = await Book.findOne({categoryId, subcategoryId, bookname });
        if(book) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                errors: [{
                    msg : 'Book Already Exist !'
                }]
            })
        }
        const bookFields:TBook = {
            categoryId,
            subcategoryId,
            bookname,
            price
        }
        book = new Book(bookFields)
        book.save()
        if(book){
            return res.status(HttpStatusCodes.OK).json({msg : "Book Add Successfully"})
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
        let _id = await Book.findById(id)
        if(_id){
            let book = await Book.findByIdAndUpdate(_id, req.body)
            res.status(HttpStatusCodes.OK).json({msg : 'Successfully Update' })
        } else {
            res.status(HttpStatusCodes.BAD_REQUEST).json({msg : 'Invalid Request' })
        } 
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }

}