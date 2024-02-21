import React, {useEffect, useState} from "react"
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import {useLocation, useNavigate} from "react-router-dom";
import {
    updateClientStyles,
    logoutIconSX,
    mainUpdateClientBoxSX,
    boxSX,
    titleSX,
    clientInterface, firstNameBoxSX, firstNameFieldStyles, lastNameBoxSX, phoneBoxSX, emailBoxSX, passwordBoxSX,
    lastNameFieldStyles, phoneFieldStyles, emailFieldStyles, passwordFieldStyles, buttonsBoxSX, alertSX, goBackBoxSX
} from "./UpdateClient.styles";
import axios from "axios";
import {AlertColor, Button, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, {AlertProps} from "@mui/material/Alert";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const UpdateClient = (): JSX.Element => {

    const navigate = useNavigate();
    const location = useLocation();
    const clientId = parseInt(location.state?.key, 10);

    const [severityValue, setSeverityValue] = React.useState<AlertColor | undefined>("success");
    const [errValue, setErrValue] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const [client, setClient] = React.useState<clientInterface>({
        clientId: clientId,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        transactions: [],});

    useEffect(() => {
        console.log(clientId);
        axios.post("http://localhost:8081/Client/GetById", clientId , {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setClient(response.data);
            console.log(client)
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmail(response.data.email)
            setPassword(response.data.password)
            setPhone(response.data.phone)
        })

    }, [clientId]);

    const [notEditable, setNotEditable] = useState(true);
    const handleEdit = () => {
        setNotEditable(false);
    };
    const handleSave = () => {

        const newEditClientProfileRequest = {
            clientProfileId: clientId,
            clientProfileFirstName: firstName,
            clientProfileLastName: lastName,
            clientProfileEmail: email,
            clientProfilePassword: password,
            clientProfilePhone: phone,
        }

        axios.post("http://localhost:8081/Client/UpdateClient", newEditClientProfileRequest, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setClient(response.data)
            setNotEditable(true)
            setSeverityValue("success")
            setErrValue("Client saved successfully!")
            setOpen(true)
        }).catch((error: any) => {
            console.error(error)
            setSeverityValue("error")
            setErrValue(error.response.data)
            setOpen(true)
        })
    };
    const handleCancel = () => {
        setFirstName(client.firstName)
        setLastName(client.lastName)
        setEmail(client.email)
        setPassword(client.password)
        setPhone(client.phone)
        setNotEditable(true);
    };

    const [firstName, setFirstName] = useState(client.firstName);
    const handleChangeFirstName = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setFirstName(event.target.value);
    };

    const [lastName, setLastName] = useState(client.lastName);
    const handleChangeLastName = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setLastName(event.target.value);
    };

    const [phone, setPhone] = useState(client.phone);
    const handleChangePhone = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPhone(event.target.value);
    };

    const [email, setEmail] = useState(client.email);
    const handleChangeEmail = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
    };

    const [password, setPassword] = useState(client.password);
    const handleChangePassword = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
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

    return <div style={updateClientStyles}>
        <IconButton onClick={handleLogout}>
            <LogoutIcon sx={logoutIconSX}/>
        </IconButton>
        <Box sx={mainUpdateClientBoxSX}>
            <Typography component="h1" variant="h5" color="black" sx={titleSX}>
                {client.firstName + " " + client.lastName + " PROFILE"}
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
                        InputProps={{
                            readOnly: notEditable,
                        }}
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
                        InputProps={{
                            readOnly: notEditable,
                        }}
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
                        InputProps={{
                            readOnly: notEditable,
                        }}
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
                        InputProps={{
                            readOnly: notEditable,
                        }}
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
                        value={password}
                        InputProps={{
                            readOnly: notEditable,
                        }}
                        onChange={handleChangePassword}
                        variant = "filled"
                        style={passwordFieldStyles}
                    />
                </Box>
                <Box sx={buttonsBoxSX}>
                    <Button
                        variant="contained"
                        disabled={!notEditable}
                        onClick={handleEdit}
                    >
                        Edit profile
                    </Button>
                    <Button
                        variant="contained"
                        disabled={notEditable}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        disabled={notEditable}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </Box>
                <Box sx={goBackBoxSX}>
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