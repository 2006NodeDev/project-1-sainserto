import { tutorialhubClient } from "."

export const tutorialhubSignUp = async(username:string, password:string) => {
    let credentials = {
        username,
        password
    }
    try{
        let response = await tutorialhubClient.post('/users', credentials)
        console.log(response)
        return response.data
    } catch(e){
        console.log(e);    
    }
}