import React, { FunctionComponent } from 'react'
import { SpecialtyListComponent } from "../SpecialtyListComponent/SpecialtyListComponent"
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'

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