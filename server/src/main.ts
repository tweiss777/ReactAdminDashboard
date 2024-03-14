import 'reflect-metadata'
import Fastify, {
    FastifyError,
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
} from "fastify";
import "dotenv/config";
import cors from "@fastify/cors";
import userRoutes from "./routes/users.route";
import responseDTO from "./dtos/responseDTO";
import creditLogRoutes from "./routes/creditlogs.route";
import fastifyJwt from "@fastify/jwt";
import authRoutes from "./routes/auth.routes";
import { authorize, verifyToken } from "./controllers/auth.controller";

const { PORT: port, AUTH_SECRET: authSecret } = process.env;
const fastify: FastifyInstance = Fastify();

fastify.register(cors);
fastify.register(authRoutes, { prefix: "api/v1/auth" });
fastify.register(userRoutes, { prefix: "api/v1/users" });
fastify.register(creditLogRoutes, { prefix: "api/v1/credits" });

fastify.register(fastifyJwt ,{
    secret: authSecret,
});

fastify.decorate('verifyToken', verifyToken)
fastify.decorate('authorize', authorize)
fastify.setErrorHandler(
    (error: FastifyError, _req: FastifyRequest, reply: FastifyReply) => {
        const response: responseDTO<{ error: string }> = {
            status: 500,
            data: {
                error: error.message,
            },
        };
        reply.status(500).send(response);
    },
);

async function start() {
    try {
        const p = parseInt(port as string);
        await fastify.listen({ port: p });
        console.log(`Listeing on port ${p}`);
    } catch (error) {
        fastify.log.error(error);
    }
}
start();
