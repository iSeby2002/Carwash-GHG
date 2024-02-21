import React, {useEffect, useState} from "react";
import {
    cancelButtonSX, changePasswordButtonSX,
    editButtonSX,
    emailFieldStyles,
    emailSX,
    firstNameFieldStyles,
    firstNameSX, lastNameFieldStyles,
    lastNameSX,
    mainProfileBoxSX, manageTransactionButtonSX, passwordFieldStyles,
    passwordSX, phoneFieldStyles,
    phoneSX,
    profileStyles, saveButtonSX, transactionSX
} from "./Profile.styles";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {accountIconSX, homeIconSX, logoutIconSX, titleSX, boxSX, alertSX} from "./Profile.styles";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {clientInterface} from "./Profile.styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {Button, TextField} from "@mui/material";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Profile = () : JSX.Element => {

    const navigate = useNavigate();
    const location = useLocation();
    const clientId = parseInt(location.state?.key, 10);

    const [errValue, setErrValue] = React.useState("")
    const [open, setOpen] = React.useState(false);

    const [client, setClient] = React.useState<clientInterface>({clientId: clientId || 0,
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
            setPhone(response.data.phone)
            setPassword(response.data.password);
        })

    }, []);
    const handleLogout = () => {
        navigate("/")
    };

    const handleHome = () => {
        navigate("/Reservation", { state: { key: clientId } })
    };

    const handleAccount = () => {
        navigate("/Profile", { state: { key: clientId } })
    };

    const [notEditable, setNotEditable] = useState(true);
    const handleEdit = () => {
        setNotEditable(false);
    };
    const handleSave = () => {

        const newEditProfileRequest = {
            profileId: clientId,
            profileFirstName: firstName,
            profileLastName: lastName,
            profilePhone: phone,
        }

        axios.post("http://localhost:8081/Client/EditProfile", newEditProfileRequest, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setClient(response.data)
            console.log(client)
            setNotEditable(true)
            setOpen(false)
        }).catch((error: any) => {
            console.error(error)
            setErrValue(error.response.data)
            setOpen(true)
        })
    };
    const handleCancel = () => {
        setFirstName(client.firstName)
        setLastName(client.lastName)
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

    const [password, setPassword] = useState(client.password);
    const handleChangePassword = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleManageTransactions = () =>{
        navigate("/ManageTransactions", { state: { key: clientId } })
    }

    const handleChangePasswordPage = () =>{
        navigate("/ChangePassword", { state: { key: clientId } })
    }

    return <div style={profileStyles}>
        <IconButton onClick={handleLogout} >
            <LogoutIcon sx={logoutIconSX}/>
        </IconButton>
        <IconButton onClick={handleHome}>
            <HomeIcon sx={homeIconSX}/>
        </IconButton>
        <IconButton onClick={handleAccount}>
            <AccountCircleIcon sx={accountIconSX}/>
        </IconButton>
        <Container component="main" maxWidth="xs">
            <Box sx={mainProfileBoxSX}>
                <Typography component="h1" variant="h5" color="black" sx={titleSX}>
                    MY PROFILE
                </Typography>
                <Box component="form" noValidate sx={boxSX}>
                    <Typography component="h2" variant="h6" color="black" sx={firstNameSX}>
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
                    <Typography component="h2" variant="h6" color="black" sx={lastNameSX}>
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
                    <Typography component="h2" variant="h6" color="black" sx={phoneSX}>
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
                    <Typography component="h2" variant="h6" color="black" sx={emailSX}>
                        Email:
                    </Typography>
                    <TextField
                        id="email"
                        label="Email"
                        value={client.email}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant = "filled"
                        style={emailFieldStyles}
                    />
                    <Typography component="h2" variant="h6" color="black" sx={passwordSX}>
                        Password:
                    </Typography>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        InputProps={{
                            readOnly: true,
                        }}
                        onChange={handleChangePassword}
                        variant = "filled"
                        style={passwordFieldStyles}
                    />
                    <Typography component="h2" variant="h6" color="black" sx={transactionSX}>
                        Transactions:
                    </Typography>
                    <Button
                        variant="contained"
                        sx={manageTransactionButtonSX}
                        onClick={handleManageTransactions}
                    >
                        Manage Transactions
                    </Button>
                    <Button
                        variant="contained"
                        sx={changePasswordButtonSX}
                        onClick={handleChangePasswordPage}
                    >
                        Change Password
                    </Button>
                    <Button
                        variant="contained"
                        sx={editButtonSX}
                        disabled={!notEditable}
                        onClick={handleEdit}
                    >
                        Edit profile
                    </Button>
                    <Button
                        variant="contained"
                        sx={saveButtonSX}
                        disabled={notEditable}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        sx={cancelButtonSX}
                        disabled={notEditable}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
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