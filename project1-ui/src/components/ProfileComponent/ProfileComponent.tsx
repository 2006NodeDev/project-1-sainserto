import React, { FunctionComponent, useState, useEffect } from "react";
import { User } from '../../models/User'
import { UserDisplayComponent } from "../UserDisplayComponent/UserDisplayComponent";
import { useParams } from "react-router-dom";
import { tutorialhubGetUserById } from "../../remote/tutorialhub-api/tutorialhub-get-by-id";


export const ProfileComponent: FunctionComponent<any> = (props) => {
    let [userProfile, changeUserProfile] = useState<null | User>(null)
    let {userId} = useParams()

    useEffect(()=> {
    let getUser = async () => {
        let userInfo = await tutorialhubGetUserById(userId)
        changeUserProfile(userInfo)
     
        

    }
    if(!userProfile || userProfile.userId !== +userId){
        getUser()
        console.log("userId: " + userId);
    }
})

return (
    (userProfile)?
        <UserDisplayComponent user={userProfile} />
        :
        <div>
            <h3>User Not Found</h3>
        </div>

)


}