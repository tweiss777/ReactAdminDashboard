import Fastify, { FastifyInstance } from "fastify";
import "dotenv/config";
import cors from "@fastify/cors";
import userRoutes from "./routes/users.route";

const { PORT: port } = process.env;
const fastify: FastifyInstance = Fastify();

fastify.register(cors);
fastify.register(userRoutes, { prefix: '/v1/users' });

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
