import { stat } from "fs"

export class Reimbursement{

    //reimbursementid:number
    author:number
    amount:number 
    datesubmitted:number
    dateresolved:number
    description:string
    resolver:number
    status:number 
    type:number 
    constructor(
        author:number,
        amount:number ,
        datesubmitted:number,
        dateresolved:number,
        description:string,
        resolver:number,
        status:number ,
        type:number ){
            //this.reimbursementid = reimbursementid
            this.author = author
            this.amount = amount
            this.datesubmitted = datesubmitted
            this.description = description
            this.resolver = resolver
            this.status = status 
            this.type = type

    }



}