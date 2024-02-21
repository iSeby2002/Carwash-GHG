import React, {useEffect, useState} from "react"
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import {useLocation, useNavigate} from "react-router-dom";
import {
    updateEmployeeStyles, logoutIconSX, mainUpdateEmployeeBoxSX,
    employeeInterface, boxSX, titleSX,
    alertSX, firstNameBoxSX, lastNameBoxSX,
    salaryBoxSX, streetAddressBoxSX, cityBoxSX, stateBoxSX,
    firstNameFieldStyles, lastNameFieldStyles, salaryFieldStyles,
    streetAddressFieldStyles, cityFieldStyles, stateFieldStyles, buttonsBoxSX, goBackBoxSX
} from "./UpdateEmployee.styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {AlertColor, Button, TextField} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import axios from "axios";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const UpdateEmployee = (): JSX.Element => {

    const navigate = useNavigate();
    const location = useLocation();
    const employeeId = parseInt(location.state?.key, 10);

    const [severityValue, setSeverityValue] = React.useState<AlertColor | undefined>("success");
    const [errValue, setErrValue] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const [employee, setEmployee] = React.useState<employeeInterface>({
        employeeId : employeeId,
        firstName : "",
        lastName : "",
        salary : 0,
        disponibility : true,
        employeeAddress : {
            employeeAddressId : 0,
            streetAddress : "",
            city : "",
            state : "",
        },
        transactions : []});

    useEffect(() => {
        console.log(employeeId);
        axios.post("http://localhost:8081/Employee/GetById", employeeId , {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setEmployee(response.data);
            console.log(employee)
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setSalary(response.data.salary)
            setStreetAddress(response.data.employeeAddress.streetAddress)
            setCity(response.data.employeeAddress.city)
            setState(response.data.employeeAddress.state)
        })

    }, [employeeId]);

    const [notEditable, setNotEditable] = useState(true);
    const handleEdit = () => {
        setNotEditable(false);
    };

    const handleSave = () => {

        const newEditEmployeeProfileRequest = {
            employeeProfileId: employeeId,
            employeeProfileFirstName: firstName,
            employeeProfileLastName: lastName,
            employeeProfileSalary: salary,
            employeeProfileStreetAddress: streetAddress,
            employeeProfileCity: city,
            employeeProfileState: state
        }

        console.log(newEditEmployeeProfileRequest)

        axios.post("http://localhost:8081/Employee/UpdateEmployee", newEditEmployeeProfileRequest, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setEmployee(response.data)
            setNotEditable(true)
            setSeverityValue("success")
            setErrValue("Employee saved successfully!")
            setOpen(true)
        }).catch((error: any) => {
            console.error(error)
            setSeverityValue("error")
            setErrValue(error.response.data)
            setOpen(true)
        })
    };
    const handleCancel = () => {
        setFirstName(employee.firstName)
        setLastName(employee.lastName)
        setSalary(employee.salary)
        setStreetAddress(employee.employeeAddress.streetAddress)
        setCity(employee.employeeAddress.city)
        setState(employee.employeeAddress.state)
        setNotEditable(true);
    };

    const [firstName, setFirstName] = useState(employee.firstName);
    const handleChangeFirstName = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setFirstName(event.target.value);
    };

    const [lastName, setLastName] = useState(employee.lastName);
    const handleChangeLastName = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setLastName(event.target.value);
    };

    const [salary, setSalary] = useState(employee.salary);
    const handleChangeSalary = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSalary(Number(event.target.value));
    };

    const [streetAddress, setStreetAddress] = useState(employee.employeeAddress.streetAddress);
    const handleChangeStreetAddress = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setStreetAddress(event.target.value);
    };

    const [city, setCity] = useState(employee.employeeAddress.city);
    const handleChangeCity = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setCity(event.target.value);
    };

    const [state, setState] = useState(employee.employeeAddress.state);
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

    return <div style={updateEmployeeStyles}>
        <IconButton onClick={handleLogout}>
            <LogoutIcon sx={logoutIconSX}/>
        </IconButton>
        <Box sx={mainUpdateEmployeeBoxSX}>
            <Typography component="h1" variant="h5" color="black" sx={titleSX}>
                {employee.firstName + " " + employee.lastName + " PROFILE"}
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
                <Box sx={salaryBoxSX}>
                    <Typography component="h2" variant="h6" color="black">
                        Salary:
                    </Typography>
                    <TextField
                        id="salary"
                        label="Salary"
                        value={salary}
                        InputProps={{
                            readOnly: notEditable,
                        }}
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
                        InputProps={{
                            readOnly: notEditable,
                        }}
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
                        InputProps={{
                            readOnly: notEditable,
                        }}
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
                        InputProps={{
                            readOnly: notEditable,
                        }}
                        onChange={handleChangeState}
                        variant = "filled"
                        style={stateFieldStyles}
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