//get all users - admin, fm
import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { UserNotFoundError } from "../errors/UserNotFoundError";
import { UserDTOtoUserConverter } from "../utils/UserDTO-to-User-converter";
import { User } from "../models/User";
// import { UserInputError } from "../errors/UserInputError";
import { BadCredentialsError } from "../errors/BadCredentialsError";
import { UserInputError } from "../errors/UserInputError";

//create user

export async function saveOneUser(newUser: User): Promise<User> {
    let client: PoolClient

    try {
        client = await connectionPool.connect()
        await client.query('BEGIN;')

        let roleId = await client.query(`select r."role_id" from reimburzonedata.roles r 
                                        where r."role" = $1`, [newUser.role])
        if (roleId.rowCount === 0) {
            throw new Error('Role Not Found')
        }

        roleId = roleId.rows[0].role_id

        let results = await client.query(`insert into reimburzonedata.users ("username",
        "password", "first_name", "last_name", "email", "role") 
        values($1,$2,$3,$4,$5,$6) returning "user_id"`,
            [newUser.username, newUser.password, newUser.firstName, newUser.lastName,
            newUser.email, roleId])
        newUser.userId = results.rows[0].user_id
        await client.query('COMMIT;')
        return newUser
    } catch (e) {
        client && client.query('ROLLBACK;')
        if (e.message === 'Role Not Found') {
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
        let results: QueryResult = await client.query(`select u."user_id", u."username", u."password" , u."first_name", u."last_name", u."email", r."role_id", r."role"
        from reimburzonedata.users u left join reimburzonedata.roles r on u."role" = r.role_id;`)
        // return results.rows
        return results.rows.map(UserDTOtoUserConverter)
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
        let results: QueryResult = await client.query(`select u."user_id", u."username", u."password" , u."first_name", u."last_name", u."email", r."role_id", r."role"
        from reimburzonedata.users u left join reimburzonedata.roles r on u."role" = r.role_id where u.user_id = $1;`, [id])
        if (results.rowCount === 0) {
            throw new Error('User Not Found')
        } else {
            // return results.rows
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

//logging in
export async function getUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let results = await client.query(`select u."user_id", u."username", u."password" , u."first_name", u."last_name", u."email", r."role_id", r."role"
      from reimburzonedata.users u left join reimburzonedata.roles r on u."role" = r.role_id
      where u."username" = $1 and u."password" = $2;`, [username, password])
        if (results.rowCount === 0) {
            throw new Error('User Not Found')
        }
        return UserDTOtoUserConverter(results.rows[0])

    } catch (e) {
        if (e.message === 'User Not Found') {
            throw new BadCredentialsError()
        }
        console.log();
        throw new Error('Unimplemented Error Handling')
    } finally {
        client && client.release()

    }

}



export async function updateUser(user:User): Promise<User> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let userId = await client.query(`select u."user_id", u."username", u."password" , u."first_name", u."last_name", u."email", r."role_id", r."role"
        from reimburzonedata.users u left join reimburzonedata.roles r on u."role" = r.role_id where u.user_id = $1;`, [user.userId])
        if (userId.rowCount === 0) {
            throw new Error('User Not Found')
        } else {
            // return userId.rows
            userId = userId.rows[0].user_id
            // return UserDTOtoUserConverter(userId.rows[0])
        }

        if(user.username != undefined){
            let updateResults = await client.query(`update reimburzonedata.users 
            set "username" = $1 where user_id = $2;`,[user.username, userId])
            console.log(updateResults.rows[0])
        }

        if(user.firstName != undefined){
            console.log("in the firstName")
            let updateResults = await client.query(`update reimburzonedata.users 
            set "first_name" = $1 where user_id = $2;`,[user.firstName, userId])
            console.log(updateResults.rows[0])
        }
        if(user.lastName != undefined){
            console.log("in the lastName")
            let updateResults = await client.query(`update reimburzonedata.users 
            set "last_name" = $1 where user_id = $2;`,[user.lastName, userId])
            console.log(updateResults.rows[0])
        }
        if(user.email != undefined){
            console.log("in the email")
            let updateResults = await client.query(`update reimburzonedata.users 
            set "email" = $1 where user_id = $2;`,[user.email, userId])
            console.log(updateResults.rows[0])
        }

        if(user.role != undefined){
            console.log("in the role")
            let roleId = await client.query('select r.role_id from reimburzonedata.roles r where r.role = $1', [user.role])
            
            if(roleId.rowCount === 0){
                throw new Error('Role Not Found.')
            }
            roleId = roleId.rows[0].role_id

            let updateResults = await client.query(`update reimburzonedata.users 
            set "role" = $1 where user_id = $2;`,[roleId, userId])
            console.log(updateResults.rows[0])
        }

        let result:QueryResult = await client.query(`select u.user_id, u.username , u."password", u.first_name,
        u.last_name, u.email ,r.role_id , r."role" from reimburzonedata.users u left join reimburzonedata.roles r on u."role" = r.role_id 
        where u.user_id = $1;`,
        [userId])
        await client.query('COMMIT;')
        return UserDTOtoUserConverter(result.rows[0])



    } catch (e) {
        if (e.message === 'User Not Found') {
            throw new UserNotFoundError()
        }
        throw new Error('Unimplemented Error Handling')

    } finally {
        client && client.release()
    }
}
