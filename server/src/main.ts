import Fastify, { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import "dotenv/config";
import cors from "@fastify/cors";
import userRoutes from "./routes/users.route";
import responseDTO from "./dtos/responseDTO";

const { PORT: port } = process.env;
const fastify: FastifyInstance = Fastify();

fastify.register(cors);
fastify.register(userRoutes, { prefix: '/v1/users' });


fastify.setErrorHandler((error: FastifyError, req: FastifyRequest, reply: FastifyReply) => {
   const response: responseDTO<{error: string }> = {
        status: 500,
        data: {
            error: error.message
        }
    }
    reply.status(500).send(response)

})

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
