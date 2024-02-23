import { FastifyInstance } from 'fastify'


export default async function userRoutes(fastify: FastifyInstance, options) {
    fastify.get('/', (req, reply) => {
            reply.status(200).send({ message: "Not Implemented" })
        })
    }
