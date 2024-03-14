import { FastifyPluginOptions } from "fastify";
import {
    getCreditLogCount,
    getCreditLogs,
} from "../controllers/creditLogs.controller";
import CustomFastifyInstance from "../types/CustomFastifyInstance";
export default async function creditLogRoutes(
    fastify: CustomFastifyInstance,
    _options: FastifyPluginOptions,
) {
    fastify.get(
        "/",
        {
            preHandler: [fastify.verifyToken, fastify.authorize],
            config: { roles: ["admin"] },
        },
        getCreditLogs,
    );
    fastify.get(
        "/credit-log-count",
        {
            preHandler: [fastify.verifyToken, fastify.authorize],
            config: { roles: ["admin"] },
        },
        getCreditLogCount,
    );
}
