import React, { useState, useEffect } from "react";
import { Table, Alert, Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { CreditLog as ICreditLog } from "../types/CreditLog";
import { useSearchParams } from "react-router-dom";
import { getCreditLogs } from "../services/creditlog.service";
import "../scss/Users.scss";
export default function CreditLog() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedLog, setSelectedLog] = useState<ICreditLog | null>(null);
    const [creditLogs, setCreditLogs] = useState<ICreditLog[]>([]);

    useEffect(() => {
        async function fetchCreditLogs() {
            try {
                const logs = await getCreditLogs();
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
        throw new Error('not implemented')
    }
    const columns: TableProps<ICreditLog>["columns"] = [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
            onCell: (record, _row) => {
                return {
                    onClick: () => { },
                };
            },
        },
        {
            title: "amount",
            dataIndex: "amount",
            key: "amount",
            onCell: (record, _row) => {
                return {
                    onClick: () => { },
                };
            },
        },
        {
            title: "reason",
            dataIndex: "reason",
            key: "reason",
            onCell: (record, _row) => {
                return {
                    onClick: () => { },
                };
            },
        },
        {
            title: "userId",
            dataIndex: "userId",
            key: "userId",
            onCell: (record, _row) => {
                return {
                    onClick: () => { },
                };
            },
        }
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
                        total={10}
                        pageSize={10}
                        onChange={onPageChange}
                    />
                </div>
            )}
        </>
    )

}

