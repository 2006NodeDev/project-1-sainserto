import React, { FunctionComponent, useState, SyntheticEvent } from 'react'
import TextField from '@material-ui/core/TextField'
// import { RouteComponentProps } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { tutorialhubLogin } from '../../remote/tutorialhub-api/tutorialhub-login'

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
import { tutorialhubSignUp } from '../../remote/tutorialhub-api/tutorialhub-signup';

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

export const SignUpComponent: FunctionComponent<any> = (props) => {

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

    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    const [firstName, changeFirstName] = useState('')
    const [lastName, changeLastName] = useState('')
    const [email, changeEmail] = useState('')
    const [phoneNumber, changePhoneNumber] = useState('')
    const [role, changeRole] = useState('')
    const [specialty, changeSpecialty] = useState('')
    const [description, changeDescription] = useState('')


    const [currentUser, changeCurrentUser] = useState(null)

    const updateUsername = (event: any) => {
        event.preventDefault()
        changeUsername(event.currentTarget.value)
    }

    const updatePassword = (event: any) => {
        event.preventDefault()
        changePassword(event.currentTarget.value)
    }

    const updateFirstName = (event: any) => {
        event.preventDefault()
        changeFirstName(event.currentTarget.value)
    }

    const updateLastName = (event: any) => {
        event.preventDefault()
        changeLastName(event.currentTarget.value)
    }

    const updateEmail = (event: any) => {
        event.preventDefault()
        changeEmail(event.currentTarget.value)
    }

    const updatePhoneNumber = (event: any) => {
        event.preventDefault()
        changePhoneNumber(event.currentTarget.value)
    }

    const updateRole = (event: any) => {
        event.preventDefault()
        changeRole(event.currentTarget.value)
    }

    const updateSpecialty = (event: any) => {
        event.preventDefault()
        changeSpecialty(event.currentTarget.value)
    }

    const updateDescription = (event: any) => {
        event.preventDefault()
        changeDescription(event.currentTarget.value)
    }

    const loginSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        let res = await tutorialhubSignUp(username, password)
        changeCurrentUser(res)
        changePassword('')
        props.history.push('/login')
    }

    return (

        <React.Fragment>
            
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
                    <form autoComplete="off" onSubmit={loginSubmit}>
                        



                        <Card className={classes.root}>
                            <CardContent>

                                <TextField id="standard-basic" label="Username" value={username} onChange={updateUsername} />
                                <TextField id="standard-basic" type='password' label="Password" value={password} onChange={updatePassword} />
                                <TextField id="standard-basic" label="First Name" value={firstName} onChange={updateFirstName} />
                                <TextField id="standard-basic" label="Last Name" value={lastName} onChange={updateLastName} />
                                <TextField id="standard-basic" label="Email" value={email} onChange={updateEmail} />
                                <TextField id="standard-basic" label="Phone" type="tel" value={phoneNumber} onChange={updatePhoneNumber} />

                                <FormControl className={classes.formControl} onChange={updateRole} >
                                    <InputLabel htmlFor="age-native-simple">Role</InputLabel>
                                    <Select
                                        native
                                        value={state.age}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-native-simple',
                                        }}
                                    >
                                        <option aria-label="None" value="" />
                                        <option value={10}>Tutor</option>
                                        <option value={20}>Student</option>
                                    </Select>
                                </FormControl>

                                {/* <TextField id="standard-basic" label="Role" value={role} onChange={updateRole} /> */}

                                <TextField id="standard-basic" label="Specialty" value={specialty} onChange={updateSpecialty} />
                                <TextField id="standard-basic" label="Description" value={description} onChange={updateDescription} />
                                <div>
                                    <Button type='submit' variant="contained" color="primary">Sign Up</Button>
                                </div>


                            </CardContent>
                        </Card>

                    </form>
                </Typography>
            </Container>
        </React.Fragment>

    )
}
