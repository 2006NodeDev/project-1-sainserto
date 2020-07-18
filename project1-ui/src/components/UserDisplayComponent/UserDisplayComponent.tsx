import React, { FunctionComponent, SyntheticEvent } from 'react'
import { User } from '../../models/User'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

interface IUserDisplayProps{
    user:User
}




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(2),
        width: theme.spacing(20),
        height: theme.spacing(17),
      },
    },
    paper:{
        backgroundColor:'#cccccc' 
    }
  }),
);


const editProfile = async (e: SyntheticEvent) => {
   // props.history.push(`edit/${user.userId}`)
}


export const UserDisplayComponent:FunctionComponent<IUserDisplayProps> = (props)=>{
    let classes = useStyles()
    return(
        <div className={classes.root}>
            <Paper className={classes.paper}elevation={4}>

            <Typography variant='body1'>
                   Name: {props.user.firstName} {props.user.lastName}
                </Typography>

                <Typography variant='body1'>
                   {props.user.role} : {props.user.specialty}
                </Typography>

            <Typography variant='body1'>
                   About me : {props.user.description}
                </Typography>
            <Typography variant='body1'>
                   Username : {props.user.username}  
                </Typography>
                <Typography variant='body1'>
                   Email : {props.user.email}
                </Typography>
                <Typography variant='body1'>
                   Phone : {props.user.phoneNumber}
                </Typography>
              
        
               {/* <form onSubmit={editProfile}>
                <Button variant='contained' color='inherit'>Edit</Button>

               </form> */}
            </Paper>
        </div>
    )
}