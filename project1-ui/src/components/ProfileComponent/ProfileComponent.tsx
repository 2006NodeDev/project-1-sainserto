import React, { FunctionComponent, useState, useEffect, SyntheticEvent } from "react";
import { User } from '../../models/User'
import { UserDisplayComponent } from "../UserDisplayComponent/UserDisplayComponent";
import { useParams, Link } from "react-router-dom";
import { tutorialhubGetUserById } from "../../remote/tutorialhub-api/tutorialhub-get-by-id";
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    mainButton: {
        backgroundColor: "#A74482",
        fontSize: 16,
        margin: theme.spacing(3, 0, 2),
        '&:hover': {
            backgroundColor: "#422951"
        }
    }

}))

export const ProfileComponent: FunctionComponent<any> = (props) => {
    let [userProfile, changeUserProfile] = useState<null | User>(null)
    let { userId } = useParams()
    const classes = useStyles();


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

            <UserDisplayComponent user={userProfile} />
            :
            <div>
                <h3>User Not Found</h3>
            </div>

    )


}