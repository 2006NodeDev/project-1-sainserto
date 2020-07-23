import React, { FunctionComponent, useState, SyntheticEvent } from 'react'
// import TextField from '@material-ui/core/TextField'
// import { RouteComponentProps } from 'react-router-dom'
import { TextField, Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { tutorialhubSaveUser } from '../../remote/tutorialhub-api/tutorialhub-save-user';
import { User } from '../../models/User';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        // root: {
        //     minWidth: 275,
        // },

        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(0),
            },
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                // width: '25ch',
            },
        },
        container: {
            paddingTop: theme.spacing(1),
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
        mainButton: {
            margin: theme.spacing(3, 0, 2),
            backgroundColor: "#5A189A",
            fontSize: 16,
            color: "white",
            '&:hover': {
              backgroundColor: "#3C096C"
            }
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    }),
);

// interface ILoginProps extends RouteComponentProps {
//     changeCurrentUser: (newUser: any) => void
// }



export const NewUserComponent: FunctionComponent<any> = (props) => {

    const classes = useStyles();

    const bull = <span className={classes.bullet}>•</span>;
    const [state, setState] = React.useState<{ age: string | number; name: string }>({
        age: '',
        name: 'hai',
    });

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof state;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

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
        changeUsername(e.currentTarget.value)
    }

    const updatePassword = (e: any) => {
        e.preventDefault()
        changePassword(e.currentTarget.value)
    }

    const updateConfirmPassword = (e: any) => {
        e.preventDefault()
        changeConfirmPassword(e.currentTarget.value)
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

    const updatePhone = (e: any) => {
        e.preventDefault()
        changePhone(e.currentTarget.value)
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

    const updateImage = (e: any) => {
        let file: File = e.currentTarget.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            console.log(reader.result)
            changeImage(reader.result)
        }
    }


    const submitUser = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            console.log("pw dont match");

            toast.error('Password Does Not Match')
        } else {
            let newUser: User = {
                userId: 0,
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
                let res = await tutorialhubSaveUser(newUser)
                console.log(newUser);
                props.history.push('/login')

            } catch (error) {
                console.log(error);
            }

        }
    }

    return (

       
                 <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {/* <Container maxWidth="xs" className={classes.container}> */}
                    <form className={classes.form} autoComplete="off" onSubmit={submitUser}>
                        <Grid container spacing={2}
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Grid item xs={12} sm={12}>
                                <TextField required fullWidth variant="outlined" label="Username" value={username} onChange={updateUsername} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth variant="outlined" label="Password" type="password" value={password} onChange={updatePassword} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth variant="outlined" label="Confirm Password" type="password" value={confirmPassword} onChange={updateConfirmPassword} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth variant="outlined" label="First Name" value={firstName} onChange={updateFirstName} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth variant="outlined" label="Last Name" value={lastName} onChange={updateLastName} />
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <TextField required fullWidth variant="outlined" type="email" label="Email" value={email} onChange={updateEmail} />
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <TextField required fullWidth variant="outlined" label="Phone" type="tel" value={phone} onChange={updatePhone} />
                            </Grid>

                            {/* <TextField type="text" label="Role" value={role} onChange={updateRole} /> */}
                            <Grid item xs={12} sm={6}>

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="age-native-simple">I am a..</InputLabel>
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
                            </Grid>
                            <Grid item xs={12} sm={6}>

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
                            </Grid>

                            <Grid item xs={12} sm={12}>

                                <TextField fullWidth variant="outlined" label="Description" value={description} onChange={updateDescription} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography>
                                            <label htmlFor='file'>Upload a profile picture</label>
                                        </Typography>
                                        <input required type='file' name='file' accept='image/*' onChange={updateImage} />
                                        <img src={image} />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button fullWidth className={classes.mainButton} type='submit' variant="contained" color="primary">Sign Up</Button>
                            </Grid>

                        </Grid>
                    </form>
                {/* </Container> */}
            </div>
            </Container>
    )
}
