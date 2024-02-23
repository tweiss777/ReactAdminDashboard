import Fastify, { FastifyInstance } from "fastify";
import "dotenv/config";
import cors from "@fastify/cors";


const { PORT: port } = process.env;
const fastify: FastifyInstance = Fastify();

fastify.register(cors);

async function start() {
    try {
        const p = parseInt(port as string);
        await fastify.listen({ port: p });
        console.log(`Listeing on port ${p}`)
    } catch (error) {
        fastify.log.error(error);
    }
}
start();
