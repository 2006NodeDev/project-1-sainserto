import express, { Request, Response, NextFunction } from 'express'
import { User } from '../models/User'
import { UserIdInputError } from '../errors/UserIdInputError'
import { UserInputError } from '../errors/UserInputError'
import { UserNotFoundError } from '../errors/UserNotFoundError'
import { saveOneUserService, findUserByRoleService, findUserBySpecialtyService, findUserByIDService, getAllUsersService, updateUserService } from '../services/user-service'
import { authenticationMiddleware } from '../middleware/authentication-middleware'
import { authorizationMiddleware } from '../middleware/authorization-middleware'

export const userRouter = express.Router()
// userRouter.use(authenticationMiddleware)

userRouter.get('/', authenticationMiddleware, authorizationMiddleware(['admin']), async (req: Request, res: Response, next: NextFunction) => {

    try {
        let allUsers = await getAllUsersService()
        res.json(allUsers)
    } catch (e) {
        next(e)
    }
})

userRouter.get('/:id', authenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.session.user.role)
    console.log(req.session.user.user_id)

    let { id } = req.params
    if (isNaN(+id)) {
        next(new UserIdInputError())
    } else {
        try {
            let user = await findUserByIDService(+id)
            res.json(user)
        } catch (e) {
            next(new UserNotFoundError())
        }
    }
})

//get users by specialty

userRouter.get('/specialty/:specialty', authenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    let { specialty } = req.params
    try {
        let user = await findUserBySpecialtyService(specialty)
        res.json(user)
    } catch (e) {
        next(new UserNotFoundError())
    }
})

//get users by role

userRouter.get('/role/:role', authenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    let { role } = req.params
    try {
        let user = await findUserByRoleService(role)
        res.json(user)
    } catch (e) {
        next(new UserNotFoundError())
    }
})

//create user
// userRouter.post('/', authorizationMiddleware(['admin']), async (req: Request, res: Response, next: NextFunction) => {
userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {


    let { username, password, firstName, lastName, email, role, phone, specialty, description, image } = req.body
    if (!username || !password || !firstName || !lastName || !email || !phone || !role) {
        next(new UserInputError)
    } else {
        let newUser: User = {
            username,
            password,
            firstName,
            lastName,
            email,
            role,
            phone,
            specialty,
            description,
            userId: 0,
            image
        }
        newUser.role = role || "student"
        newUser.specialty = specialty || "none"

        if(newUser.role = "student"){
            newUser.specialty = "none"
        }else{
            newUser.specialty = specialty || "none"
        }

        try {
            let savedUser = await saveOneUserService(newUser)
            // res.sendStatus(201).json(savedUser)
            res.json(savedUser)
        } catch (e) {
            next(e)
            console.log("DIDNT SAVE");


        }
    }
})


//update user

userRouter.patch('/', authenticationMiddleware, async (req:Request, res:Response, next: NextFunction) => {

    let{userId, username, password, firstName, lastName, email, phone, role, specialty, description, image} = req.body
    if(userId){
        let user: User = {
            username,
            userId,
            password,
            firstName,
            lastName,
            email,
            phone,
            role,
            specialty,
            description,
            image
        }

        user.username = username || undefined
        user.firstName = firstName || undefined
        user.lastName = lastName || undefined
        user.password = password || undefined
        user.email = email || undefined
        user.phone = phone || undefined
        user.role = role || undefined
        user.description = description || undefined
        if(user.role = "student"){
            user.specialty = "none" || undefined
        }else{
            user.specialty = specialty || "none"
        }

        if(req.session.user.user_id == userId || req.session.user.role === 'admin'){
        try{
            await updateUserService(user)
            res.json(user)
            console.log("user updated" + user);
            
        }catch(e){
            next(e)
        }
    } else{
        res.status(400).send("You are not authorized to perform this action")
    }
    }else if((!userId)){
        res.status(400).send("No user ID provided")
    }
})
