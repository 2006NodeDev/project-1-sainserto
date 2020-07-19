import { tutorialhubClient } from "."

export const tutorialhubGetUserBySpecialty = async (specialty:string) =>{
    try{
        let response = await tutorialhubClient.get(`/users/specialty/${specialty}`)
        return response.data
    }catch(e){
        console.log(e);
        console.log("handle this later");
    }

}