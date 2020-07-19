import express, { Request, Response, NextFunction } from 'express'
import { User } from '../models/User'
import { UserIdInputError } from '../errors/UserIdInputError'
// import { authenticationMiddleware } from '../middleware/authentication-middleware'
// import { authorizationMiddleware } from '../middleware/authorization-middleware'
// import { getAllUsers, updateUser, saveOneUser, findUserById, findUserBySpecialty, findUserByRole } from '../daos/SQL/user-dao'
// import { UserNotFoundError } from '../errors/UserNotFoundError'
import { UserInputError } from '../errors/UserInputError'
// import { UserNotFoundError } from '../errors/UserNotFoundError'
// import { authenticationMiddleware } from '../middleware/authentication-middleware'
import { UserNotFoundError } from '../errors/UserNotFoundError'
import { saveOneUserService, updateUserService, findUserByRoleService, findUserBySpecialtyService, findUserByIDService, getAllUsersService } from '../services/user-service'

export const userRouter = express.Router()
// userRouter.use(authenticationMiddleware)

// get ALL users -- admin, fm
// userRouter.get('/', authorizationMiddleware(['admin', 'finance-manager']), async (req: Request, res: Response, next: NextFunction) => {
    
userRouter.get('/',  async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        let allUsers = await getAllUsersService()
        res.json(allUsers)
    } catch (e) {
        next(e)
    }
})

//get User by id -- admin, fm, current user if theyre looking for themselves
// userRouter.get('/:id', authorizationMiddleware(['admin', 'finance-manager', 'user']), async (req: Request, res: Response, next: NextFunction) => {

// userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    
// let { id } = req.params
//     if (isNaN(+id)) {
//         next(new UserIdInputError())
//     } else if (req.session.user.role.role === 'tutor' || req.session.user.role.role === 'admin') {
//         try {
//             let user = await findUserById(+id)
//             res.json(user)
//         } catch (e) {
//             next(new UserNotFoundError())
//         }
//     } else if (req.session.user.role.role === 'user') {
//         try {
//             let user = await findUserById(+id)
//             if (req.session.user.userId === user.userId) {
//                 res.json(user)
//             } else {
//                 res.status(401).send('The incoming token has expired')
//             }
//         } catch (e) {
//             next(new UserNotFoundError)
//         }
//     }
// })

// userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
//     let { id } = req.params
//     if (isNaN(+id)) {
//         // send a response telling them they need to give us a number
//         res.status(400).send('Id needs to be a number')// the error way is better because it scales easier, fewer places you have to change code if you want to refactor
//     } else {
//         try {
//             let user = await findUserById(+id)
//             res.json(user)
//         } catch (e) {
//             next(e)
//         }
//     }
// })


userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    // console.log("username:" + req.session.user.username + "role:" + req.session.user.role.role + "specialty"+ req.session.user.specialty.specialty);
    console.log(req.session.user.role)
    console.log(req.session.user.user_id)

    let { id } = req.params
        if (isNaN(+id)) {
            next(new UserIdInputError())
        } else if (req.session.user.role === 'admin') {
            try {
                let user = await findUserByIDService(+id)
                res.json(user)
            } catch (e) {
                next(new UserNotFoundError())
            }
        } else if (req.session.user.role === 'tutor' || req.session.user.role === 'student') {
            try {
                let user = await findUserByIDService(+id)
                if (req.session.user.user_id === user.userId) {
                    res.json(user)
                } else {
                    res.status(401).send('The incoming token has expired')
                }
            } catch (e) {
                next(new UserNotFoundError)
            }
        }
    })

//get users by specialty

userRouter.get('/specialty/:specialty', async (req: Request, res: Response, next: NextFunction) => {
    let { specialty } = req.params
            try {
                let user = await findUserBySpecialtyService(specialty)
                res.json(user)
            } catch (e) {
                next(new UserNotFoundError())
            }
    })

//get users by role

userRouter.get('/role/:role', async (req: Request, res: Response, next: NextFunction) => {
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


    let { username, password, firstName, lastName, email, role, phone, specialty, description, image} = req.body
    if (!username || !password || !firstName || !lastName || !email || !phone || !role) {
        next(new UserInputError)
        // console.log('YOU DIDNT FILL OUT ALL FIELDS');
        
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
            userId:0,
            image
        }
        newUser.role = role || "student"
        newUser.specialty = specialty || "none"

        try {
            let savedUser = await saveOneUserService(newUser)
            // res.sendStatus(201).json(savedUser)
            res.json(savedUser)
        } catch (e) {
            next(e)
            // next(new UserInputError)
            console.log("DIDNT SAVE");
            

        }
    }
})


//update user

userRouter.patch('/', async (req: Request, res: Response, next: NextFunction) => {

    // let { username, password, firstName, lastName, email, role } = req.body
    let newUser: User = {
        userId: req.body.userId,
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        phone: req.body.phone,
        specialty: req.body.specialty,
        description: req.body.description,
        image:req.body.image
    }
    let id = newUser.userId
    if (isNaN(id)) {
        next(new UserIdInputError)
    }
    try {
        let savedUser = await updateUserService(newUser)
        res.json(savedUser)
    } catch (e) {
        console.log(e)
        next(e)
    }
})