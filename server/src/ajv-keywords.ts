import { Vocabulary } from "ajv";

export default [
    {
        keyword: "notEmpty",
        validate: (data: string) => {
            // todo fix this keyword
            const onlyWhiteSpaces: boolean = /^\s*$/.test(data);
            return data.trim().length > 0;
        },
        errors: true,
    },
] as Vocabulary;
