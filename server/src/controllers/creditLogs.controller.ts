import { FastifyReply, FastifyRequest } from "fastify";
import calculatePaginationOffset from "../utils/calculatePaginateOffset";
import responseDTO from "../dtos/responseDTO";
import { CreditLog } from "../types/CreditLog";
import execute from "../services/sql.service";
export async function getCreditLogs(
    req: FastifyRequest<{ Querystring: { page_num: string } }>,
    reply: FastifyReply,
) {
    try {
        const pageNum = req.query.page_num;
        const pageNumber = parseInt(pageNum) >= 1 ? parseInt(pageNum) : 1;
        const offset = calculatePaginationOffset(pageNumber).toString();
        const query: string = "SELECT id, amount, reason, userId FROM CreditLog LIMIT 10 OFFSET ?;"
        const result: CreditLog = await execute<CreditLog>(query, [offset])
        const response: responseDTO<CreditLog> ={
            status: 200,
            data: result,
        };

        return reply.status(200).send(response);


    } catch (error) {
        throw error;
    }
}


export async function getCreditLogCount(_req: FastifyRequest, reply: FastifyReply){
    try {
        const query: string = "SELECT COUNT(*) AS 'count' FROM CreditLog;"
        const result: {count: number} = await execute<{count: number}>(query)
        const responseDTO: responseDTO<{count: number}> = {
            status: 200,
            data: result
        }
        return reply.status(200).send(responseDTO) 
    } catch (error) {
        throw error
    }



}
