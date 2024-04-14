import { useState, useEffect } from "react";
import { getCreditLogs, getLogCount } from "../services/creditlog.service";
import { CreditLog as ICreditLog } from "../types/CreditLog";

export default function useCreditService() {
  const [creditsLoading, setCreditsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [totalCreditLogs, setTotalCreditLogs] = useState<number>(0);
  const [creditLogs, setCreditLogs] = useState<ICreditLog[]>([]);

  useEffect(() => {
    async function fetchCreditLogs() {
      try {
        setCreditsLoading(true);
        const [count, logs] = await Promise.all([
          getLogCount(),
          getCreditLogs(),
        ]);
        setTotalCreditLogs(count);
        setCreditLogs(logs);
      } catch (error) {
        setHasError(true);
      } finally {
        setCreditsLoading(false);
      }
    }
    fetchCreditLogs();
  }, []);

  async function onPageChange(page: number, _pageSize: number) {
    const logs = await getCreditLogs(page);
    setCreditLogs(logs);
  }

  return {
    creditsLoading,
    hasError,
    creditLogs,
    totalCreditLogs,
    setCreditLogs,
    setHasError,
    setCreditsLoading,
    setTotalCreditLogs,
    onPageChange,
  };
}
