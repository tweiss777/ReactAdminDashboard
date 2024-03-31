import { FastifyPluginOptions } from "fastify";
import CustomFastifyInstance from "../types/CustomFastifyInstance";
import {
    getUsers,
    getUserCount,
    updateUser,
} from "../controllers/user.controller";
import nestedUserInfo from "../schemas/update-user-schema";

export default async function userRoutes(
    fastify: CustomFastifyInstance,
    _options: FastifyPluginOptions,
) {
    fastify.get(
        "/",
        {
            preHandler: [fastify.verifyToken, fastify.authorize],
            config: { roles: ["admin"] },
        },
        getUsers,
    );
    fastify.get(
        "/count",
        {
            preHandler: [fastify.verifyToken, fastify.authorize],
            config: { roles: ["admin"] },
        },
        getUserCount,
    );
    fastify.put(
        "/:id",
        {
            preHandler: [fastify.verifyToken, fastify.authorize],
            config: { roles: ["admin"] },
            schema : {
                body: nestedUserInfo,
            }
        },
        updateUser,
    );
}
