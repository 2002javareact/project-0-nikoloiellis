import * as express from 'express';
import * as bodyparser from 'body-parser';
import { loggingMiddleware } from './middleware/logging_middleware';
import { sessionMiddleware } from './middleware/session_middleware';
import { findUserByUsernameAndPassword,findUserRoleByUsername,SendReimbursements} from './services/user_service';
import { authCheckId } from './middleware/auth-midleware';
import { userRouter } from './routers/user-router';
import { remRouter } from './routers/rem-router';




const app = express();
app.use('/', bodyparser.json());
app.use(sessionMiddleware)
console.log('after session');

app.use('/users', userRouter)
app.use('/reimbursements', remRouter)
app.post('/login', async (req,res)=>{
    //step one, get data from user
    const {username, password} = req.body
    //step two, validate that data
    console.log(username + password)
    req.body.user
    req.body.role
    if(!username || !password){
        res.status(400).send('Please Include Username and Password')
    } else {
        try {
            let user = await findUserByUsernameAndPassword(username,password)
             req.session.user = user// adds an object for us to use for auth
             req.session.user.role = user.role
             res.status(200).json(user) // we do this for ourselves, when we start working on front end
            
          
        } catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

// import * from express-crypto
// const app = express();
// const crypto = require('express-crypto');

// .
// .

// app.use(crypto({ secret: 'secret123' }, app));



app.listen(2002, ()=>{
    console.log('app has started on port 2002');
})