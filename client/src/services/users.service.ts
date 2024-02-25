import { User } from "../types/Users";
import axios from 'axios'
const mockData = [
    {
        id: 1,
        firstName: "Mathias",
        lastName: "Ivashnikov",
        email: "mivashnikov0@ovh.net",
        ipAddress: "105.204.140.32",
        address: "4030 Hudson Alley",
    },
    {
        id: 2,
        firstName: "Mathias",
        lastName: "Ivashnikov",
        email: "mivashnikov0@ovh.net",
        ipAddress: "105.204.140.32",
        address: "4030 Hudson Alley",
    },
    {
        id: 3,
        firstName: "Mathias",
        lastName: "Ivashnikov",
        email: "mivashnikov0@ovh.net",
        ipAddress: "105.204.140.32",
        address: "4030 Hudson Alley",
    },
    {
        id: 4,
        firstName: "Mathias",
        lastName: "Ivashnikov",
        email: "mivashnikov0@ovh.net",
        ipAddress: "105.204.140.32",
        address: "4030 Hudson Alley",
    },
    {
        id: 5,
        firstName: "Mathias",
        lastName: "Ivashnikov",
        email: "mivashnikov0@ovh.net",
        ipAddress: "105.204.140.32",
        address: "4030 Hudson Alley",
    }
]
export async function getUsers(): Promise<User[]> {
    const { data: {data} }  = await axios.get('api/v1/users')
    return data as User[]
}

export async function getUser(name: string): Promise<User[]> {
    return new Promise<User[]>((resolve, _reject) => {
        const filteredUsers: User[] = mockData.filter(user => name === user.firstName)
        resolve(filteredUsers)
    })


    
    
}
