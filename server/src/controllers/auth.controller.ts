import { FastifyReply, FastifyRequest } from "fastify"
import responseDTO from "../dtos/responseDTO"

export async function registerUser(_req: FastifyRequest, reply: any) {
    try {
        // mock signature
        const token = await reply.jwtSign({ name: "foo" })
        reply.send({ token })

    } catch (err) {
        throw err
    }
}


export async function login(_req: FastifyRequest, reply: any) {
    try {
        // mock signature
        const token = await reply.jwtSign({ name: "foo" })
        reply.send({ token })

    } catch (err) {
        throw err
    }
}

export async function verifyToken(req: any, reply: FastifyReply) {
    try {
        const decodedToken = await req.jwtVerify()
        console.log(decodedToken)
        reply.send({ decodedToken })

    } catch (error) {
        const err = error as any
        if (err?.statusCode === 401) {
            const responseDTO: responseDTO<{ message: string }> = {
                status: 401,
                data: {
                    message: "Unauthorized"
                }
            }
            reply.status(401).send(responseDTO)
            return;
        }
        throw error
    }

}
