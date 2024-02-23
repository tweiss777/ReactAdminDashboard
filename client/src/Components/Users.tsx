import { useState, useEffect } from "react";
import { getUsers } from "../services/users.service";
import { User } from "../types/Users";
import { Table, Alert, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import "../scss/Users.scss";

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const columns: TableProps<User>["columns"] = [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
            onCell: (record, row) => {
                return {
                    onClick: (e) => {
                        console.log(record)
                        console.log(row)

                    }
                }

            }
        },

        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",

            onCell: (record, row) => {
                return {
                    onClick: (e) => {
                        console.log(record)
                        console.log(row)

                    }
                }

            }
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
            onCell: (record, row) => {
                return {
                    onClick: () => {
                        console.log(record)
                        console.log(row)

                    }
                }

            }
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            onCell: (record, row) => {
                return {
                    onClick: () => {
                        console.log(record)
                        console.log(row)

                    }
                }

            }
        },

        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            onCell: (record, row) => {
                return {
                    onClick: () => {
                        console.log(record)
                        console.log(row)

                    }
                }

            }
        },

        {
            title: "IP Address",
            dataIndex: "ipAddress",
            key: "ipAddress",
            onCell: (record, row) => {
                return {
                    onClick: () => {
                        console.log(record)
                        console.log(row)

                    }
                }

            }
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
