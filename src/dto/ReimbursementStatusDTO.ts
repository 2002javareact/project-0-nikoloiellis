export class ReimbursementStatusDTO{

    statusid:number
    status:string

    constructor(
        statusid:number,
        status:string
        ){

            this.statusid = statusid
            this.status = status
        }

}