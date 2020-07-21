import { getAllUsers, findUserById, saveOneUser, findUserBySpecialty, findUserByRole, getUserByUsernameAndPassword, updateUser } from "../daos/SQL/user-dao";
import { User } from "../models/User";
import { saveProfilePicture } from "../daos/Cloud Storage/user-images";
import { bucketBaseUrl } from "../daos/Cloud Storage";
import { expressEventEmitter, customExpressEvents } from "../event-listeners";

export async function getAllUsersService(): Promise<User[]> {
    return await getAllUsers()
}

export async function getUserByUserNameAndPasswordService(username:string, password:string):Promise<User>{
    return await getUserByUsernameAndPassword(username, password)
}

export async function findUserByIDService(id: number): Promise<User> {
    return await findUserById(id)
}

export async function findUserByRoleService(role: any): Promise<User[]> {
    return await findUserByRole(role)
}

export async function findUserBySpecialtyService(specialty: any): Promise<User[]> {
    return await findUserBySpecialty(specialty)
}

export async function saveOneUserService(newUser: User): Promise<User> {
    try {
        let base64Image = newUser.image
        let [dataType, imageBase64Data] = base64Image.split(';base64,')
        let contentType = dataType.split('/').pop()

        if (newUser.image) {
            newUser.image = `${bucketBaseUrl}/users/${newUser.username}/profile.${contentType}`
        }

        let savedUser = await saveOneUser(newUser)
        await saveProfilePicture(contentType, imageBase64Data, `users/${newUser.username}/profile.${contentType}`)
        expressEventEmitter.emit(customExpressEvents.NEW_USER, newUser)
        return savedUser

    } catch (e) {
        console.log(e);
        throw e
    }
}

export async function updateUserService(user: User): Promise<User> {
    expressEventEmitter.emit(customExpressEvents.NEW_USER, user) 
    return await updateUser(user)
}