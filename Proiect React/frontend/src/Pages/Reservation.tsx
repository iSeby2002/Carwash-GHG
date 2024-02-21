import React, {useEffect} from "react";
import {
    mainReservationBoxSX,
    boxSX,
    reservationStyles,
    washTypeStyles,
    selectSX,
    dataAndTimeStyles,
    dataAndTimeSX,
    chooseEmplyeeStyles,
    emplyeesSX,
    radioSX,
    buttonSX,
    titleSX,
    logoutIconSX,
    serviceInterface,
    employeeInterface,
    homeIconSX,
    accountIconSX,
    alertSX, listStyle
} from "./Reservation.styles";
import { useNavigate, useLocation  } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
    AlertColor,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel, ListItem,
    MenuItem, Radio,
    Select,
    SelectChangeEvent
} from "@mui/material";
import Container from "@mui/material/Container";
import axios from "axios";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { FixedSizeList, ListChildComponentProps } from 'react-window';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Reservation = () : JSX.Element => {

    const navigate = useNavigate();
    const location = useLocation();
    const clientId = parseInt(location.state?.key, 10);

    const [severityValue, setSeverityValue] = React.useState<AlertColor | undefined>("success");
    const [errValue, setErrValue] = React.useState("")
    const [open, setOpen] = React.useState(false);

    const [transactionDateValue, setTransactionDateValue] = React.useState<Dayjs | null>(dayjs());

    const [serviceValue,setServiceValue]= React.useState('');
    const [service, setService] = React.useState<serviceInterface>({
        serviceId: 0,
        serviceName: '',
        description: '',
        price: 0});
    const [services, setServices] = React.useState<serviceInterface[]>([])

    const [employeeValue,setEmployeeValue]= React.useState('');
    const [employee, setEmployee] = React.useState<employeeInterface>({employeeId: 0,
        firstName: '',
        lastName: '',
        disponibility: true,
        salary: 0,
        employeeAddress: {
            employeeAddressId: 0,
            streetAddress: '',
            city: '',
            state: '',
        },
        transactions: [],});
    const [employees, setEmployees] = React.useState<employeeInterface[]>([])

    const handleChangeWashType = (event: SelectChangeEvent) => {
        setServiceValue(event.target.value);
    };

    const handleChangeEmployee = (event: SelectChangeEvent) => {
        setEmployeeValue(event.target.value);
    };

    const getServices = (): JSX.Element[] =>{
        return services.map((service) =>(
            <MenuItem key={service.serviceId} value={service.serviceId}>
                {`${service.serviceName} - ${service.description}`}
            </MenuItem>))
    }

    function renderRow(props: ListChildComponentProps) {
        const { index, style } = props;
        const employee = employees[index];
        return (
            <ListItem style={style} key={employee.employeeId} component="div" disablePadding>
                <FormControlLabel
                    value={employee.employeeId}
                    control={<Radio sx={radioSX} />}
                    label={`${employee.firstName} ${employee.lastName}`}
                    checked={employee.employeeId === parseInt(employeeValue, 10)}
                    onChange={() => handleChangeEmployee({ target: { value: employee.employeeId.toString() } } as SelectChangeEvent)}
                    sx={emplyeesSX}
                />
            </ListItem>
        );
    }

    useEffect(() => {
        axios.get("http://localhost:8081/Service/GetAll", {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setServices(response.data)
        })

        axios.get("http://localhost:8081/Employee/GetAll", {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setEmployees(response.data)
        })

        axios.post("http://localhost:8081/Employee/GetById", Number(employeeValue), {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setEmployee(response.data)
        })

        axios.post("http://localhost:8081/Service/GetById", Number(serviceValue), {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setService(response.data)
        })

    }, [clientId, employeeValue, serviceValue]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(transactionDateValue)
        {
            const day = transactionDateValue.date();
            const month = transactionDateValue.month() + 1; // Month is zero-based, so add 1
            const year = transactionDateValue.year();
            const hour = transactionDateValue.hour();
            console.log({
                Day: day,
                Month: month,
                Year: year,
                Hour: hour,
            })

            const newTransaction = {
                clientId: clientId,
                employeeId: employee.employeeId,
                serviceId: service.serviceId,
                transactionDate: day.toString() + " " + month.toString() + " " + year.toString() + " " + hour.toString(),
                price: service.price
            }

            console.log(newTransaction)

            axios.post("http://localhost:8081/Transaction/Insert", newTransaction , {
                headers: {
                    "content-type": "application/json"
                }
            }).then((response: any) => {
                console.log(response);
                setSeverityValue("success")
                setErrValue("Successful reservation!")
                setOpen(true)
            }).catch((error: any) => {
                console.error(error)
                setSeverityValue("error")
                setErrValue(error.response.data)
                setOpen(true)
            })

            navigate("/Reservation", { state: { key: clientId } })
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleLogout = () => {
        navigate("/")
    };

    const handleHome = () => {
        navigate("/Reservation", { state: { key: clientId } })
    };

    const handleAccount = () => {
        navigate("/Profile", { state: { key: clientId } })
    };

    return <div style={reservationStyles}>
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
            <Box sx={mainReservationBoxSX}>
                <Typography component="h1" variant="h5" color="black" sx={titleSX}>
                    MAKE A RESERVATION
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={boxSX}>
                    <Typography component="h2" variant="h6" color="black" style={washTypeStyles}>
                        Wash type:
                    </Typography>
                    <Box sx={selectSX}>
                        <FormControl fullWidth>
                            <InputLabel id="inputLabel">Select a wash type</InputLabel>
                            <Select
                                labelId="selectLabel"
                                id="serviceId"
                                label="Service"
                                variant = "filled"
                                onChange={handleChangeWashType}
                            >
                                {getServices()}
                            </Select>
                        </FormControl>
                    </Box>
                    <Typography component="h2" variant="h6" color="black" style={dataAndTimeStyles}>
                        Date & Time:
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            sx={dataAndTimeSX}
                            label="Select date & time"
                            views={['year', 'day', 'hours']}
                            value={transactionDateValue}
                            onChange={(newValue : any) => setTransactionDateValue(newValue)}
                        />
                    </LocalizationProvider>
                    <Typography component="h2" variant="h6" color="black" style={chooseEmplyeeStyles}>
                        Choose employee:
                    </Typography>
                    <FixedSizeList
                        height={115}
                        width={573}
                        itemSize={40}
                        itemCount={employees.length}
                        overscanCount={5}
                        style={listStyle}
                    >
                        {renderRow}
                    </FixedSizeList>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={buttonSX}
                    >
                        Finish Reservation
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