import { Table, Alert, Pagination } from "antd";
import type { TableProps } from "antd";
import { CreditLog as ICreditLog } from "../types/CreditLog";
import { useThemeContext } from "../hooks/useThemeContext";
import "../scss/Users.scss";
import useCreditService from "../hooks/useCreditService";
export default function CreditLog() {
  const { isEnabled: darkModeEnabled } = useThemeContext();

  const {
    onPageChange,
    creditLogs,
    creditsLoading,
    hasError,
    totalCreditLogs,
  } = useCreditService();
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
        <div className={`users-table ${darkModeEnabled ? `dark-mode-bg` : ""}`}>
          <div className="header">
            <h1 className={`${darkModeEnabled ? "dark-mode-text" : ""}`}>
              Credits
            </h1>
          </div>
          <Table
            className={darkModeEnabled ? "table-style-dark" : ""}
            scroll={{ x: true }}
            pagination={false}
            size={"large"}
            columns={columns}
            loading={creditsLoading}
            dataSource={creditLogs}
            bordered={true}
          />
          <Pagination
            className={darkModeEnabled ? "pagination-style-dark" : ""}
            total={totalCreditLogs}
            pageSize={10}
            onChange={onPageChange}
          />
        </div>
      )}
    </>
  );
}
