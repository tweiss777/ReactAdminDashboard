import { Vocabulary } from "ajv";

 export default [
    {
        keyword: "notEmpty",
        validate: (data: string) => {
            // todo fix this keyword
            return typeof data === 'string' && data.trim().length > 0;
        },
        
        errors: true,
    },
] as Vocabulary 
