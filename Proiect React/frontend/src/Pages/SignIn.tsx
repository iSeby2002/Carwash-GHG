import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {alertSX, buttonSX, fieldStyles, mainSignInBoxSX, signInStyles, titleSX} from "./SignIn.styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SignIn = (): JSX.Element => {

    const navigate = useNavigate();

    const [errValue, setErrValue] = React.useState("")
    const [open, setOpen] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const newSignInRequest = {
            email: data.get('email') as string,
            password: data.get('password') as string,
        }

        console.log({newSignInRequest});

        axios.post("http://localhost:8081/Client/SignIn", newSignInRequest, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            console.log(response)
            setOpen(false)
            navigate("/Reservation", { state: { key: response.data.clientId } })
        }).catch((error: any) => {
            console.error(error)
            if((error.response.data) === "ADMIN ONLY"){
                navigate("/Admin")
            }else{
                setErrValue(error.response.data)
                setOpen(true);
            }
        })
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return <div style={signInStyles}>
        <Container component="main" maxWidth="xs">
            <Box sx={mainSignInBoxSX}>
                <Typography component="h1" variant="h5" sx={titleSX}>
                    SIGN IN
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        fullWidth
                        required
                        autoFocus
                        variant = "filled"
                        style={fieldStyles}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        fullWidth
                        required
                        variant = "filled"
                        style={fieldStyles}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={buttonSX}
                    >
                        Sign In
                    </Button>
                    <Link href="/SignUp" variant="body2">
                        Don't have an account? Sign Up
                    </Link>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={alertSX}>
                            {errValue}
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
        </Container>
    </div>
}
