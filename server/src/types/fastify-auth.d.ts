import { FastifyInstance } from "fastify";
import { FastifyJwtNamespace } from "@fastify/jwt";
declare module "fastify" {
    interface FastifyInstance
        extends FastifyJwtNamespace<{ namespace: "security" }> { }
}
