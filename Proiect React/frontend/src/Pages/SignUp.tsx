import React from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {mainSignUpBoxSX, buttonSX, signUpStyles, titleSX, alertSX} from "./SignUp.styles";
import {Button, TextField} from "@mui/material";
import {fieldStyles} from "./SignUp.styles";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, {AlertProps} from "@mui/material/Alert";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SignUp = () : JSX.Element => {

    const navigate = useNavigate();

    const [errValue, setErrValue] = React.useState("")
    const [open, setOpen] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log({
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            phone: data.get('phone'),
            email: data.get('email'),
            password: data.get('password'),
            confirmPassword: data.get('confirmPassword'),
        });

        const newSignUpRequest = {
            firstName: data.get('firstName') as string,
            lastName: data.get('lastName') as string,
            phone: data.get('phone') as string,
            email: data.get('email') as string,
            password: data.get('password') as string,
            confirmPassword: data.get('confirmPassword') as string,
        }

        console.log({newSignUpRequest})

        axios.post("http://localhost:8081/Client/SignUp", newSignUpRequest, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            console.log(response)
            setOpen(false)
            navigate("/Reservation", { state: { key: response.data.clientId } })
        }).catch((error: any) => {
            console.error(error)
            setErrValue(error.response.data)
            setOpen(true);
        })
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return <div style={signUpStyles}>
        <Container component="main" maxWidth="xs">
            <Box sx={mainSignUpBoxSX}>
                <Typography component="h1" variant="h5" color="black" sx={titleSX}>
                    SIGN UP
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="firstName"
                        margin="normal"
                        fullWidth
                        required
                        autoFocus
                        variant = "filled"
                        style={fieldStyles}
                    />
                    <TextField
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lastName"
                        margin="normal"
                        fullWidth
                        required
                        variant = "filled"
                        style={fieldStyles}
                    />
                    <TextField
                        id="phone"
                        label="Phone"
                        name="phone"
                        autoComplete="phone"
                        margin="normal"
                        fullWidth
                        required
                        variant = "filled"
                        style={fieldStyles}
                    />
                    <TextField
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        fullWidth
                        required
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
                    <TextField
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        autoComplete="current-confirmPassword"
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
                        Sign Up
                    </Button>
                    <Link href="/" variant="body2">
                        Have an account? Sign In Here
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