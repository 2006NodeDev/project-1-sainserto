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
        margin: theme.spacing(1),
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
                <Typography variant='body1'>
                   First Name : {props.user.firstName}
                </Typography>
                <Typography variant='body1'>
                   Last Name : {props.user.lastName}
                </Typography>
                <Typography variant='body1'>
                   Role : {props.user.role}
                </Typography>
                <Typography variant='body1'>
                   Specialty : {props.user.specialty}
                </Typography>
               <form onSubmit={editProfile}>
                <Button variant='contained' color='inherit'>Edit</Button>

               </form>
            </Paper>
        </div>
    )
}