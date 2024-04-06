import { User as IUser } from "../types/Users";
import { Card, Button, Input, Alert } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../scss/User.scss";
import React, { useEffect, useMemo, useRef, useState  } from "react";
import { useForm, Controller } from "react-hook-form";
import { useThemeContext } from "../contexts/ThemeContext";

interface IProps {
  user: IUser;
  onClose: () => void;
  onUpdate: (object: IUser) => void;
  errors: string[];
}

export default function User({
  user,
  onClose,
  onUpdate,
  errors: serverErrors,
}: IProps) {
  const [editModeEnabled, setEditModeEnabled] = useState<boolean>(false);
  const [userState, setUserState] = useState<IUser>(user);
  const [saving, setSaving] = useState<boolean>(false);
  const originalUserState = useRef<IUser>(user);
  const {
    control,
    watch,
    getValues,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IUser>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      ipAddress: user.ipAddress,
      address: user.address,
    },
  });
  const watchFullName = watch(["firstName", "lastName"]);
  const fullName = useMemo(() => {
    const [firstName, lastName] = getValues(["firstName", "lastName"]);
    return `${firstName} ${lastName}`;
  }, [watchFullName]);

  const { isEnabled: darkModeEnabled } = useThemeContext();
  function onEditClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    const mode: string | undefined =
      event.currentTarget.textContent?.toLowerCase();
    if (mode === "cancel") {
      setUserState(originalUserState.current);
    }
    setEditModeEnabled(!editModeEnabled);
  }
  async function updateUser() {
    try {
      const userFromForm = getValues();
      setSaving(true);
      onUpdate({...userFromForm, id: user.id });
    } catch (error) {
    } finally {
      setSaving(false);
    }
  }
  return (
    <Card
      className={`user-card ${darkModeEnabled? 'user-card-dark dark-mode-bg dark-mode-text': ''}`}
      title={`${fullName}`}
      extra={
        <Button onClick={onEditClick} type="primary">
          {!editModeEnabled ? "Edit" : "Cancel"}
        </Button>
      }
    >
      {serverErrors.length > 0 && (
        <Alert
          type="error"
          message={
            <ul>
              {serverErrors.map((err) => (
                <li>{err}</li>
              ))}
            </ul>
          }
        />
      )}
      {editModeEnabled && (
        <>
          <h2>First Name</h2>
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: "First name required",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "First name must only contain characters",
              },
            }}
            render={({ field }) => (
              <>
                <Input {...field} prefix={<UserOutlined />} />
                {formErrors.firstName?.message && (
                  <p className="validation-error">
                    {" "}
                    {formErrors.firstName?.message}
                  </p>
                )}
              </>
            )}
          />

          <h2>Last Name</h2>
          <Controller
            name="lastName"
            control={control}
            rules={{
              required: "Last name required",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Last name must only contain characters",
              },
            }}
            render={({ field }) => (
              <>
                <Input {...field} prefix={<UserOutlined />} />
                {formErrors.lastName?.message && (
                  <p className="validation-error">
                    {formErrors.lastName?.message}
                  </p>
                )}
              </>
            )}
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
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <>
                <Input {...field} />
                {formErrors.email?.message && (
                  <p className="validation-error">
                    {formErrors.email?.message}
                  </p>
                )}
              </>
            )}
          />
          <h2> Address</h2>
          <Controller
            name="address"
            control={control}
            rules={{ required: "Address is required" }}
            render={({ field }) => (
              <>
                <Input {...field} />
                {formErrors.address?.message && (
                  <p className="validation-error">
                    {formErrors.address?.message}
                  </p>
                )}
              </>
            )}
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
          onClick={handleSubmit(updateUser)}
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
