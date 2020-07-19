import React, { FunctionComponent } from 'react'
import { SpecialtyListComponent } from "../SpecialtyListComponent/SpecialtyListComponent"
import { Button, Typography } from '@material-ui/core'
import { ProfileComponent } from '../ProfileComponent/ProfileComponent'
import { NavBarComponent } from '../NavBarComponent/NavBarComponent'

export const HomeComponent:FunctionComponent<any> = (props) =>{
    return(
        <div>
            <Typography paragraph>
                    WELOME TO TUTORIAL HUB
          </Typography>
            <SpecialtyListComponent/>
            
       </div>
    )
}