import {HttpError} from "./httpError";


export class BadCredentialsError extends HttpError {
    constructor() {
        super("Invalid Credentials", 400);
    }
}