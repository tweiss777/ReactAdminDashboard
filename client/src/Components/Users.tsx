import { useState, useEffect } from "react";
import { getUsers } from "../services/users.service";
import { User } from "../types/Users";
import { Table, Alert, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { useSearchParams } from "react-router-dom";
import "../scss/Users.scss";
export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [searchParams, setSearchParams] = useSearchParams();

    function onColClick(record: User) {
        const { id } = record;
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.set("id", id.toString());
        setSearchParams(urlSearchParams);
    }
    const columns: TableProps<User>["columns"] = [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
            onCell: (record, _row) => {
                return {
                    onClick: () => onColClick(record),
                };
            },
        },

        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",

            onCell: (record, _row) => {
                return {
                    onClick: () => onColClick(record),
                };
            },
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
            onCell: (record, _row) => {
                return {
                    onClick: () => onColClick(record),
                };
            },
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            onCell: (record, _row) => {
                return {
                    onClick: () => onColClick(record),
                };
            },
        },

        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            onCell: (record, _row) => {
                return {
                    onClick: () => onColClick(record),
                };
            },
        },

        {
            title: "IP Address",
            dataIndex: "ipAddress",
            key: "ipAddress",
            onCell: (record, _row) => {
                return {
                    onClick: () => onColClick(record),
                };
            },
        },
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users: User[] = await getUsers();
                setUsers(users);
            } catch (error) {
                setHasError(true);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 5000);
            }
        };
        fetchUsers();
    }, []);

    return (
        <>
            {hasError ? (
                <Alert type={"error"} message={"Error Loading Data"} />
            ) : (
                <div className="users-table">
                    <div className="header">
                        <h1>Users</h1>
                        <div className="search-bar">
                            <Input
                                onChange={(event) => setName(event.currentTarget.value)}
                                addonBefore={<SearchOutlined />}
                                placeholder="Search By Name"
                            />
                        </div>
                    </div>
                    <Table
                        scroll={{ x: true }}
                        size={"large"}
                        pagination={{ pageSize: 10, position: ["bottomLeft"] }}
                        columns={columns}
                        loading={isLoading}
                        dataSource={users}
                        bordered={true}
                    />
                </div>
            )}
        </>
    );
}
