import {  FastifyPluginOptions } from "fastify";
import CustomFastifyInstance from "../types/CustomFastifyInstance";
import {
  getUsers,
  getUserCount,
  updateUser,
} from "../controllers/user.controller";



export default async function userRoutes(
  fastify: CustomFastifyInstance,
  _options: FastifyPluginOptions,
) {
  fastify.get("/", { preHandler: [fastify.verifyToken] },getUsers);
  fastify.get("/count", { preHandler: [fastify.verifyToken] }, getUserCount);
  fastify.put("/:id", { preHandler: [fastify.verifyToken] }, updateUser);
}
