import { tutorialhubClient } from "."

export const tutorialhubGetUserById = async (userId:number) =>{
    try{
        let response = await tutorialhubClient.get(`/users/${userId}`)
        return response.data
    }catch(e){
        console.log(e);
        throw new Error("Unimplemented Error Handling")
    }

}