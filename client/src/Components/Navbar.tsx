import { Switch, Menu, type MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import getToken from "../utils/getToken";
import deleteToken from "../utils/deleteToken";
import { useAppDispatch } from "../store/storeHooks";
import { setIsLoggedIn } from "../store/authenticationSlice";
import { useThemeContext } from "../hooks/useThemeContext";
export function NavBar() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { toggle } = useThemeContext()
    function navigateTo(path: string) {
        navigate(path);
    }


    function logUserOut(){
       const token: string | null = getToken()
        if(token){
            deleteToken()
            dispatch(setIsLoggedIn(false))
            navigateTo('/login')

        }
    
    }

    function onToggle(checked: boolean){
        toggle(checked)
    }

    const menuItems: MenuProps["items"] = [
        {
            label: <span onClick={() => navigateTo("/")}>Users</span>,
            key: "users",
        },
        {
            label: <span onClick={() => navigateTo("/affiliates")}>Affiliates</span>,
            key: "affiliates",
        },
        {
            label: <span onClick={() => navigateTo("/credits")}>Credits</span>,
            key: "credits",
        },
        {
            label: <span onClick={logUserOut}>Logout</span>,
            key: "logout",
        },
        {
            label: <span>Dark Mode<Switch onChange={onToggle} /></span>,
            key: 'switch'
        }
    ];

    return <Menu mode="horizontal" theme="dark" items={menuItems} />;
}
