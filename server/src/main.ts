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
import ajvErrors from "ajv-errors";
import ajvKeywords from "ajv-keywords";
import customAjvKeywords from "./custom-ajv-keywords";
const { PORT: port, AUTH_SECRET: authSecret } = process.env;
const fastify: FastifyInstance = Fastify({
    ajv: {
        customOptions: {
            allErrors: true,
            keywords: customAjvKeywords,
        },
        plugins: [ajvErrors, ajvKeywords],
    },
});

fastify.register(cors);
fastify.register(authRoutes, { prefix: "api/v1/auth" });
fastify.register(userRoutes, { prefix: "api/v1/users" });
fastify.register(creditLogRoutes, { prefix: "api/v1/credits" });

fastify.register(fastifyJwt, {
    secret: authSecret,
});

fastify.decorate("verifyToken", verifyToken);
fastify.decorate("authorize", authorize);
fastify.setErrorHandler(
    (error: FastifyError, _req: FastifyRequest, reply: FastifyReply) => {
        const statusCode = error.statusCode ?? 500;
        let errorMessages: string[];
        let data: { error: string } | { errors: string[] };
        if (error.validation) {
            errorMessages = error.validation.map((err) => err?.message as string);
            data = { errors: errorMessages };
        } else {
            data = { error: error.message };
        }
        const response: responseDTO<{ error: string } | { errors: string[] }> = {
            status: statusCode,
            data,
        };
        reply.status(statusCode).send(response);
    },
);

async function start() {
    try {
        const p = parseInt(port as string);
        await fastify.listen({ port: p });
        console.log(`Listeing on port ${p}`);
    } catch (error) {
        console.log(error);
        fastify.log.error(error);
    }
}
start();
