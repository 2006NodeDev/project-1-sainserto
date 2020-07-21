import React from 'react'
import { FunctionComponent, useState } from "react"
import { Typography, Container, CssBaseline, Button, Grid, LinkProps } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link } from 'react-router-dom';
import { DisplayBySpecialtyComponent } from '../DisplayBySpecialtyComponent/DisplayBySpecialtyComponent';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    mainButton: {
        backgroundColor: "#A74482",
        fontSize: 16,
        margin: theme.spacing(3, 0, 2),
        '&:hover': {
            backgroundColor: "#422951"
        }
    }

}))


const options = ['Java', 'JavaScript', 'SQL', 'React', 'Google Cloud Platform']
export const SpecialtyListComponent: FunctionComponent<any> = (props) => {
    const classes = useStyles();

    // let [specialty, changeSpecialty] = useState('')
    const [value, setValue] = useState<string | null>(options[0]);
    const [inputValue, setInputValue] = useState('');

    const specialtySubmit = () => {
        props.history.push(`/specialty/${value}`)
    }

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            console.log('enter press here! ')
        }
    }
    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <form onSubmit={specialtySubmit}>

                    <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
                    <div>{`inputValue: '${inputValue}'`}</div>
                    <br />
                    <Grid container spacing={3}
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <Grid item xs={12} sm={12}>
                            <Autocomplete
                                value={value}
                                onKeyPress={handleKeyPress}
                                onChange={(event: any, newValue: string | null) => {
                                    setValue(newValue);
                                }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                id="controllable-states-demo"
                                options={options}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined" />}
                            /></Grid>
                        <Grid item xs={12} sm={12}>

                            <Button
                            className={classes.mainButton}
                                component={React.forwardRef<HTMLAnchorElement, Partial<LinkProps>>(
                                    (props, ref) => (
                                        <Link to={`/specialty/${value}`} {...props} ref={ref as any} />
                                    )
                                )}
                            >
                                GO
                            </Button>

                            
                            
                            {/* <Link to={`/specialty/${value}`}><Button className={classes.mainButton} variant="contained" color="primary">GO</Button></Link> */}
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    )
}