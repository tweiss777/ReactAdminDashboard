import responseDTO from "../dtos/responseDTO";
import execute from "../services/sql.service";
import calculatePaginationOffset from "../utils/calculatePaginateOffset";
import User from "../types/User";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getUsers(req: FastifyRequest<{Querystring: {page_number: string, first_name: string}}>, reply: FastifyReply) {
    try {
        let { page_number, first_name }: {page_number: string, first_name: string}= req.query; 
        const pageNumber = parseInt(page_number) >= 1 ? parseInt(page_number) : 1;
        const offset = calculatePaginationOffset(pageNumber).toString();
        const query: string =
            "SELECT id, first_name AS firstName, last_name AS lastName, email, ip_address AS ipAddress, address FROM Users" + (first_name?" WHERE first_name LIKE CONCAT(?,'%')": "") +  " LIMIT 10 OFFSET ?;";
        const args: string[]= []
        
        if(first_name){
            args.push(first_name)
        }
        const result: User = await execute<User>(query, [...args,offset]);

        const responseDTO: responseDTO<User> = {
            status: 200,
            data: result,
        };

        return reply.status(200).send(responseDTO);
    } catch (error) {
        throw error;
    }
}

export async function getUserCount(req: FastifyRequest<{Querystring: {name: string}}>, reply: FastifyReply) {
    try {
        const query: string = "SELECT COUNT(id) AS total_users FROM Users" + (req.query.name? " WHERE first_name LIKE CONCAT(?,'%')": "") +  ";";

        const args = req.query.name? [req.query.name] : []
        const result: { count: number[] }[] = await execute(query,args);
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
        if(!id){
            throw new Error('id is missing')
        }
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
