import { User as IUser } from "../types/Users";

interface IProps{
    user: IUser

}


export default function User({user} : IProps){
        return <h1> User Card</h1>
}
