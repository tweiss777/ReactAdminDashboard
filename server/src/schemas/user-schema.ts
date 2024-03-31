import { JSONSchemaType } from "ajv";

export type UserSchema = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    password: string;
};

const userSchema: JSONSchemaType<UserSchema> = {
    type: "object",
    properties: {
        firstName: {
            type: "string",
            notEmpty: true,
            pattern: "^[a-zA-Z]+$",
            errorMessage: {
                notEmpty: "First name must not be empty",
                pattern: "First name must only contain letters",
            },
        },
        lastName: {
            type: "string",
            pattern: "^[a-zA-Z]+$",
            notEmpty: true,
            errorMessage: {
                notEmpty: "Last name must not be empty",
                pattern: "Last name may only contain letters",
            },
        },
        address: {
            type: "string",
            notEmpty: true,
            errorMessage: {
                notEmpty: "Address must not be empty",
            },
        },
        email: {
            type: "string",
            notEmpty: true,
            errorMessage: {
                notEmpty: "Email name must not be empty",
            },
        },
        password: {
            type: "string",
            notEmpty: true,
            errorMessage: {
                notEmpty: "Password name must not be empty",
            },
        },
    },
    required: ["firstName", "lastName", "address", "email", "password"],
    errorMessage: {
        required: {
            email: "Email is required",
            firstName: "First Name is required",
            lastName: "Last Name is required",
            address: "Address is required",
            password: "Password is required",
        },
    },
};
export default userSchema;
