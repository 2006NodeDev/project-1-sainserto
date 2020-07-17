import { FunctionComponent, useState, SyntheticEvent } from "react"
import { Button, TextField } from '@material-ui/core'
import { Grid, makeStyles, Container } from '@material-ui/core'
import { useParams } from 'react-router'
import { User } from '../../models/User'
import React from 'react'
import { toast } from "react-toastify"
import { tutorialhubEditUser } from "../../remote/tutorialhub-api/tutorialhub-edit-user"
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select';




const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    grid: {
        padding: theme.spacing(5),
        margin: 'auto',
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        flexWrap: 'wrap',

    },
    fixedHeight: {
        height: 600,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'red',
        color: 'black',
        fontFamily: 'Impact',
        fontSize: 16,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export const EditUserComponent:FunctionComponent<any> = (props) =>{

    const classes = useStyles();

    const {userId} = useParams()
    let [username, changeUsername] = useState('')
    let [password, changePassword] = useState('')
    let [confirmPassword, changeConfirmPassword] = useState('')
    let [firstName, changeFirstName] = useState('')
    let [lastName, changeLastName] = useState('')
    let [email, changeEmail] = useState('')
    let [phoneNumber, changePhoneNumber] = useState('')
    let [role, changeRole] = useState('')
    let [specialty, changeSpecialty] = useState('')
    let [description, changeDescription] = useState('')


    const [currentUser, changeCurrentUser] = useState(null)

    const updateUsername = (e: any) => {
        e.preventDefault()
        changeUsername(e.currentTarget.value)
    }

    const updatePassword = (e: any) => {
        e.preventDefault()
        changePassword(e.currentTarget.value)
    }

    const updateFirstName = (e: any) => {
        e.preventDefault()
        changeFirstName(e.currentTarget.value)
    }

    const updateLastName = (e: any) => {
        e.preventDefault()
        changeLastName(e.currentTarget.value)
    }

    const updateEmail = (e: any) => {
        e.preventDefault()
        changeEmail(e.currentTarget.value)
    }

    const updatePhoneNumber = (e: any) => {
        e.preventDefault()
        changePhoneNumber(e.currentTarget.value)
    }

    const updateRole = (e: any) => {
        e.preventDefault()
        changeRole(e.currentTarget.value)
    }

    const updateSpecialty = (e: any) => {
        e.preventDefault()
        changeSpecialty(e.currentTarget.value)
    }

    const updateDescription = (e: any) => {
        e.preventDefault()
        changeDescription(e.currentTarget.value)
    }

    const editUserSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
    
            let editUser: User = {
                userId: props.user.userId,
                username,
                password,
                firstName,
                lastName,
                email,
                phoneNumber,
                description,
                role,
                specialty
            }

            try {
                let res = await tutorialhubEditUser(editUser)
                console.log(editUser);
                props.history.push(`/profile/${userId}`)

            } catch (error) {
                console.log(error);
            }

        
    }

    return(
        <div>
             <Container maxWidth="lg" className={classes.container}>
                <form className={classes.form} autoComplete="off" onSubmit={editUserSubmit}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6} md={12} lg={6} className={classes.grid}>
                        <TextField label="Username" value={username} onChange={updateUsername} />
                                    <TextField label="Password" type="password" value={password} onChange={updatePassword} />
                                    {/* <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={updateConfirmPassword} /> */}
                                    <TextField label="First Name" value={firstName} onChange={updateFirstName} />
                                    <TextField label="Last Name" value={lastName} onChange={updateLastName} />
                                    <TextField type="email" label="Email" value={email} onChange={updateEmail} />
                                    <TextField label="Phone" type="tel" value={phoneNumber} onChange={updatePhoneNumber} />
                                    {/* <TextField type="text" label="Role" value={role} onChange={updateRole} /> */}

                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="age-native-simple">Role</InputLabel>
                                        <Select
                                            native
                                            value={role}
                                            onChange={updateRole}
                                            inputProps={{
                                                name: 'age',
                                                id: 'age-native-simple',
                                            }}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value="tutor">Tutor</option>
                                            <option value="student">Student</option>
                                        </Select>
                                    </FormControl>

                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="age-native-simple">Specialty</InputLabel>
                                        <Select
                                            native
                                            value={specialty}
                                            onChange={updateSpecialty}
                                            inputProps={{
                                                name: 'age',
                                                id: 'age-native-simple',
                                            }}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value="None">None</option>

                                            <option value="JavaScript">JavaScript</option>
                                            <option value="Java">Java</option>
                                            <option value="SQL">SQL</option>
                                            <option value="React">React</option>
                                            <option value="Google Cloud Platform">GCP</option>

                                        </Select>
                                    </FormControl>

                                    {/* <TextField label="Specialty" value={specialty} onChange={updateSpecialty} /> */}
                                    <TextField label="Description" value={description} onChange={updateDescription} />
                                    <Button type='submit' variant="contained" color="primary">Update</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    )
}