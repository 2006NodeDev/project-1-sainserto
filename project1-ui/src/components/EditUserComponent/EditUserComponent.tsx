import { FunctionComponent, useState, SyntheticEvent } from "react"
import { TextField, IconButton } from '@material-ui/core'
import Button from '@material-ui/core/Button'

import { Grid, makeStyles, Container } from '@material-ui/core'
import { useParams, RouteComponentProps } from 'react-router'
import { User } from '../../models/User'
import React from 'react'
import { toast } from "react-toastify"
import { tutorialhubEditUser } from "../../remote/tutorialhub-api/tutorialhub-edit-user"
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select';
import PhotoCamera from '@material-ui/icons/PhotoCameraRounded'

interface ILogInProps extends RouteComponentProps{
    user:User
}

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
    mainButton: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#5A189A",
        fontSize: 16,
        color: "white",
        '&:hover': {
          backgroundColor: "#3C096C"
        }
    },
}));


export const EditUserComponent: FunctionComponent<any> = (props) => {
    // let currentUserId = props.user.userId
    const classes = useStyles();

    const {userId} = useParams()
    let [username, changeUsername] = useState('')
    let [password, changePassword] = useState('')
    let [confirmPassword, changeConfirmPassword] = useState('')
    let [firstName, changeFirstName] = useState('')
    let [lastName, changeLastName] = useState('')
    let [email, changeEmail] = useState('')
    let [phone, changePhone] = useState('')
    let [role, changeRole] = useState('')
    let [specialty, changeSpecialty] = useState('')
    let [description, changeDescription] = useState('')
    let [image, changeImage] = useState(undefined)


    // const [currentUser, changeCurrentUser] = useState(null)
    

    const updateUsername = (e: any) => {
        e.preventDefault()
        if (e.currentTarget.value !== undefined) {
            changeUsername(e.currentTarget.value)
        } else {
            changeUsername(e.currentTarget.username) 
        }
    }

    const updatePassword = (e: any) => {
        e.preventDefault()
        if (e.currentTarget.value !== undefined) {
            changePassword(e.currentTarget.value)
        } else {
            changePassword(e.currentTarget.password)
        }
    }

    const updateFirstName = (e: any) => {
        e.preventDefault()
        if (e.currentTarget.value !== undefined) {
            changeFirstName(e.currentTarget.value)
        } else {
            changeFirstName(e.currentTarget.firstName)
        }
    }

    const updateLastName = (e: any) => {
        e.preventDefault()
        // if (e.currentTarget.value !== undefined) {
            changeLastName(e.currentTarget.value)
        // } else {
        //     changeLastName(e.currentTarget.lastName)
        // }
    }

    const updateEmail = (e: any) => {
        e.preventDefault()
        // if (e.currentTarget.value !== undefined) {
            changeEmail(e.currentTarget.value)
        // } else {
        //     changeEmail(e.currentTarget.email)
        // }
    }

    const updatePhone = (e: any) => {
        e.preventDefault()
        // if (e.currentTarget.value !== undefined) {
            changePhone(e.currentTarget.value)
        // } else {
        //     changePhone(e.currentTarget.phone)
        // }
    }

    const updateRole = (e: any) => {
        e.preventDefault()
        // if (e.currentTarget.value !== undefined) {
            changeRole(e.currentTarget.value)
        // } else {
        //     changeRole(e.currentTarget.role)
        // }
    }

    const updateSpecialty = (e: any) => {
        e.preventDefault()
        // if (e.currentTarget.value !== undefined) {
            changeSpecialty(e.currentTarget.value)
        // } else {
        //     changeSpecialty(e.currentTarget.specialty)
        // }
    }

    const updateDescription = (e: any) => {
        e.preventDefault()
        // if (e.currentTarget.value !== undefined) {
            changeDescription(e.currentTarget.value)
        // } else {
        //     changeDescription(e.currentTarget.description)
        // }
    }

    const updateImage = (e: any) => {
        let file: File = e.currentTarget.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => {
            changeImage(reader.result)
            console.log(reader.result);

        }
    }

    const editUserSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        let editUser: User = {
            userId: userId,
            username,
            password,
            firstName,
            lastName,
            email,
            phone,
            description,
            role,
            specialty,
            image
        }

        try {
            await tutorialhubEditUser(editUser)
            console.log(editUser);
            props.history.push(`/profile/${userId}`)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Container maxWidth="lg" className={classes.container}>
                <form className={classes.form} autoComplete="off" onSubmit={editUserSubmit}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6} md={12} lg={6} className={classes.grid}>
                            <TextField variant="outlined" margin="normal" fullWidth label="Username" value={username} onChange={updateUsername} />
                            <TextField variant="outlined" margin="normal" fullWidth label="Password" type="password" value={password} onChange={updatePassword} />
                            <TextField variant="outlined" margin="normal" fullWidth label="First Name" value={firstName} onChange={updateFirstName} />
                            <TextField variant="outlined" margin="normal" fullWidth label="Last Name" value={lastName} onChange={updateLastName} />
                            <TextField variant="outlined" margin="normal" fullWidth type="Email" label="Email" value={email} onChange={updateEmail} />
                            <TextField variant="outlined" margin="normal" fullWidth label="Phone" type="tel" value={phone} onChange={updatePhone} />
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">Are you a tutor?</InputLabel>
                                <Select
                                    native
                                    value={role}
                                    onChange={updateRole}
                                    inputProps={{
                                    
                                        id: 'age-native-simple'
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value="tutor">Yes</option>
                                    <option value="student">No</option>
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">Specialty</InputLabel>
                                <Select
                                    native
                                    value={specialty}
                                    onChange={updateSpecialty}
                                    inputProps={{
                                       
                                        id: 'age-native-simple'
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
                            <TextField variant="outlined" margin="normal" fullWidth label="Description" value={description} onChange={updateDescription} />
                            <input accept="image/*" id="icon-button-file" type="file" onChange={updateImage} />
                            <label htmlFor='icon-button-file'>
                            </label>
                            <img src={image || ''}/>
                            <Button type='submit' variant="contained" className={classes.mainButton}>Update</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    )
}