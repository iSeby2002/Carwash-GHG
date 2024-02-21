import React from "react"
import {useLocation, useNavigate} from "react-router-dom";
import {
    changePasswordStyles,
    logoutIconSX,
    homeIconSX,
    accountIconSX,
    titleSX,
    mainChangePasswordBoxSX,
    boxSX,
    currentPasswordSX,
    newPasswordSX,
    confirmPasswordSX,
    currentPasswordFieldStyles,
    newPasswordFieldStyles,
    confirmPasswordFieldStyles,
    saveButtonSX,
    cancelButtonSX,
    alertSX
} from "./ChangePassword.styles";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {AlertColor, Button, TextField} from "@mui/material";
import axios from "axios";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ChangePassword = () : JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    const clientId = parseInt(location.state?.key, 10);

    const [currentPasswordValue, setCurrentPasswordValue] = React.useState("");
    const [newPasswordValue, setNewPasswordValue] = React.useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = React.useState("");

    const [severityValue, setSeverityValue] = React.useState<AlertColor | undefined>("success");
    const [errValue, setErrValue] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const handleLogout = () => {
        navigate("/");
    }

    const handleHome = () => {
        navigate("/Reservation", {state : {key: clientId}});
    }

    const handleAccount = () => {
        navigate("/Profile", {state : {key : clientId}})
    }

    const handleCurrentPassword = ( event : { target : { value : React.SetStateAction<string> } } ) => {
        setCurrentPasswordValue(event.target.value);
    }

    const handleNewPassword = ( event : { target : { value : React.SetStateAction<string> } } ) => {
        setNewPasswordValue(event.target.value);
    }

    const handleConfirmPassword = ( event : { target : { value : React.SetStateAction<string> } } ) => {
        setConfirmPasswordValue(event.target.value);
    }

    const handleSave = () => {
        const changePasswordRequest = {
            clientId: clientId,
            currentPassword: currentPasswordValue,
            newPassword: newPasswordValue,
            confirmPassword: confirmPasswordValue
        }
        console.log(changePasswordRequest)
        axios.post("http://localhost:8081/Client/ChangePassword", changePasswordRequest, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            console.log(response.data)

            setSeverityValue("success")
            setErrValue(response.data)
            setOpen(true)

            setCurrentPasswordValue("")
            setNewPasswordValue("")
            setConfirmPasswordValue("")

            setTimeout(() => {
                navigate("/Profile", { state: { key: clientId } });
            }, 2000);

        }).catch((error: any) => {
            console.error(error)

            setSeverityValue("error")
            setErrValue(error.response.data)
            setOpen(true)
        })
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleCancel = () => {
        navigate("/Profile", {state : {key : clientId}})
    }

    return <div style={changePasswordStyles}>
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
            <Box sx={mainChangePasswordBoxSX}>
                <Typography component="h1" variant="h5" color="black" sx={titleSX}>
                    CHANGE PASSWORD
                </Typography>
                <Box component="form" noValidate sx={boxSX}>
                    <Typography component="h2" variant="h6" color="black" sx={currentPasswordSX}>
                        Current Password:
                    </Typography>
                    <TextField
                        id="currentPassword"
                        label="Current Password"
                        value={currentPasswordValue}
                        onChange={handleCurrentPassword}
                        type="password"
                        variant = "filled"
                        style={currentPasswordFieldStyles}
                    />
                    <Typography component="h2" variant="h6" color="black" sx={newPasswordSX}>
                        New Password:
                    </Typography>
                    <TextField
                        id="newPassword"
                        label="New Password"
                        value={newPasswordValue}
                        onChange={handleNewPassword}
                        type="password"
                        variant = "filled"
                        style={newPasswordFieldStyles}
                    />
                    <Typography component="h2" variant="h6" color="black" sx={confirmPasswordSX}>
                        Confirm Password:
                    </Typography>
                    <TextField
                        id="confirmPassword"
                        label="Confirm Password"
                        value={confirmPasswordValue}
                        onChange={handleConfirmPassword}
                        type="password"
                        variant = "filled"
                        style={confirmPasswordFieldStyles}
                    />
                    <Button
                        variant="contained"
                        sx={saveButtonSX}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        sx={cancelButtonSX}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={severityValue} sx={alertSX}>
                            {errValue}
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
        </Container>
    </div>
}