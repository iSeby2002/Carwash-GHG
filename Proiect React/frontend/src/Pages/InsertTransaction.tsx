import React, {useEffect} from "react"
import {
    insertTransactionsStyles, mainInsertTransactionBoxSX, logoutIconSX, boxSX, titleSX,
    radioSX, alertSX, listStyle, selectSX, dataAndTimeStyles, serviceInterface, employeeInterface,
    dataAndTimeSX, chooseEmplyeeStyles, emplyeesSX, washTypeStyles, clientInterface,
    clientsSX, clientsBoxSX, employeesBoxSX, servicesBoxSX, dateBoxSX, buttonsBoxSX
} from "./InsertTransaction.styles";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import {useLocation, useNavigate} from "react-router-dom";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import {
    AlertColor, Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    ListItem,
    MenuItem,
    Radio, Select,
    SelectChangeEvent
} from "@mui/material";
import dayjs, {Dayjs} from "dayjs";
import {FixedSizeList, ListChildComponentProps} from "react-window";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import Snackbar from "@mui/material/Snackbar";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const InsertTransaction = (): JSX.Element => {

    const navigate = useNavigate();
    const location = useLocation();
    const adminId = parseInt(location.state?.key, 10);

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
    const [employee, setEmployee] = React.useState<employeeInterface>({
        employeeId: 0,
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

    const [clientValue,setClientValue]= React.useState('');
    const [client, setClient] = React.useState<clientInterface>({
        clientId: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        transactions: []
    });
    const [clients, setClients] = React.useState<clientInterface[]>([])

    const handleChangeWashType = (event: SelectChangeEvent) => {
        setServiceValue(event.target.value);
    };

    const handleChangeEmployee = (event: SelectChangeEvent) => {
        setEmployeeValue(event.target.value);
    };

    const handleChangeClient = (event: SelectChangeEvent) => {
        setClientValue(event.target.value);
    };

    const getServices = (): JSX.Element[] =>{
        return services.map((service) =>(
            <MenuItem key={service.serviceId} value={service.serviceId}>
                {`${service.serviceName} - ${service.description}`}
            </MenuItem>))
    }

    function renderEmployeeRow(props: ListChildComponentProps) {
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

    function renderClientRow(props: ListChildComponentProps) {
        const { index, style } = props;
        const client = clients[index];
        return (
            <ListItem style={style} key={client.clientId} component="div" disablePadding>
                <FormControlLabel
                    value={client.clientId}
                    control={<Radio sx={radioSX} />}
                    label={`${client.firstName} ${client.lastName}`}
                    checked={client.clientId === parseInt(clientValue, 10)}
                    onChange={() => handleChangeClient({ target: { value: client.clientId.toString() } } as SelectChangeEvent)}
                    sx={clientsSX}
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

        axios.get("http://localhost:8081/Client/GetAll", {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setClients(response.data)
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

        axios.post("http://localhost:8081/Client/GetById", Number(clientValue), {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setClient(response.data)
        })

    }, [adminId, employeeValue, serviceValue, clientValue]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(transactionDateValue)
        {
            const day = transactionDateValue.date();
            const month = transactionDateValue.month() + 1; // Month is zero-based, so add 1
            const year = transactionDateValue.year();
            const hour = transactionDateValue.hour();

            const newTransaction = {
                clientId: client.clientId,
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
                setErrValue("Reservation created successfully!")
                setOpen(true)

                setTimeout(() => {
                    navigate("/AdminTransactions", {state : {key : 0}})
                }, 2000);

            }).catch((error: any) => {
                console.error(error)
                setSeverityValue("error")
                setErrValue(error.response.data)
                setOpen(true)
            })
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handelGoBack = () => {
        navigate("/AdminTransactions", {state : {key : 0}})
    }

    const handleLogout = () => {
        navigate("/")
    };

    return <div style={insertTransactionsStyles}>
        <IconButton onClick={handleLogout}>
            <LogoutIcon sx={logoutIconSX}/>
        </IconButton>
        <Box sx={mainInsertTransactionBoxSX}>
            <Typography component="h1" variant="h5" color="black" sx={titleSX}>
                INSERT A RESERVATION
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={boxSX}>
                <Box sx={servicesBoxSX}>
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
                </Box>
                <Box sx={dateBoxSX}>
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
                </Box>
                <Box sx={employeesBoxSX}>
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
                        {renderEmployeeRow}
                    </FixedSizeList>
                </Box>
                <Box sx={clientsBoxSX}>
                    <Typography component="h2" variant="h6" color="black" style={chooseEmplyeeStyles}>
                        Choose client:
                    </Typography>
                    <FixedSizeList
                        height={115}
                        width={573}
                        itemSize={40}
                        itemCount={clients.length}
                        overscanCount={5}
                        style={listStyle}
                    >
                        {renderClientRow}
                    </FixedSizeList>
                </Box>
                <Box sx={buttonsBoxSX}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Finish Reservation
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handelGoBack}
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