import { CreditLog } from "../types/CreditLog";
import axios from "axios";
export async function getCreditLogs(
  pageNumber: number = 1,
): Promise<CreditLog[]> {
  try {
    const {
      data: { data },
    } = await axios.get(`/api/v1/credits?page_num=${pageNumber}`);
    return data as CreditLog[];
  } catch (error) {
    throw error;
  }
}

export async function getLogCount(): Promise<number> {
  try {
    const {
      data: { data },
    } = await axios.get("/api/v1/credits/credit-log-count");
    return data.count as number;
  } catch (error) {
    throw error;
  }
}
