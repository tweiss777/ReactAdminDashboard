import { JSONSchemaType } from "ajv";

type NewUserSchema = {
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
        },
        lastName: {
            type: "string",
            notEmpty: true,
        },
        address: {
            type: "string",
            notEmpty: true,
        },
        email: {
            type: "string",
            notEmpty: true,
        },
        password: {
            type: "string",
            notEmpty: true,
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
