import { Response, RequestHandler, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import Request from "../types/Request";

import Language,{ TLanguage, ILanguage  } from "../models/Language";

export const add: RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { language, short } = req.body;
    
    try {
        let book:ILanguage = await Language.findOne({language})
        if(book){
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                errors: [{
                    msg : 'Language Already Added !'
                }]
            })
        }

        const LanguageField: TLanguage = {
            language,
            short,
        }
        book = new Language(LanguageField)
        await book.save();
        
        if(book){
            res.status(HttpStatusCodes.OK).json({msg : 'Successfully Add' })
        }

    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }

}

export const update: RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { id } = req.params;
    let _id = await Language.findById(id);
    try {
        if(_id){
           let language =  await Language.findByIdAndUpdate(_id, req.body)
           res.status(HttpStatusCodes.OK).json({msg : 'Successfully Update' })
        }
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
}

export const read : RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
    try {
        let language = await Language.find();
        if(language){
            let count : number = language.length
            res.status(HttpStatusCodes.OK).json({data : language, count:count,})
        } else {
            return res.status(HttpStatusCodes.OK).json({data: "No Data"})
        }
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
}