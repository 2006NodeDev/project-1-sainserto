import React, { FunctionComponent, useState, useEffect, SyntheticEvent } from "react";
import { User } from '../../models/User'
import { UserDisplayComponent } from "../UserDisplayComponent/UserDisplayComponent";
import { useParams, Link } from "react-router-dom";
import { tutorialhubGetUserById } from "../../remote/tutorialhub-api/tutorialhub-get-by-id";
import { Button } from "@material-ui/core";


export const ProfileComponent: FunctionComponent<any> = (props) => {
    let [userProfile, changeUserProfile] = useState<null | User>(null)
    let { userId } = useParams()

    useEffect(() => {
        let getUser = async () => {
            let userInfo = await tutorialhubGetUserById(userId)
            changeUserProfile(userInfo)
        }
        if (!userProfile || userProfile.userId !== +userId) {
            getUser()
            console.log("userId: " + userId);
        }
    })


    return (
        (userProfile) ?
            <div>
                <UserDisplayComponent user={userProfile} />

                <Button variant='contained' color='inherit' component={Link} to={`edit/${(props.user) ? props.user.userId : '0'}`}>Edit</Button>
            </div>
            :
            <div>
                <h3>User Not Found</h3>
            </div>

    )


}