import {MixedSchema, StringSchema} from "yup";

export interface ValidationObject {
    isValid:boolean,
    error?:string,
}

export default class Validator {

    static yup(schema:MixedSchema|StringSchema, value:any):ValidationObject{
        try {
            schema.validateSync(value);
            return {isValid:true}
        } catch (e) {
            return {isValid:false, error:e.message}
        }
    }
    static async asyncYup(schema:MixedSchema, value:any):Promise<any>{
        try {
            await schema.validate(value);
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e.message);
        }
    }
}