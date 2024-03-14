import { FastifyInstance, FastifyPluginOptions } from "fastify";
import authorize, { login, registerUser, verifyToken } from "../controllers/auth.controller";

export default async function authRoutes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    ) { 

    fastify.post('/register', registerUser)
    fastify.post('/verify', verifyToken)
    fastify.post('/login',login) 
    fastify.post('/auth',authorize)
}
