import React, { FunctionComponent, useState, SyntheticEvent } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { tutorialhubLogin } from '../../remote/tutorialhub-api/tutorialhub-login'
import {RouteComponentProps} from 'react-router-dom'


interface ILoginProps extends RouteComponentProps{
    changeCurrentUser: (newUser: any) => void
}

export const LoginComponent: FunctionComponent<ILoginProps> = (props) => {
    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')

    const updateUsername = (event: any) => {
        event.preventDefault()
        changeUsername(event.currentTarget.value)
    }

    const updatePassword = (event:any) => {
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
            <form autoComplete="off" onSubmit={loginSubmit}>
                <TextField id="standard-basic" label="Username" value={username} onChange={updateUsername} />
                <TextField id="standard-basic" type='password' label="Password" value={password} onChange={updatePassword} />
                <Button type='submit' variant="contained" color="primary">Login</Button>
            </form>
        </div>
    )
}
