import responseDTO from "../dtos/responseDTO";
import execute from "../services/sql.service";
import User from "../types/User";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getUsers(_req: FastifyRequest, reply: FastifyReply) {
  try {
    const query: string =
      "SELECT id, first_name AS firstName, last_name AS lastName, email, ip_address AS ipAddress, address FROM Users";
    const result: User = await execute<User>(query);


        const responseDTO: responseDTO<User> = {
            status: 200,
            data: result
        }

        return reply.status(200).send(responseDTO)

  } catch (error) {
        throw error
    }
}
export async function getUserCount(_req: FastifyRequest, reply: FastifyReply){
    try {
        const query: string = "SELECT COUNT(id) AS total_users FROM Users;"
        const result: {count: number[]}[] = await execute(query)
        const responseDto:responseDTO<{count: number[]}> = {
            status: 200,
            data: result[0]
        }
        return reply.status(200).send(responseDto)
    } catch (error) {
        throw error
    }
}
