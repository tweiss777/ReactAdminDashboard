import { describe } from "node:test";
import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import ajvKeywords from "ajv-keywords";
import userSchema, { UserSchema } from "../src/schemas/user-schema";

const ajvInstance: Ajv = new Ajv({ allErrors: true });
ajvKeywords(ajvInstance);
ajvErrors(ajvInstance);
ajvInstance.addKeyword("notEmpty", {
    keyword: "notEmpty",
    validate: (data: string) => {
        return typeof data === "string" && data.trim().length > 0;
    },

    errors: true,
});
describe("Validate new user schema", () => {
    it("Should fail and show errors", () => {
        const newUser: UserSchema = {
            firstName: "",
            lastName: "",
            address: "",
            email: "",
            password: "",
        };
        const validate = ajvInstance.compile(userSchema);
        validate(newUser);
        expect(validate.errors?.length).toBeGreaterThanOrEqual(4);
        console.log(validate.errors)
    });
});
