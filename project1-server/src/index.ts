
import express, { Request, Response, NextFunction } from 'express'
import { sessionMiddleware } from './middleware/session-middleware'
import { corsFilter } from './middleware/cors-filter'
import { loggingMiddleware } from './middleware/logging-middleware'
import { userRouter } from './routers/user-router'
import { getUserByUsernameAndPassword } from './daos/SQL/user-dao'
import { BadCredentialsError } from './errors/BadCredentialsError'

const app = express()
// app.use(express.json())
app.use(express.json({limit:'50mb'}))
app.use(loggingMiddleware)
app.use(corsFilter)
app.use(sessionMiddleware)

app.use('/users', userRouter)

app.get('/health', (req:Request, res:Response) => {
    res.sendStatus(200)
})

app.post('/login', async(req:Request, res:Response, next:NextFunction) => {
    let username = req.body.username
    let password = req.body.password
    if(!username && !password){
        throw new BadCredentialsError()
    } else {
        try{
            let user = await getUserByUsernameAndPassword(username,password)
            req.session.user = user
            res.json(user)
        }catch(e){
            next(e)
        }
    }
})

app.use((err,req,res,next) => { 
    if(err.statusCode){
        res.status(err.statusCode).send(err.message)
    } else {
        console.log(err);
        res.status(500).send('Oops, Something went wrong')
    }
})


app.use('/', (req,res)=>{
	res.send('Hello World')
}) 

app.listen(2006, () =>{
    console.log('Listening on port 2006');
})