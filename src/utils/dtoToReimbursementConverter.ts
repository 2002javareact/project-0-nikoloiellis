
import { Reimbursement } from "../models/reimbursement";
import { ReimbursementDTO } from "../dto/ReimbursementDTO";


export function reimbursementDTOToReimbursementConverter(reimbursementDTO:ReimbursementDTO):Reimbursement{
    return new Reimbursement(
        reimbursementDTO.reimbursementid,
        reimbursementDTO.author,
        reimbursementDTO.amount,
        reimbursementDTO.datesubmitted,
        reimbursementDTO.dateresolved,
        reimbursementDTO.description,
        reimbursementDTO.resolver,
        reimbursementDTO.status,
        reimbursementDTO.type
    )
}