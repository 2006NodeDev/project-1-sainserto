import React, { FunctionComponent, useState, useEffect } from "react"
import { User } from "../../models/User"
import { UserDisplayComponent } from "../UserDisplayComponent/UserDisplayComponent"
import { tutorialhubGetAllUsers } from "../../remote/tutorialhub-api/tutorialhub-get-all-users"
import { useParams } from "react-router"

export const AllUsersComponent:FunctionComponent<any> = (props) => {
    let [allUsers, changeAllUsers] = useState<User[]>([])


    useEffect(() =>{

        const getUsers = async ()=>{
            let response = await tutorialhubGetAllUsers()
            changeAllUsers(response)
        }

        if(allUsers.length === 0){
            getUsers()
        }
    })

    let userDisplays = allUsers.map((user) =>{
        return <UserDisplayComponent key={`user-key-` + user.userId} user={user}/>    
    })

    return(
        <div>  
            {userDisplays}
        </div>
    )
}