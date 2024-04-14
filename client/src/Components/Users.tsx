import { useState, useMemo } from "react";
import { User as IUser } from "../types/Users";
import User from "./User";
import { Table, Alert, Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";

import { useSearchParams } from "react-router-dom";
import { useThemeContext } from "../hooks/useThemeContext";
import useUserService from "../hooks/useUsersService";
import "../scss/Users.scss";
import "../scss/DarkMode.scss";
export default function Users() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const { isEnabled: darkModeEnabled } = useThemeContext();
  const {
    users,
    totalUsers,
    loadingUsers,
    validationErrors,
    setValidationErrors,
    searchByName,
    saveSuccessful,
    saveUser,
    hasError,
    onPageChange,
  } = useUserService();
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

  function closeUserForm() {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.delete("id");
    setSearchParams(urlSearchParams);
    setValidationErrors([]);
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
  return (
    <>
      {saveSuccessful && (
        <Alert type={"success"} message={"User updated succesfully"} />
      )}
      {hasError ? (
        <Alert type={"error"} message={"Error Loading Data"} />
      ) : (
        <div className={`users-table ${darkModeEnabled ? `dark-mode-bg` : ""}`}>
          <div className="header">
            <h1 className={`${darkModeEnabled ? "dark-mode-text" : ""}`}>
              Users
            </h1>
            <div className="search-bar">
              <Input
                onChange={(event) => searchByName(event.target.value)}
                addonBefore={<SearchOutlined />}
                placeholder="Search By Name"
              />
            </div>
          </div>
          <Table
            className={darkModeEnabled ? "table-style-dark" : ""}
            scroll={{ x: true }}
            pagination={false}
            size={"large"}
            columns={columns}
            loading={loadingUsers}
            dataSource={users}
            bordered={true}
          />
          <Pagination
            className={darkModeEnabled ? "pagination-style-dark" : ""}
            total={totalUsers}
            pageSize={10}
            onChange={onPageChange}
          />

          {currentRouteId && selectedUser && (
            <div className="users-container">
              <User
                errors={validationErrors}
                onUpdate={saveUser}
                onClose={closeUserForm}
                user={selectedUser}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
