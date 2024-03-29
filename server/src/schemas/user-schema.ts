import { JSONSchemaType } from "ajv";

export type NewUserSchema = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    password: string;
};

const newUserSchema: JSONSchemaType<NewUserSchema> = {
    type: "object",
    properties: {
        firstName: {
            type: "string",
            notEmpty: true,
            errorMessage: {
                notEmpty: "First name must not be empty",
            },
        },
        lastName: {
            type: "string",
            notEmpty: true,
            errorMessage: {
                notEmpty: "Last name must not be empty",
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
    required: ["firstName", "lastName", "email", "password", "address"],
    errorMessage: {
        required: {
            email: "Email is required",
            firstName: "First Name is required",
            lastName: "Last Name is required",
            address: "Email is required",
            password: "Password is required",
        },
    },
};
export default newUserSchema;
