//get all users - admin, fm
import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { UserNotFoundError } from "../errors/UserNotFoundError";
import { UserDTOtoUserConverter } from "../utils/UserDTO-to-User-converter";
import { User } from "../models/User";
// import { UserInputError } from "../errors/UserInputError";
import { BadCredentialsError } from "../errors/BadCredentialsError";
import { UserInputError } from "../errors/UserInputError";
// import { Specialty } from "../models/Specialty";

//create user

export async function saveOneUser(newUser: User): Promise<User> {
    let client: PoolClient

    try {
        client = await connectionPool.connect()
        await client.query('BEGIN;')

        let roleId = await client.query(`select r."role_id" from tutorialhub.roles r where r."role" = $1`, [newUser.role])
        if (roleId.rowCount === 0) {
            throw new Error('Role Not Found')
        }
        roleId = roleId.rows[0].role_id

        let specialtyId = await client.query(`select s."specialty_id" from tutorialhub.specialty s where s."specialty" = $1`, [newUser.specialty])
        if (specialtyId.rowCount === 0) {
            throw new Error('Specialty Not Found')
        }
        specialtyId = specialtyId.rows[0].specialty_id

        let results = await client.query(`insert into tutorialhub.users ("username",
        "password", "first_name", "last_name", "email", "role", "specialty", "phone", "description") 
        values($1,$2,$3,$4,$5,$6,$7,$8,$9) returning "user_id"`,
            [newUser.username, newUser.password, newUser.firstName, newUser.lastName,
            newUser.email, roleId, specialtyId, newUser.phoneNumber, newUser.description])


        newUser.userId = results.rows[0].user_id
        await client.query('COMMIT;')
        return newUser
    } catch (e) {
        client && client.query('ROLLBACK;')
        if (e.message === 'Role Not Found') {
            throw new UserInputError()
        }
        if (e.message === 'Specialty Not Found') {
            throw new UserInputError()
        }
        console.log(e);
        throw new Error('Unhandled Error Occured')

    } finally {
        client && client.release()
    }
}

//get all users

export async function getAllUsers() {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let results: QueryResult = await client.query(`
        
        select u."user_id", 
        u."username", 
        u."password", 
        u."first_name", 
        u."last_name", 
        s."specialty",
        r."role",
        u."email", 
        u."phone", 
        u."description"
        from tutorialhub.users u left join tutorialhub.roles r on u."role" = r."role_id"
	    left join tutorialhub.specialty s on u."specialty" = s."specialty_id";`)

        // (`select u."user_id", 
        // u."username", 
        // u."password", 
        // u."first_name", 
        // u."last_name", 
        // u."email", 
        // u."phone", 
        // u."description", 
        // r."role",
        // array_agg(distinct (c.course)) as courses
        // from tutorialhub.users u 
        // natural join tutorialhub.users_course uc
        // natural join tutorialhub.course c
        // left join tutorialhub.roles r on u."role" = r."role_id"
        // group by u.user_id, r.role_id`)

        return results.rows
        // return results.rows.map(UserDTOtoUserConverter)
        // return UserDTOtoUserConverter(results.rows[0])
    } catch (e) {
        console.log(e);
        throw new Error('Unhandled Error Occured')
    } finally {
        client && client.release()
    }
}

//get users by ID
export async function findUserById(id: number) {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let results: QueryResult = await client.query(`select u."user_id", u."username", u."password" , u."first_name", u."last_name", u."email", r."role_id", r."role", s."specialty_id", s."specialty"
        from tutorialhub.users u left join tutorialhub.roles r on u."role" = r.role_id left join tutorialhub.specialty s on u."specialty" = s.specialty_id where u.user_id = $1 ;`, [id])
        if (results.rowCount === 0) {
            throw new Error('User Not Found')
        } else {
            // return results.rows[0]
            return UserDTOtoUserConverter(results.rows[0])
        }
    } catch (e) {
        if (e.message === 'User Not Found') {
            throw new UserNotFoundError()
        }
        throw new Error('Unimplemented Error Handling')

    } finally {
        client && client.release()
    }
}


//get users by specialty
export async function findUserBySpecialty(specialty: any) {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let results: QueryResult = await client.query(`select u."user_id", u."username", u."password" , u."first_name", u."last_name", u."email", r."role_id", r."role", s."specialty_id", s."specialty"
        from tutorialhub.users u left join tutorialhub.roles r on u."role" = r.role_id left join tutorialhub.specialty s on u."specialty" = s.specialty_id where s."specialty" = $1;`,[specialty])
        if (results.rowCount === 0) {
            throw new Error('User Not Found')
        } else {
            return results.rows.map(UserDTOtoUserConverter)
            // return results.rows[0]
            // return UserDTOtoUserConverter(results.rows[0])
        }
    } catch (e) {
        if (e.message === 'User Not Found') {
            throw new UserNotFoundError()
        }
        throw new Error('Unimplemented Error Handling')

    } finally {
        client && client.release()
    }
}


