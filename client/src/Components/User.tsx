import { User as IUser } from "../types/Users";
import { Card, Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../scss/User.scss";
import React, { useMemo, useRef, useState } from "react";

interface IProps{
    user: IUser;
    onClose: () => void;
    onUpdate: (object: IUser) => void;
}

export default function User({ user, onClose, onUpdate }: IProps) {
    const [editModeEnabled, setEditModeEnabled] = useState<boolean>(false);
    const [userState, setUserState] = useState<IUser>(user);
    const fullName = useMemo(
        () => userState.firstName + " " + userState.lastName,
        [userState],
    );
    const [saving, setSaving] = useState<boolean>(false)
    const originalUserState = useRef<IUser>(user);

    function onEditClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        const mode: string | undefined =
            event.currentTarget.textContent?.toLowerCase();
        if (mode === "cancel") {
            setUserState(originalUserState.current);
        }
        setEditModeEnabled(!editModeEnabled);
    }
    async function updateUser(){
        try {
            setSaving(true)
            onUpdate(userState) 
        } catch (error) {
            
        } finally{
            setSaving(false)
        }
    }
    return (
        <Card
            className="user-card"
            title={`${fullName}`}
            extra={
                <Button onClick={onEditClick} type="primary">
                    {!editModeEnabled ? "Edit" : "Cancel"}
                </Button> 
            }
        >
            {editModeEnabled && (
                <>
                    <h2>First Name</h2>
                    <Input
                        onChange={(event) =>
                            setUserState({ ...userState, firstName: event.target.value })
                        }
                        value={userState.firstName}
                        placeholder="default size"
                        prefix={<UserOutlined />}
                    />

                    <h2>Last Name</h2>
                    <Input
                        onChange={(event) =>
                            setUserState({ ...userState, lastName: event.target.value })
                        }
                        value={userState.lastName}
                        placeholder="default size"
                        prefix={<UserOutlined />}
                    />
                </>
            )}

            {!editModeEnabled ? (
                <>
                    <h2> Email</h2>
                    <h4> {userState.email} </h4>
                    <h2> Address</h2>
                    <h4> {userState.address}</h4>
                </>
            ) : (
                <>
                    <h2>Email</h2>
                    <Input
                        onChange={(event) =>
                            setUserState({ ...userState, email: event.target.value })
                        }
                        value={userState.email}
                    />
                    <h2> Address</h2>
                    <Input
                        onChange={(event) =>
                            setUserState({ ...userState, address: event.target.value })
                        }
                        value={userState.address}
                    />
                </>
            )}
            <h2> IP Address </h2>
            <h4>{user.ipAddress}</h4>
            <div className="close-btn-container">
                <Button onClick={onClose} className="close-btn" size="large">
                    Close
                </Button>
                <Button
                    onClick={updateUser}
                    className="save-btn"
                    type="primary"
                    size="large"
                    loading={saving}
                >
                    Save
                </Button>
            </div>
        </Card>
    );
}
