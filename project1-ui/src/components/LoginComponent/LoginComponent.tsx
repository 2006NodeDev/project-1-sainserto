import React, { FunctionComponent, useState, SyntheticEvent } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { tutorialhubLogin } from '../../remote/tutorialhub-api/tutorialhub-login'
import { RouteComponentProps, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, FormControlLabel } from '@material-ui/core'
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CssBaseline from '@material-ui/core/CssBaseline';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#5A189A",
        fontSize: 16,
        color: "white",
        '&:hover': {
          backgroundColor: "#3C096C"
        }
    },
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
        </Typography>
    );
}

interface ILoginProps extends RouteComponentProps {
    changeCurrentUser: (newUser: any) => void
}

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         '& > *': {
//             margin: theme.spacing(0),
//         },
//     },
//     container: {
//         paddingTop: theme.spacing(10),
//         paddingBottom: theme.spacing(4),
//     },
//     grid: {
//         padding: theme.spacing(5),
//         margin: 'auto',
//         display: 'flex',
//         overflow: 'auto',
//         flexDirection: 'column',
//         flexWrap: 'wrap',

//     },
//     fixedHeight: {
//         height: 600,
//     },
//     form: {
//         width: '100%',
//         marginTop: theme.spacing(3),
//     },
// mainButton: {
//     backgroundColor: "#A74482",
//     fontSize: 16,
//     margin: theme.spacing(3, 0, 2),
//     '&:hover': {
//         backgroundColor: "#422951"
//     }
// },
//     margin: {
//         margin: theme.spacing(1),
//     },
//     withoutLabel: {
//         marginTop: theme.spacing(3),
//     },
//     textField: {
//         width: '25ch',
//     },

// }));

interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
}


export const LoginComponent: FunctionComponent<ILoginProps> = (props) => {
    const classes = useStyles();
    const [values, setValues] = React.useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')

    const updateUsername = (event: any) => {
        event.preventDefault()
        changeUsername(event.currentTarget.value)
    }

    const updatePassword = (event: any) => {
        event.preventDefault()
        changePassword(event.currentTarget.value)
    }

    const loginSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        let res = await tutorialhubLogin(username, password)

        if (res.username && res.password) {
            props.changeCurrentUser(res)
            changePassword('')
            props.history.push("/home")
            console.log("home dapat");

        } else {
            props.history.push("/login")
            console.log("login page dapat");

            console.log(res.userId);




            // props.history.push('/')
        }
    }

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Typography variant="h4" color="textSecondary" align="center">
                FIND MY TUTOR
        </Typography>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form onSubmit={loginSubmit} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={updateUsername}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={updatePassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to='/signup'>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>

            </Box>
        </Container>
    )
}
