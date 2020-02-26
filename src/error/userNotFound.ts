import { HttpError } from "./httpError";

export class UserNotFoundError extends HttpError {
    constructor(){
        super('User Not Found', 404)
    }
}