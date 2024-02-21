import React, {useState} from "react"
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import {insertEmployeeStyles, logoutIconSX, mainInsertEmployeeBoxSX, boxSX,
    cityBoxSX, stateBoxSX, buttonsBoxSX, alertSX, firstNameBoxSX,
    lastNameBoxSX, salaryBoxSX, streetAddressBoxSX, lastNameFieldStyles, salaryFieldStyles,
    cityFieldStyles, stateFieldStyles, firstNameFieldStyles, streetAddressFieldStyles, titleSX} from "./InsertEmployee.styles";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import {AlertColor, Button, TextField} from "@mui/material";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const InsertEmployee = (): JSX.Element => {

    const navigate = useNavigate();

    const [severityValue, setSeverityValue] = React.useState<AlertColor | undefined>("success");
    const [errValue, setErrValue] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const handleCreate = () => {

        const newInsertEmployeeRequest = {
            firstName: firstName,
            lastName: lastName,
            salary: salary,
            employeeAddress: {
                streetAddress: streetAddress,
                city: city,
                state: state
            }
        }

        console.log(newInsertEmployeeRequest)

        axios.post("http://localhost:8081/Employee/InsertEmployee", newInsertEmployeeRequest, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            console.log(response.data)
            setSeverityValue("success")
            setErrValue("Employee created successfully!")
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

    const [salary, setSalary] = useState(0);
    const handleChangeSalary = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSalary(Number(event.target.value));
    };

    const [streetAddress, setStreetAddress] = useState("");
    const handleChangeStreetAddress = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setStreetAddress(event.target.value);
    };

    const [city, setCity] = useState("");
    const handleChangeCity = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setCity(event.target.value);
    };

    const [state, setState] = useState("");
    const handleChangeState = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setState(event.target.value);
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

    return <div style={insertEmployeeStyles}>
        <IconButton>
            <LogoutIcon onClick={handleLogout} sx={logoutIconSX}/>
        </IconButton>
        <Box sx={mainInsertEmployeeBoxSX}>
            <Typography component="h1" variant="h5" color="black" sx={titleSX}>
                {"INSERT EMPLOYEE"}
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
                <Box sx={salaryBoxSX}>
                    <Typography component="h2" variant="h6" color="black">
                        Salary:
                    </Typography>
                    <TextField
                        id="salary"
                        label="Salary"
                        value={salary}
                        onChange={handleChangeSalary}
                        variant = "filled"
                        style={salaryFieldStyles}
                    />
                </Box>
                <Box sx={streetAddressBoxSX}>
                    <Typography component="h2" variant="h6" color="black">
                        Street Address:
                    </Typography>
                    <TextField
                        id="streetAddress"
                        label="Street Address"
                        value={streetAddress}
                        onChange={handleChangeStreetAddress}
                        variant = "filled"
                        style={streetAddressFieldStyles}
                    />
                </Box>
                <Box sx={cityBoxSX}>
                    <Typography component="h2" variant="h6" color="black">
                        City:
                    </Typography>
                    <TextField
                        id="city"
                        label="City"
                        value={city}
                        onChange={handleChangeCity}
                        variant = "filled"
                        style={cityFieldStyles}
                    />
                </Box>
                <Box sx={stateBoxSX}>
                    <Typography component="h2" variant="h6" color="black">
                        State:
                    </Typography>
                    <TextField
                        id="state"
                        label="State"
                        value={state}
                        onChange={handleChangeState}
                        variant = "filled"
                        style={stateFieldStyles}
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