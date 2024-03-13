import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getCreditLogCount, getCreditLogs } from "../controllers/creditLogs.controller";

export default async function creditLogRoutes(
    fastify: FastifyInstance,
    _options: FastifyPluginOptions,
) { 
    fastify.get('/',getCreditLogs)
    fastify.get('/credit-log-count', getCreditLogCount)

}
