import { tutorialhubClient } from ".";
import { User } from "../../models/User";

export const tutorialhubSaveUser = async (newUser:User) => {

    try{
        let response = await tutorialhubClient.post('/users', newUser)
        console.log(response)
        return response.data
    } catch (e) {
        console.log(e);
        throw e
    }
}