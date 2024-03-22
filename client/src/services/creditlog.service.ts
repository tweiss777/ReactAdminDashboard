import { CreditLog } from "../types/CreditLog";
import axios from "axios";
import getToken from "../utils/getToken";
export async function getCreditLogs(
  pageNumber: number = 1,
): Promise<CreditLog[]> {
  try {
    const token = getToken();
    const {
      data: { data },
    } = await axios.get(`/api/v1/credits?page_num=${pageNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data as CreditLog[];
  } catch (error) {
    throw error;
  }
}

export async function getLogCount(): Promise<number> {
  try {
    const token = getToken();
    const {
      data: { data },
    } = await axios.get("/api/v1/credits/credit-log-count", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.count as number;
  } catch (error) {
    throw error;
  }
}
