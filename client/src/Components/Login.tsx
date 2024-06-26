import "../scss/Login.scss";
import UserData from "../types/userData";
import { Input, Button, Checkbox, Alert } from "antd";
import { MailOutlined, KeyOutlined } from "@ant-design/icons";
import { useState } from "react";
import { jwtDecode } from 'jwt-decode'
import { login } from "../services/authentication.service";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [loggingIn, setLoggingIn] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate()

    async function loginUser(event: React.FormEvent<HTMLFormElement>) {
        try {
            if(error){
                setError('')
            }
            setLoggingIn(true)
            event.preventDefault();
            const formData: FormData = new FormData(event.currentTarget);
            const email: string | undefined = formData.get("email")?.toString();
            const password: string | undefined = formData.get("password")?.toString();
            const rememberMe: string | undefined = formData
                .get("remember-me")
                ?.toString();
            if (password && email) {
                const token = await login(email, password);
                if(rememberMe){
                    localStorage.setItem("token", token)
                } else{
                    sessionStorage.setItem("token", token)
                }
                localStorage.setItem('isLoggedIn','true')
                const decodedToken = jwtDecode(token) 
                localStorage.setItem('user-data', JSON.stringify(decodedToken))
                const userData: UserData = decodedToken as UserData
                if(userData.role.toLowerCase() === 'admin'){
                    navigate('/')
                }
                else{
                    setError('Site is under maintenance comeback soon!')
                }
            } else {
                setError("Email and password required");
            }
        } catch (error: any) {
            setError(error.response.data.data.message) 
        }
        finally{
            setLoggingIn(false)
        }
    }
    return (
        <div className="login-container">
            <form onSubmit={loginUser} className="login-box">
                {error && <Alert  message={error} type={"error"} />}
                <div>
                    <label>email</label>
                    <Input name="email" prefix={<MailOutlined />} />
                </div>
                <div>
                    <label>password </label>
                    <Input name="password" type="password" prefix={<KeyOutlined />} />
                </div>
                <div>
                    Remember Me <Checkbox name="remember-me" />
                </div>
                <div>
                    <Button loading={loggingIn} type="primary" htmlType="submit">
                        Login{" "}
                    </Button>
                </div>
            </form>
        </div>
    );
}
