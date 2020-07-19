import { tutorialhubClient } from "."

export const tutorialhubGetUserByRole = async (role:string) =>{
    try{
        let response = await tutorialhubClient.get(`/users/role/${role}`)
        return response.data
    }catch(e){
        console.log(e);
        console.log("handle this later");
    }

}