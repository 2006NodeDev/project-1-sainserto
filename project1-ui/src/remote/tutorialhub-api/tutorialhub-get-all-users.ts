import { tutorialhubClient } from "."

export const tutorialhubGetAllUsers = async () =>{
    try{
        let response = await tutorialhubClient.get('/users')
        return response.data
    }catch(e){
        console.log(e);
        console.log('To be handled');
        
        
    }
}