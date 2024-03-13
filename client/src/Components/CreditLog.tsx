import React, { useState, useEffect, useRef } from "react";
import { Table, Alert, Pagination } from "antd";
import type { TableProps } from "antd";
import { CreditLog as ICreditLog } from "../types/CreditLog";
import { getCreditLogs, getLogCount } from "../services/creditlog.service";
import "../scss/Users.scss";
export default function CreditLog() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [creditLogs, setCreditLogs] = useState<ICreditLog[]>([]);
  const totalCreditLogs: React.MutableRefObject<number> = useRef<number>(0);
  useEffect(() => {
    async function fetchCreditLogs() {
      try {
        const [count, logs] = await Promise.all([
          getLogCount(),
          getCreditLogs(),
        ]);
        totalCreditLogs.current = count;
        setCreditLogs(logs);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCreditLogs();
  }, []);
  async function onPageChange(page: number, _pageSize: number) {
    const logs = await getCreditLogs(page);
    setCreditLogs(logs);
  }
  const columns: TableProps<ICreditLog>["columns"] = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "userId",
      dataIndex: "userId",
      key: "userId",
    },
  ];

  return (
    <>
      {hasError ? (
        <Alert type={"error"} message={"Error Loading Data"} />
      ) : (
        <div className="users-table">
          <div className="header">
            <h1>Credits</h1>
          </div>
          <Table
            scroll={{ x: true }}
            pagination={false}
            size={"large"}
            columns={columns}
            loading={isLoading}
            dataSource={creditLogs}
            bordered={true}
          />
          <Pagination
            total={totalCreditLogs.current}
            pageSize={10}
            onChange={onPageChange}
          />
        </div>
      )}
    </>
  );
}
