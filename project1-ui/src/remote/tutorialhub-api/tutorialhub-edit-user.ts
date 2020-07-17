import { tutorialhubClient } from ".";
import { User } from "../../models/User";


export const tutorialhubEditUser = async (editUser:User) => {

    try{
        let response = await tutorialhubClient.patch('/users', editUser)
        console.log(response);
        return response.data
    } catch(e){
        console.log(e);
    }
}