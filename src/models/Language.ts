import { Document, model, Schema } from 'mongoose';

export type TLanguage = {
    language:string;
    short:string;
}

export interface ILanguage extends TLanguage,Document {}

const languageScheme: Schema = new Schema({
    language : {
        type: String,
        required: true,
    },
    short:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const Language = model<ILanguage>("Language", languageScheme);

export default Language;