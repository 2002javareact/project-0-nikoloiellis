import { PoolClient } from "pg";
import { connectionPool } from ".";
import { User } from "../models/User";
import { BadCredentialsError} from '../error/badCredentialsError'
import { InternalServerError } from "../error/internalServerError";
import { userDTOToUserConverter } from "../utils/dtoToUserConverter";
import { UserDTO } from "../dto/UserDTO";
import { UserNotFoundError } from "../error/userNotFound";
import { Reimbursement } from "../models/reimbursement";
import { ReimbursementDTO } from "../dto/ReimbursementDTO";
import {reimbursementDTOToReimbursementConverter} from '../utils/dtoToReimbursementConverter'






export async function daoFindUserByUsernameAndPassword(username:string,password:string):Promise<User>{
    let client:PoolClient// our potential connection to db
    try {
        client = await connectionPool.connect()
        // a paramaterized query
        let results = await client.query(`select * from "ERS_Project_0"."User" as u inner join "ERS_Project_0"."Role" as r on u."roleId" = r.roleid where u.username = $1 and "password" = $2
        `, [username, password] )
        if(results.rowCount === 0){
            throw new Error('User Not Found')
        }
        return userDTOToUserConverter(results.rows[0])
    } catch(e){
        console.log(e);
        if(e.message === 'User Not Found'){
            throw new BadCredentialsError()
        }else {
            throw new InternalServerError()
        }
    } finally {
        client && client.release()
    }
}


export async function daoFindAllUsers():Promise<User[]>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let results = await client.query('SELECT * FROM "ERS_Project_0"."User" as u inner join "ERS_Project_0"."Role" as r on u."roleId" = r.roleid');
        return results.rows.map(userDTOToUserConverter)

    }catch(e){
        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}


//find user by username
export async function daoFindUserRoleByUsername(username:string):Promise<User>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('select "role" from "ERS_Project_0"."Role" as r inner join "ERS_Project_0"."User" as u on r.roleid  = u."roleId" where  u.username = $1 ', [username])
        if(result.rowCount === 0){
            throw new Error('User Not Found')
        }
        return userDTOToUserConverter(result.rows[0])

    }catch(e){
        // id DNE
        //need if for that
        if(e.message ==='User Not Found'){
            throw new UserNotFoundError()
        }
        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}





// function that saves a new user and returns that user with its new id
export async function daoSaveOneUser(newUser:UserDTO):Promise<User> {
    let client:PoolClient

    try { 
        client = await connectionPool.connect()
        // send a query and immeadiately get the role id matching the name on the dto
        let roleId = (await client.query('SELECT * FROM public.roles WHERE role_name = $1', [newUser.role])).rows[0]
        // send an insert that uses the id above and the user input
        let result = await client.query('INSERT INTO public.users (username, "password", email, first_name, last_name, "role") values ($1,$2,$3,$4,$5,$6) RETURNING user_id;',
        [newUser.username, newUser.password, newUser.email, newUser.firstname, newUser.lastname, roleId])
        // put that newly genertaed user_id on the DTO 
        newUser.userid = result.rows[0].user_id
        return userDTOToUserConverter(newUser)// convert and send back
    } catch(e){

        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}


export async function daoFindUserById(userid:number):Promise<User>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM "ERS_Project_0"."User" where userid = $1', [userid])
        if(result.rowCount === 0){
            throw new Error('User Not Found')
        }
        return userDTOToUserConverter(result.rows[0])

    }catch(e){
        // id DNE
        //need if for that
        if(e.message ==='User Not Found'){
            throw new UserNotFoundError()
        }
        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}





// function that saves a new user and returns that user with its new id
export async function daoSendReimbursements(reimbursementDTO:ReimbursementDTO, ):Promise<Reimbursement> {
    let client:PoolClient

    try { 
        client = await connectionPool.connect()
        // send a query and immeadiately get the role id matching the name on the dto
        let result = await client.query(`INSERT INTO "ERS_Project_0"."Reimbursement"
        (amount, datesubmitted, dateresolved, description, status, "type")
        VALUES($1, $2, $2, $3, $4, $5)`, [reimbursementDTO.amount, reimbursementDTO.datesubmitted, reimbursementDTO.dateresolved,reimbursementDTO.description,reimbursementDTO.status, reimbursementDTO.type]); 
        // send an insert that uses the id above and the user input
        return reimbursementDTOToReimbursementConverter(reimbursementDTO)// convert and send back
    } catch(e){

        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}