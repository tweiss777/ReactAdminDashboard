import { FastifyReply, FastifyRequest } from "fastify";
import responseDTO from "../dtos/responseDTO";
import execute from "../services/sql.service";
import User from "../types/User";
import { decrypt, encrypt } from "../utils/encryptDecrypt";
import QueryCreateResponse from "../types/QueryCreateResponse";



export async function registerUser(req: FastifyRequest<{ Body: User }>, reply: any) {
    try {
        const newuser = req.body

        const existingEmailQuery = "SELECT email FROM Users WHERE email = ? LIMIT 1";
        const result: { email: string }[] = await execute<{ email: string }[]>(existingEmailQuery, [newuser.email]);
        if (result[0]?.email) {
            const responseDto: responseDTO<{ message: string }> = {
                status: 409,
                data: {
                    message: "User already exists"
                }
            }
            reply.status(409).send(responseDto)
            return
        }
        const newUserQuery: string = "INSERT INTO Users (first_name, last_Name, email, password, ip_address, Role) VALUES (?,?,?,?,'127.0.0.1','user');"
        const encryptedPassword: string = encrypt(newuser?.password as string)
        const newUserResult: QueryCreateResponse = await execute<QueryCreateResponse>(newUserQuery, [newuser.firstName, newuser.lastName, newuser.email, encryptedPassword])
        if (newUserResult.affectedRows > 0) {
            const token = await reply.jwtSign({
                email: newuser.email,
                role: 'user'
            });
            reply.send({ token });
            return
        }
        throw new Error("Something went wrong while creating new user")
    } catch (err) {
        throw err;
    }
}

export async function login(
    req: FastifyRequest<{ Body: { email: string; password: string } }>,
    reply: any,
) {
    try {
        const { email, password } = req.body;
        const query: string = "SELECT email, password, Role as 'role' FROM Users WHERE email = ?";

        const result: User[] = await execute<User[]>(query, [email]);

        const decryptedPassword: string = decrypt(result[0]?.password as string) as string;
        if (password === decryptedPassword) {
            const token = await reply.jwtSign({
                email: result[0].email,
                role: result[0].role,
            });
            const responseDto: responseDTO<{ token: string }> = {
                status: 200,
                data: {
                    token
                }

            }
            reply.status(200).send(responseDto);
            return;
        }


        const responseDto: responseDTO<{ message: string }> = {
            status: 401,
            data: {
                message: "Invalid username or password",
            },
        };
        reply.status(401).send(responseDto);
    } catch (err) {
        throw err;
    }
}

export async function verifyToken(req: any, reply: FastifyReply) {
    try {
        await req.jwtVerify();
    } catch (error) {
        const err = error as any;
        if (err?.statusCode === 401) {
            const responseDTO: responseDTO<{ message: string }> = {
                status: 401,
                data: {
                    message: "Unauthorized",
                },
            };
            reply.status(401).send(responseDTO);
            return;
        }
        throw error;
    }
}

export default async function authorize(req: any, reply: FastifyReply) {
    function sendForbidden() {
        const responseDTO: responseDTO<{ message: string }> = {
            status: 401,
            data: {
                message: "forbidden",
            },
        };
        reply.status(401).send(responseDTO);

    }
    function sendUnauthorzed() {
        const responseDTO: responseDTO<{ message: string }> = {
            status: 401,
            data: {
                message: "Unauthorized",
            },
        };
        reply.status(401).send(responseDTO);

    }
    try {
        // this gives a deprecation warning
        const roles = req.routeOptions.config.roles
        const token = await req.jwtVerify()
        if (!roles.includes(token.role)) {
            sendForbidden()
        }
    } catch (error) {
        const err = error as any;
        if (err?.statusCode === 401) {
            sendUnauthorzed()
            return;
        }
        throw error;
    }
}



