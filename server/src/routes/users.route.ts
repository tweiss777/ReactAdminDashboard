import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getUsers, getUserCount } from "../controllers/user.controller";

export default async function userRoutes(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
) {
    fastify.get("/:page_number", getUsers);
    fastify.get("/count", getUserCount)
}
