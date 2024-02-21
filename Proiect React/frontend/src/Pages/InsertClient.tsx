import React, {useState} from "react"
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import {insertClientStyles, logoutIconSX, confirmPasswordFieldStyles, confirmPasswordBoxSX,
    passwordFieldStyles, emailFieldStyles, phoneFieldStyles, emailBoxSX, passwordBoxSX,
    boxSX, titleSX, buttonsBoxSX, firstNameBoxSX, lastNameBoxSX, phoneBoxSX,
    mainInsertClientBoxSX, alertSX, firstNameFieldStyles, lastNameFieldStyles} from "./InsertClient.styles";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import {AlertColor, Button, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const InsertClient = (): JSX.Element => {

    const navigate = useNavigate();

    const [severityValue, setSeverityValue] = React.useState<AlertColor | undefined>("success");
    const [errValue, setErrValue] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const handleCreate = () => {

        const newSignUpRequest = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        }

        axios.post("http://localhost:8081/Client/SignUp", newSignUpRequest, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            console.log(response.data)
            setSeverityValue("success")
            setErrValue("Client created successfully!")
            setOpen(true)

            setTimeout(() => {
                navigate("/Admin",{state : {key : 0}})
            }, 2000);

        }).catch((error: any) => {
            console.error(error)
            setSeverityValue("error")
            setErrValue(error.response.data)
            setOpen(true)
        })
    };

    const [firstName, setFirstName] = useState("");
    const handleChangeFirstName = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setFirstName(event.target.value);
    };

    const [lastName, setLastName] = useState("");
    const handleChangeLastName = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setLastName(event.target.value);
    };

    const [phone, setPhone] = useState("");
    const handleChangePhone = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPhone(event.target.value);
    };

    const [email, setEmail] = useState("");
    const handleChangeEmail = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
    };

    const [password, setPassword] = useState("");
    const handleChangePassword = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
    };

    const [confirmPassword, setConfirmPassword] = useState("");
    const handleChangeConfirmPassword = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setConfirmPassword(event.target.value);
    };

    const handleLogout = () => {
        navigate("/")
    };

    const handleGoBack = () => {
        navigate("/Admin", {state : {key : 0}})
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return <div style={insertClientStyles}>
        <IconButton onClick={handleLogout}>
            <LogoutIcon sx={logoutIconSX}/>
        </IconButton>
        <Box sx={mainInsertClientBoxSX}>
            <Typography component="h1" variant="h5" color="black" sx={titleSX}>
                {"INSERT CLIENT"}
            </Typography>
            <Box component="form" noValidate sx={boxSX}>
                <Box sx={firstNameBoxSX}>
                    <Typography component="h2" variant="h6" color="black">
                        First Name:
                    </Typography>
                    <TextField
                        id="firstName"
                        label="First Name"
                        value={firstName}
                        onChange={handleChangeFirstName}
                        variant = "filled"
                        style={firstNameFieldStyles}
                    />
                </Box>
                <Box sx={lastNameBoxSX}>
                    <Typography component="h2" variant="h6" color="black">
                        Last Name:
                    </Typography>
                    <TextField
                        id="lastName"
                        label="Last Name"
                        value={lastName}
                        onChange={handleChangeLastName}
                        variant = "filled"
                        style={lastNameFieldStyles}
                    />
                </Box>
                <Box sx={phoneBoxSX}>
                    <Typography component="h2" variant="h6" color="black">
                        Phone:
                    </Typography>
                    <TextField
                        id="phone"
                        label="Phone"
                        value={phone}
                        onChange={handleChangePhone}
                        variant = "filled"
                        style={phoneFieldStyles}
                    />
                </Box>
                <Box sx={emailBoxSX}>
                    <Typography component="h2" variant="h6" color="black">
                        Email:
                    </Typography>
                    <TextField
                        id="email"
                        label="Email"
                        value={email}
                        onChange={handleChangeEmail}
                        variant = "filled"
                        style={emailFieldStyles}
                    />
                </Box>
                <Box sx={passwordBoxSX}>
                    <Typography component="h2" variant="h6" color="black">
                        Password:
                    </Typography>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handleChangePassword}
                        variant = "filled"
                        style={passwordFieldStyles}
                    />
                </Box>
                <Box sx={confirmPasswordBoxSX}>
                    <Typography component="h2" variant="h6" color="black">
                        Confirm Password:
                    </Typography>
                    <TextField
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={handleChangeConfirmPassword}
                        variant = "filled"
                        style={confirmPasswordFieldStyles}
                    />
                </Box>
                <Box sx={buttonsBoxSX}>
                    <Button
                        variant="contained"
                        onClick={handleCreate}
                    >
                        Create
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleGoBack}
                    >
                        Go Back
                    </Button>
                </Box>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severityValue} sx={alertSX}>
                    {errValue}
                </Alert>
            </Snackbar>
        </Box>
    </div>
}