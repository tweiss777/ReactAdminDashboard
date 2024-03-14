import { FastifyInstance } from "fastify";
type CustomFastifyInstance = FastifyInstance & {
    verifyToken(): Promise<void>;
    authorize(): Promise<void>;
};
export default CustomFastifyInstance
