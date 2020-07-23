import React, { FunctionComponent, useState, useEffect } from "react"
import { User } from "../../models/User"
import { UserDisplayComponent } from "../UserDisplayComponent/UserDisplayComponent"
import { tutorialhubGetUserByRole } from "../../remote/tutorialhub-api/tutorialhub-get-by-role"
import { useParams } from "react-router"
import { Container } from "@material-ui/core"
import { Grid } from '@material-ui/core'


export const DisplayByRoleComponent: FunctionComponent<any> = (props) => {
    let [allUsers, changeAllUsers] = useState<User[]>([])

    let { role } = useParams()

    useEffect(() => {

        const getUsers = async () => {
            let response = await tutorialhubGetUserByRole(role)
            changeAllUsers(response)
        }

        if (allUsers.length === 0) {
            getUsers()
        }
    })

    let userDisplays = allUsers.map((user) => {
        return <UserDisplayComponent key={`user-key-` + user.userId} user={user} />
    })


    return (
        <div>
            <Container component="main" >

                
                        {userDisplays}
                 
            </Container>
        </div>
    )
}