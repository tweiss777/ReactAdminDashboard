import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { getUsers } from '../controllers/user.controller'

export default async function userRoutes(fastify: FastifyInstance, _options: FastifyPluginOptions ) {
    fastify.get('/', getUsers)
    }
