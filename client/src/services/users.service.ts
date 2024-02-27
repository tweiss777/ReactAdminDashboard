import { User } from "../types/Users";
import axios from 'axios'
export async function getUsers(pageNumber?: number): Promise<User[]> {
   const { data: {data} }  = await axios.get(`api/v1/users/${pageNumber ?? 1}`)
    return data as User[]
}

export async function getUserCount(): Promise<number>{
    const { data: {data} }  = await axios.get('api/v1/users/count')
    return data.total_users
}

//export async function getUser(name: string): Promise<User[]> {
  //  return new Promise<User[]>((resolve, _reject) => {
    //    const filteredUsers: User[] = mockData.filter(user => name === user.firstName)
      //  resolve(filteredUsers)
   // })
  
//}