//logging in
export async function getUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let results = await client.query(`select u."user_id", 
                                        u."username", 
                                        u."password", 
                                        u."first_name", 
                                        u."last_name", 
                                        u."email", 
                                        u."phone",
                                        r."role",
                                        u."description"
                                        from tutorialhub.users u 
                                        left join tutorialhub.roles r on u."role" = r.role_id
                                            where u."username" = $1 and u."password" = $2;`,
            [username, password])
        if (results.rowCount === 0) {
            throw new Error('User Not Found')
        }
        return results.rows[0]
        // return UserDTOtoUserConverter(results.rows[0])

    } catch (e) {
        if (e.message === 'User Not Found') {
            throw new BadCredentialsError()
        }
        console.log(e);
        throw new Error('Unimplemented Error Handling')
    } finally {
        client && client.release()

    }

}


export async function updateUser(user: User): Promise<User> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let userId = await client.query(`select u."user_id", u."username", u."password" , u."first_name", u."last_name", u."email", r."role_id", r."role", s."specialty_id", s."specialty"
        from tutorialhub.users u left join tutorialhub.roles r on u."role" = r.role_id left join tutorialhub.specialty s on u."specialty" = s.specialty_id where u.user_id = $1 ;`, [user.userId])
        if (userId.rowCount === 0) {
            throw new Error('User Not Found')
        } else {
            // return userId.rows
            userId = userId.rows[0].user_id
            // return UserDTOtoUserConverter(userId.rows[0])
        }

        if (user.username != undefined) {
            let updateResults = await client.query(`update tutorialhub.users 
            set "username" = $1 where user_id = $2;`, [user.username, userId])
            console.log(updateResults.rows[0])
        }

        if (user.firstName != undefined) {
            let updateResults = await client.query(`update tutorialhub.users 
            set "first_name" = $1 where user_id = $2;`, [user.firstName, userId])
            console.log(updateResults.rows[0])
        }
        if (user.lastName != undefined) {
            let updateResults = await client.query(`update tutorialhub.users 
            set "last_name" = $1 where user_id = $2;`, [user.lastName, userId])
            console.log(updateResults.rows[0])
        }
        if (user.email != undefined) {
            let updateResults = await client.query(`update tutorialhub.users 
            set "email" = $1 where user_id = $2;`, [user.email, userId])
            console.log(updateResults.rows[0])
        }
        if (user.phoneNumber != undefined) {
            let updateResults = await client.query(`update tutorialhub.users 
            set "phone" = $1 where user_id = $2;`, [user.phoneNumber, userId])
            console.log(updateResults.rows[0])
        }

        if (user.description != undefined) {
            let updateResults = await client.query(`update tutorialhub.users 
            set "description" = $1 where user_id = $2;`, [user.description, userId])
            console.log(updateResults.rows[0])
        }

        if (user.role != undefined) {
            let roleId = await client.query(`select r.role_id from tutorialhub.roles r where r.role = $1`, [user.role])

            if (roleId.rowCount === 0) {
                throw new Error('Role Not Found.')
            }
            roleId = roleId.rows[0].role_id

            let updateResults = await client.query(`update tutorialhub.users 
            set "role" = $1 where user_id = $2;`, [roleId, userId])
            console.log(updateResults.rows[0])
        }


        if (user.specialty != undefined) {
            console.log("found specialty");

            let specialtyId = await client.query(`select s.specialty_id from tutorialhub.specialty s where s.specialty = $1`, [user.specialty])

            if (specialtyId.rowCount === 0) {
                throw new Error('Specialty Not Found.')
            }
            specialtyId = specialtyId.rows[0].specialty_id

            let updateResults = await client.query(`update tutorialhub.users 
            set "specialty" = $1 where user_id = $2;`, [specialtyId, userId])
            console.log(updateResults.rows[0])
        }

        let result: QueryResult = await client.query(`select u.user_id, u.username , u."password", u.first_name,
        u.last_name, u.email ,r.role_id , r."role", s."specialty" from tutorialhub.users u left join tutorialhub.roles r on u."role" = r.role_id 
        left join tutorialhub.specialty s on u."specialty" = s."specialty_id"
        where u.user_id = $1;`, [userId])
        await client.query('COMMIT;')
        return UserDTOtoUserConverter(result.rows[0])
        // return result.rows[0]

    } catch (e) {
        if (e.message === 'User Not Found') {
            throw new UserNotFoundError()
        }
        throw new Error(e)

    } finally {
        client && client.release()
    }
}
