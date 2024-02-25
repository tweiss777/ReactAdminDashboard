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
