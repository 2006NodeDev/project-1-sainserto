import React, { FunctionComponent, useState, SyntheticEvent } from 'react'
// import TextField from '@material-ui/core/TextField'
// import { RouteComponentProps } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'
// import Button from '@material-ui/core/Button'
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
        root: {
            minWidth: 275,
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
    let [phoneNumber, changePhoneNumber] = useState('')
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

    const updateImage = (e:any) => {
        let file:File = e.currentTarget.files[0]
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
                phoneNumber,
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
        <div>
            <React.Fragment>

                <CssBaseline />
                <Container maxWidth="sm">
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
                        <form autoComplete="off" onSubmit={submitUser}>

                            <Card className={classes.root}>
                                <CardContent>

                                    <TextField label="Username" value={username} onChange={updateUsername} />
                                    <TextField label="Password" type="password" value={password} onChange={updatePassword} />
                                    <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={updateConfirmPassword} />
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
                                    <label htmlFor='file'>Profile Pic</label>
                                    <input type='file' name='file' accept='image/*' onChange={updateImage} />
                                    <img src={image} />
                                    <Button type='submit' variant="contained" color="primary">Sign Up</Button>



                                </CardContent>
                            </Card>

                        </form>
                    </Typography>
                </Container>
            </React.Fragment>

        </div>

    )
}
