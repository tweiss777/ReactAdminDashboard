import { Menu, type MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
export function NavBar() {
    const navigate = useNavigate();
    function navigateTo(path: string) {
        navigate(path);
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
    ];

    return <Menu mode="horizontal" theme="dark" items={menuItems} />;
}
