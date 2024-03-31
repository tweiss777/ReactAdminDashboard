import { Vocabulary } from "ajv";

 export default [
    {
        keyword: "notEmpty",
        validate: (flag: boolean, data:string) => {
            return typeof data === 'string' && data.trim().length > 0;
        },
        
        errors: true,
    },
] as Vocabulary 
