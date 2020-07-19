import React, { FunctionComponent, useState, useEffect } from "react"
import { User } from "../../models/User"
import { UserDisplayComponent } from "../UserDisplayComponent/UserDisplayComponent"
import { tutorialhubGetUserBySpecialty } from "../../remote/tutorialhub-api/tutorialhub-get-by-specialty"
import { useParams } from "react-router"

export const DisplayBySpecialtyComponent:FunctionComponent<any> = (props) => {
    let [allUsers, changeAllUsers] = useState<User[]>([])

    let {specialty} = useParams()

    useEffect(() =>{

        const getUsers = async ()=>{
            let response = await tutorialhubGetUserBySpecialty(specialty)
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