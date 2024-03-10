import { CreditLog } from "../types/CreditLog";
import axios from "axios";
export async function getCreditLogs(pageNumber: number = 1): Promise<CreditLog[]>{
    const { data: {data}} = await axios.get(`/api/v1/credits?page_num=${pageNumber}`)
    return data as CreditLog[]
}
