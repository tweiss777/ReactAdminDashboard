import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getCreditLogs } from "../controllers/creditLogs.controller";

export default async function creditLogRoutes(
    fastify: FastifyInstance,
    _options: FastifyPluginOptions,
) { 
    fastify.get('/',getCreditLogs)

}
