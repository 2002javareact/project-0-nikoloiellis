import * as express from 'express'
import { User } from '../models/User'
import {Role} from '../models/role'
import { authAdminMiddleware, authUserMiddleware, authFactory, authCheckId } from '../middleware/auth-midleware'
import { SendReimbursements } from '../services/user_service'
import { UserDTO } from '../dto/UserDTO';
import { ReimbursementDTO } from '../dto/ReimbursementDTO'
import { Reimbursement } from '../models/reimbursement'


export const remRouter = express.Router();





// generally in rest convention
// a post request to the root of a resource will make one new of that resource
remRouter.post('', authFactory(['Admin']), async (req,res)=>{
    let { 
        author,
        amount,
        datesubmitted,
        dateresolved,
        description,
        resolver,
        status ,
        type }:{
       
        author:number
        amount:number 
        datesubmitted:number
        dateresolved:number
        description:string
        resolver:number
        status:number 
        type:number 
    } = req.body// this will be where the data the sent me is
    // the downside is this is by default just a string of json, not a js object
    if( author&&
        amount &&
        datesubmitted &&
        dateresolved &&
        description &&
        resolver &&
        status &&
        type){

        
        let newReim = await SendReimbursements(new ReimbursementDTO(
            0,
            amount,
            datesubmitted,
            dateresolved,
            description,
            resolver,
            status ,
            type
            
                                             
        ))
        // this would be some function for adding a new user to a db
        res.status(201).json(newReim);
    } else {
        res.status(400).send('Please include all Reimburstment fields')
        // for setting a status and a body
    }

})

remRouter.post('', authFactory(['Finance Manager']), async (req,res)=>{
    let { 
        author,
        amount,
        datesubmitted,
        dateresolved,
        description,
        resolver,
        status ,
        type }:{
       
        author:number
        amount:number 
        datesubmitted:number
        dateresolved:number
        description:string
        resolver:number
        status:number 
        type:number 
    } = req.body// this will be where the data the sent me is
    // the downside is this is by default just a string of json, not a js object
    if( author&&
        amount &&
        datesubmitted &&
        dateresolved &&
        description &&
        resolver &&
        status &&
        type){

        
        let newReim = await SendReimbursements(new ReimbursementDTO(
            0,
            amount,
            datesubmitted,
            dateresolved,
            description,
            resolver,
            status ,
            type
            
                                             
        ))
        // this would be some function for adding a new user to a db
        res.status(201).json(newReim);
    } else {
        res.status(400).send('Please include all Reimburstment fields')
        // for setting a status and a body
    }

})


remRouter.post('', authFactory(['User']), async (req,res)=>{
    let { 
        author,
        amount,
        datesubmitted,
        dateresolved,
        description,
        resolver,
        status ,
        type }:{
       
        author:number
        amount:number 
        datesubmitted:number
        dateresolved:number
        description:string
        resolver:number
        status:number 
        type:number 
    } = req.body// this will be where the data the sent me is
    // the downside is this is by default just a string of json, not a js object
    if( author&&
        amount &&
        datesubmitted &&
        dateresolved &&
        description &&
        resolver &&
        status &&
        type){

        
        let newReim = await SendReimbursements(new ReimbursementDTO(
            0,
            amount,
            datesubmitted,
            dateresolved,
            description,
            resolver,
            status ,
            type
            
                                             
        ))
        // this would be some function for adding a new user to a db
        res.status(201).json(newReim);
    } else {
        res.status(400).send('Please include all Reimburstment fields')
        // for setting a status and a body
    }

})