import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
    authorize,
    login,
    registerUser,
    verifyToken,
} from "../controllers/auth.controller";
import newUserSchema from "../schemas/user-schema";

export default async function authRoutes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
) {
    fastify.post(
        "/register",
        {
            schema: {
                body: newUserSchema,
            },
        },

        registerUser,
    );
    fastify.post("/verify", verifyToken);
    fastify.post("/login", login);
    fastify.post("/auth", authorize);
}
