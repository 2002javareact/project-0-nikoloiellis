import { Pool } from 'pg';


export const connectionPool:Pool = new Pool({
    host: `database-1.csobajakcyx9.us-east-2.rds.amazonaws.com`,//endpoint for db
    user: `postgres`,//user name
    password:`myhero900`,//user password
    database:`database1`,//db name
    port:5432,
    max:5
});