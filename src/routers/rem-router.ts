import * as express from 'express'
import { User } from '../models/User'
import {Role} from '../models/role'
import { authAdminMiddleware, authUserMiddleware, authFactory, authCheckId } from '../middleware/auth-midleware'
import { SendReimbursements, findAllReimburstment, findReimById, findStatusbyId, UpdateReimbursements } from '../services/user_service'
import { UserDTO } from '../dto/UserDTO';
import { ReimbursementDTO } from '../dto/ReimbursementDTO'
import { Reimbursement } from '../models/reimbursement'




export const remRouter = express.Router();





//All Admins go here 
//Send REimbursements
remRouter.post('', authFactory(['Admin']), async (req,res)=>{
    let { 
        reimbursementid,
        author,
        amount,
        datesubmitted,
        dateresolved,
        description,
        resolver,
        status ,
        type }:{
        reimbursementid:number
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
    if( reimbursementid &&
        author&&
        amount &&
        datesubmitted &&
        dateresolved &&
        description &&
        resolver &&
        status &&
        type){

        
        let newReim = await SendReimbursements(new ReimbursementDTO(
            reimbursementid,
            author,
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
//Update
remRouter.patch('', authFactory(['Admin']), async (req,res)=>{
    let { 
        reimbursementid,
        author,
        amount,
        datesubmitted,
        dateresolved,
        description,
        resolver,
        status ,
        type }:{
        reimbursementid:number
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
    if( reimbursementid &&
        author&&
        amount &&
        datesubmitted &&
        dateresolved &&
        description &&
        resolver &&
        status &&
        type){

        
        let newReim = await UpdateReimbursements(new ReimbursementDTO(
            reimbursementid,
            author,
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
remRouter.get('', [authFactory(['Admin']),  async (req,res)=>{
    
    let reimbursements:Reimbursement[] = await findAllReimburstment(); 
    res.json(reimbursements)// this will format the object into json and send it back

    
}])

remRouter.get('/author/:id', authFactory(['Admin', 'User']), authCheckId, async (req,res)=>{
    const id = +req.params.id// the plus sign is to type coerce into a number
    if(isNaN(id)){
        res.sendStatus(400)
    }else {
        try{
            let rem = await findReimById(id)
            res.json(rem)
        }catch(e){
            res.status(e.status).send(e.message)
        }
      
        
    }
})
remRouter.get('/status/:id', authFactory(['Admin', 'User']), authCheckId, async (req,res)=>{
    const id = +req.params.id// the plus sign is to type coerce into a number
    if(isNaN(id)){
        res.sendStatus(400)
    }else {
        try{
           // let rem = await findStatusbyId(id);
            let rem:Reimbursement[] = await findStatusbyId(id); 
            res.json(rem)
        }catch(e){
            res.status(e.status).send(e.message)
        }
      
        
    }
})
//All Finance Manager Go here
remRouter.post('', authFactory(['Finance Manager']), async (req,res)=>{
    let { 
        reimbursementid,
        author,
        amount,
        datesubmitted,
        dateresolved,
        description,
        resolver,
        status ,
        type }:{
        reimbursementid:number
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
    if( reimbursementid &&
        author&&
        amount &&
        datesubmitted &&
        dateresolved &&
        description &&
        resolver &&
        status &&
        type){

        
        let newReim = await SendReimbursements(new ReimbursementDTO(
            reimbursementid,
            author,
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

//User
remRouter.post('', authFactory(['User']), async (req,res)=>{
    let { 
        reimbursementid,
        author,
        amount,
        datesubmitted,
        dateresolved,
        description,
        resolver,
        status ,
        type }:{
        reimbursementid:number
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
    if( reimbursementid &&
        author&&
        amount &&
        datesubmitted &&
        dateresolved &&
        description &&
        resolver &&
        status &&
        type){

        
        let newReim = await SendReimbursements(new ReimbursementDTO(
            reimbursementid,
            author,
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