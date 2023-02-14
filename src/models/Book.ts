import { Document, model, Schema } from 'mongoose';
import { IMCommon } from '../interfaces/baseTypes';
import { ICategory } from './Category';
import { ISubcategory } from './Subcategory'

export type TBook = IMCommon & {
    categoryId: ICategory['_id'];
    subcategoryId: ISubcategory['_id'];
    bookname:string;
    price: number;
    
}

export interface IBook extends TBook, Document {}

const bookSchema: Schema = new Schema({
    categoryId : {
        type: Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    subcategoryId:{
        type:Schema.Types.ObjectId,
        ref:"Subcategory",
        required:true,
    },
    bookname:{
        type: String,
        required: true,
    },
    price:{
        type:Number,
        required: true,
    },
})

const Book = model<IBook>('Book',bookSchema);

export default Book;