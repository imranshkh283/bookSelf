import { Document, model, Schema } from 'mongoose';
import { ICategory } from './Category';

export type TSubCategory = {
    categoryId: ICategory['_id'];
    subcategoryname:string;
}

export interface ISubcategory extends TSubCategory, Document {}

const subcategorySchema: Schema = new Schema({
    categoryId : {
        type: Schema.Types.ObjectId,
        ref:"Category"
    },
    subcategoryname:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

const Subcategory = model<ISubcategory>('Subcategory',subcategorySchema);

export default Subcategory;