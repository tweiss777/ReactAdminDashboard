import responseDTO from "../dtos/responseDTO";
import execute from "../services/sql.service";
import calculatePaginationOffset from "../utils/calculatePaginateOffset";
import User from "../types/User";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getUsers(req: FastifyRequest<{Params: {page_number: string}}>, reply: FastifyReply) {
    try {
        let { page_number} = req.params; 
        const pageNumber = parseInt(page_number) >= 1 ? parseInt(page_number) : 1;
        const offset = calculatePaginationOffset(pageNumber).toString();
        const query: string =
            'SELECT id, first_name AS firstName, last_name AS lastName, email, ip_address AS ipAddress, address FROM Users LIMIT 10 OFFSET ?';
        const result: User = await execute<User>(query, [offset]);

        const responseDTO: responseDTO<User> = {
            status: 200,
            data: result,
        };

        return reply.status(200).send(responseDTO);
    } catch (error) {
        throw error;
    }
}

export async function getUserCount(_req: FastifyRequest, reply: FastifyReply) {
    try {
        const query: string = "SELECT COUNT(id) AS total_users FROM Users;";
        const result: { count: number[] }[] = await execute(query);
        const responseDto: responseDTO<{ count: number[] }> = {
            status: 200,
            data: result[0],
        };
        return reply.status(200).send(responseDto);
    } catch (error) {
        throw error;
    }
}


export async function updateUser(req: FastifyRequest<{Body: {user: User}, Params: {id: string}}>, reply: FastifyReply){
    try {
        const { user: {firstName, lastName, email, address}} = req.body
        const { id } = req.params 
        const query = "UPDATE Users SET first_name=?, last_name=?, email=?, address=? WHERE id=?;"
        const results = await execute(query,[firstName, lastName, email, address, id])
        const responseDto: responseDTO<any> = {
            status: 200,
            data: results
        }
        reply.status(200).send(responseDto)
        
    } catch (error) {
       throw error
    }
}

