import { FastifyInstance } from "fastify";
type CustomFastifyInstance = FastifyInstance & {
  verifyToken(): Promise<void>;
};
export default CustomFastifyInstance
