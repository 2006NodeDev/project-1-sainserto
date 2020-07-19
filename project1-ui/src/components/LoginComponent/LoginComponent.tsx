import React, { FunctionComponent, useState, SyntheticEvent } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { tutorialhubLogin } from '../../remote/tutorialhub-api/tutorialhub-login'
import { RouteComponentProps, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core'
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import { SpecialtyListComponent } from '../SpecialtyListComponent/SpecialtyListComponent'
// import classes from '*.module.css'


interface ILoginProps extends RouteComponentProps {
    changeCurrentUser: (newUser: any) => void
}


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    container: {
        paddingTop: theme.spacing(10),
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
        backgroundColor: "#A74482",
        fontSize: 16,
        margin: theme.spacing(3, 0, 2),
        '&:hover': {
            backgroundColor: "#422951"
        }
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },

}));

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
        props.changeCurrentUser(res)
        changePassword('')
        props.history.push('/home')
    }

    return (
        <div>
            <Container maxWidth="lg" className={classes.container}>
                <form className={classes.form} autoComplete="off" onSubmit={loginSubmit}>
                    <Grid container spacing={5}>
                        <Grid item xs={10} sm={4} md={4} lg={3} className={classes.grid}>
                            <TextField id="standard-basic" label="Username" variant="outlined" value={username} onChange={updateUsername} />
                            {/* <TextField id="standard-basic" type='password' label="Password" value={password} onChange={updatePassword} /> */}
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                            
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={updatePassword}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                            </FormControl>
                            <Button className={classes.mainButton} type='submit' variant="contained" color="primary">Log in</Button>
                            <Link to='/signup'>Register</Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    )
}
