import { daoFindUserByUsernameAndPassword,daoFindAllUsers, daoFindUserRoleByUsername, daoSaveOneUser, daoFindUserById,daoSendReimbursements } from "../repository/user_doa";
import { User } from "../models/User";
import { UserDTO } from "../dto/UserDTO";
import { Reimbursement } from "../models/reimbursement";
import {ReimbursementDTO} from '../dto/ReimbursementDTO';



export async function findUserByUsernameAndPassword(username:string, password:string): Promise<User>{
   

   return await daoFindUserByUsernameAndPassword(username,password)
}



export async function findAllUsers():Promise<User[]>{
   // I write to a different table, who just sent this request
   // know what time of day, these requests get most sent
   return await daoFindAllUsers()
}

//find the roles by username
export async function findUserRoleByUsername(username:string):Promise<User> {
   return await daoFindUserRoleByUsername(username);
}





export async function saveOneUser(newUser:UserDTO):Promise<User>{
   return await daoSaveOneUser(newUser)
}



export async function findUserById(id:number):Promise<User>{
   return await daoFindUserById(id)
}

export async function SendReimbursements(reimbursementDTO:ReimbursementDTO):Promise<Reimbursement>{
   return await daoSendReimbursements(reimbursementDTO);
}