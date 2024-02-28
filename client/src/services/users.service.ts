import { User } from "../types/Users";
import axios from "axios";
import debounce from "../utils/debounce";

export async function getUserCount(name: string=''): Promise<number> {
    const {
        data: { data },
    } = await axios.get(`api/v1/users/count?name=${name}`);
    return data.total_users;
}

export async function updateUser(user: User) {
    const {
        data: { data },
    } = await axios.put(`api/v1/users/${user.id}`, {
        user,
    });
    return data.changedRows as number;
}

export async function getUsers(pageNumber: number = 1,name: string=''): Promise<User[]> {
    const fetchUsers = debounce(async (name: string, pageNumber: number) => {
        const {data: { data }} = await axios.get(`/api/v1/users?first_name=${name}&page_number=${pageNumber}`)
        return data
    },1500)
    const results = await fetchUsers(name, pageNumber) as User[]
    return results
}
