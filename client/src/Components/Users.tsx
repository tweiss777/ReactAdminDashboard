import { useState, useEffect } from "react";
import { getUsers } from "../services/users.service";
import { User } from "../types/Users";
import { Table, Alert } from "antd";
import type { TableProps } from "antd";
import "../scss/Users.scss";

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    const columns: TableProps<User>["columns"] = [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
        },

        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },

        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },

        {
            title: "IP Address",
            dataIndex: "ipAddress",
            key: "ipAddress",
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

    const onRow = (_record: any, _rowIndex: any) => ({
        onClick: (event: any) => {
            console.log(event);
        },
    });

    return (
        <>
            {hasError ? (
                <Alert type={"error"} message={"Error Loading Data"} />
            ) : (
                <div className="users-table">
                    <h1>Users</h1>
                    <Table
                        onRow={onRow}
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
