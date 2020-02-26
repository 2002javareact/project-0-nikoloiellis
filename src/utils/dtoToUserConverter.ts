import { UserDTO } from "../dto/UserDTO";
import { User } from "../models/User";


export function userDTOToUserConverter(userDTO:UserDTO):User{
    return new User(
        userDTO.userid,
        userDTO.username,
        userDTO.password,
        userDTO.email,
        userDTO.firstname,
        userDTO.lastname,
        userDTO.role
    )
}