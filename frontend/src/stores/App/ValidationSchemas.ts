import * as yup from 'yup';
import Validator from "../../global/managers/Validator";



export const UserSettingsValidationSchema = {

    name: yup.string()
        .matches(/^([\w\s]+)$/, { message:"Allowed characters: [ a-z ], [ 0-9 ], [ Space, -, _ ]", excludeEmptyString:true }),
    email: yup.string()
        .email(),
    password: yup.string(),

};

export const UserSettingsValidation = {
    name: (rule:any, value:any) => {
        return Validator.asyncYup(UserSettingsValidationSchema.name as any, value);
    },
    email: (rule:any, value:any) => {
        return Validator.asyncYup(UserSettingsValidationSchema.email as any, value);
    },
    password: (rule:any, value:any) => {
        return Validator.asyncYup(UserSettingsValidationSchema.password as any, value);
    },
};
