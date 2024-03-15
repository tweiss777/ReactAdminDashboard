import '../scss/Login.scss';
import { Input, Button, Checkbox } from "antd";
import { MailOutlined, KeyOutlined } from '@ant-design/icons';
import { useState } from 'react'


export default function Login() {

    const [loggingIn, setLoggingIn] = useState<boolean>(false)
    
    async function login(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        const formData: FormData = new FormData(event.currentTarget)
        const email: string | undefined = formData.get('email')?.toString();
        const password: string | undefined = formData.get('password')?.toString()
        const rememberMe: string | undefined = formData.get('remember-me')?.toString()
    }
    return (
        <div className="login-container">
            <form onSubmit={login} className='login-box'>
                <div>
                    <label>email</label>
                    <Input name="email" prefix={<MailOutlined/> } />
                </div>
                <div>
                    <label>password </label>
                    <Input name='password' type="password" prefix={<KeyOutlined />} />
                </div> 
                <div>
                    Remember Me <Checkbox name='remember-me' />
                </div>
                <div> 
                    <Button loading={loggingIn} type="primary" htmlType='submit'>Login </Button>
                </div>
            </form>
        </div>
    );
}
