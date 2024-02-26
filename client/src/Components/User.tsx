import { User as IUser } from "../types/Users";
import { Card, Button } from "antd";
import "../scss/User.scss";

interface IProps {
  user: IUser;
    onClose: () => void
}

export default function User({ user, onClose }: IProps) {
    function close(){
        onClose()
    }
    return (
    <Card
      className="user-card"
      title={`${user.firstName} ${user.lastName}`}
      extra={<Button type="primary">Edit</Button>}
    >
      <h2> Email</h2>
      <h4> {user.email} </h4>
      <h2> Address</h2>
      <h4> {user.address}</h4>
      <h2> IP Address </h2>
      <h4>{user.ipAddress}</h4>
      <div className="close-btn-container">
        <Button onClick={close} className="close-btn" size="large">
          Close
        </Button>
      </div>
    </Card>
  );
}
