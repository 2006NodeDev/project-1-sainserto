import { tutorialhubClient } from "."

export const tutorialhubLogin = async(username:string, password:string) => {
    let credentials = {
        username,
        password
    }
    try{
        let response = await tutorialhubClient.post('/login', credentials)
        console.log(response)
        return response.data
    } catch(e){
        console.log(e);    
        return("Failed to Log In")
    }
}