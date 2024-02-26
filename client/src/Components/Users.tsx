import { useState, useEffect, useMemo, useRef } from "react";
import { getUsers, getUserCount } from "../services/users.service";
import { User as IUser } from "../types/Users";
import User from "./User";
import { Table, Alert, Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { useSearchParams } from "react-router-dom";
import "../scss/Users.scss";
export default function Users() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const totalUsers: React.MutableRefObject<number>  = useRef<number>(0);
    const currentRouteId: string | null = useMemo<string | null>(
        () => searchParams.get("id"),
        [searchParams],
    );
    function onColClick(record: IUser) {
        const { id } = record;
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.set("id", id.toString());
        setSearchParams(urlSearchParams);
        setSelectedUser(record);
    }
    async function onPageChange(page: number, _pageSize: number) {
        const results = await getUsers(page)
        setUsers(results)
    }
    const columns: TableProps<IUser>["columns"] = [
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
                const [users, totalCount]: [IUser[], number] = await Promise.all([
                    getUsers(),
                    getUserCount(),
                ]);
                setUsers(users);
                totalUsers.current = totalCount;
            } catch (error) {
                setHasError(true);
            } finally {
                setIsLoading(false);
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
                        columns={columns}
                        loading={isLoading}
                        dataSource={users}
                        bordered={true}
                    />
                    <Pagination total={totalUsers.current} pageSize={10} onChange={onPageChange} />

                    {currentRouteId && selectedUser && <User user={selectedUser} />}
                </div>
            )}
        </>
    );
}
