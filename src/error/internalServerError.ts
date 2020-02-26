import { HttpError } from "./httpError";

export class InternalServerError extends HttpError {
    constructor(){
        super('Internal Server Error', 500);;
    }
} 