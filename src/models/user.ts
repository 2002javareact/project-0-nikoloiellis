import { Role } from "../dto/RoleDTO"



export class User {
    userid:number
    username:string
    password:string
    firstname:string
    lastname:string
    email:string
    role:Role 
    constructor(userid:number,
        username:string,
        password:string, 
        firstname:string, 
        lastname:string, 
        email:string, 
        role:Role){

            this.userid = userid;
            this.username = username;
            this.password = password;
            this.firstname = firstname;
            this.lastname = lastname;
            this.email = email;
            this.role = role;
        }


    
}