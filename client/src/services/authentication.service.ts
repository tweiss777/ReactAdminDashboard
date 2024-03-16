import axios from "axios"
export async function login(email: string, password: string) {
    try {
        const { data: { data } } =  await axios.post('/api/v1/auth/login', {email, password})
        return data.token
    } catch (error) {
        throw error
    }
}
