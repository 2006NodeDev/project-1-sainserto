import { tutorialhubClient } from "."

export const tutorialhubGetUserById = async (userId:number) =>{
    try{
        let response = await tutorialhubClient.get(`/users/${userId}`)
        return response.data
    }catch(e){
        console.log(e);
        console.log("handle this later");
    }

}