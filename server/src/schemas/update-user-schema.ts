import { JSONSchemaType } from "ajv";

type NestedUpdatedInfo = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
};

export type UpdatedUserSchema = {
    user: NestedUpdatedInfo;
};

const nestedUserInfo: JSONSchemaType<NestedUpdatedInfo> = {
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
            pattern: "\\S+@\\S+\\.\\S+",
            errorMessage: {
                notEmpty: "Email name must not be empty",
                pattern: "Invalid email format"
            },
        },
    },
    required: ["firstName", "lastName", "address", "email"],
    errorMessage: {
        required: {
            email: "Email is required",
            firstName: "First Name is required",
            lastName: "Last Name is required",
            address: "Address is required",
        },
    },
};

const updatedUserSchema: JSONSchemaType<UpdatedUserSchema> = {
    type: "object",
    properties: {
        user: nestedUserInfo,
    },
    required: ["user"],
    errorMessage: {
        required: {
            user: "User is required",
        },
    },
};
export default updatedUserSchema;
