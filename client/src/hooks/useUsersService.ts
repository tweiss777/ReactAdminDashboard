import { useEffect, useState } from "react";
import { User as IUser, User } from "../types/Users";
import { getUsers, getUserCount, updateUser } from "../services/users.service";

export default function useUserService() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [loadUsersError, setLoadUsersError] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [saveSuccessful, setSaveSuccesful] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const [users, userCount]: [IUser[], number] = await Promise.all([
          getUsers(),
          getUserCount(),
        ]);
        setUsers(users);
        setTotalUsers(userCount);
      } catch (error) {
        setLoadingUsers(true);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  async function searchByName(name: string) {
    let results: IUser[];
    let userCount: number;
    if (!name) {
      results = await getUsers();
      userCount = await getUserCount();
    } else {
      results = await getUsers(undefined, name);
      userCount = await getUserCount(name);
    }
    setTotalUsers(userCount);
    setUsers(results);
    setName(name);
  }
  async function onPageChange(page: number, _pageSize: number) {
    let results;
    if (!name) {
      results = await getUsers(page);
    } else {
      results = await getUsers(page, name);
    }
    setUsers(results);
  }
  async function saveUser(userToUpdate: IUser) {
    try {
      setHasError(false);
      setValidationErrors([]);
      const rowsChanged: number = await updateUser(userToUpdate);
      if (rowsChanged > 0) {
        setSaveSuccesful(true);
        const updatedIndex = users.findIndex(
          (user) => user.id === userToUpdate.id,
        );
        const updatedUsers = [...users];
        updatedUsers[updatedIndex] = { ...userToUpdate };
        setUsers(updatedUsers);
      }
    } catch (error: any) {
      switch (error.response.status) {
        case 400:
          setValidationErrors(error.response.data.data.errors);
          break;
        default:
          setHasError(true);
          break;
      }
    }
  }

  return {
    users,
    setUsers,
    totalUsers,
    setTotalUsers,
    loadingUsers,
    validationErrors,
    setValidationErrors,
    setLoadingUsers,
    hasError,
    onPageChange,
    setHasError,
    saveUser,
    saveSuccessful,
    setSaveSuccesful,
    searchByName,
    loadUsersError,
    setLoadUsersError,
    setName,
  };
}
