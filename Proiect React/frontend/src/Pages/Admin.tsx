import * as React from 'react';
import {
    addClientSX, addEmployeeSX, addServiceSX,
    adminStyles,
    alertSX,
    boxSX, clientBoxSX,
    clientInterface,
    clientsStyles,
    deleteColorSX,
    editColorSX, employeeBoxSX,
    employeeInterface,
    employeesStyles,
    itemButtonSX,
    itemTextSX,
    logoutIconSX,
    mainAdminBoxSX, manageTransactionsButtonSX,
    refreshSX, serviceBoxSX,
    serviceInterface,
    servicesStyles,
    titleSX
} from "./Admin.styles";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import {useLocation, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import {AlertColor, Button, ListItem, ListItemButton, ListItemText} from "@mui/material";
import Box from "@mui/material/Box";
import RefreshTwoToneIcon from "@mui/icons-material/RefreshTwoTone";
import {FixedSizeList, ListChildComponentProps} from "react-window";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {useEffect} from "react";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Admin = (): JSX.Element => {

    const navigate = useNavigate();
    const location = useLocation();
    const adminId = parseInt(location.state?.key, 10);

    const [severityValue, setSeverityValue] = React.useState<AlertColor | undefined>("success");
    const [errValue, setErrValue] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const [services, setServices] = React.useState<serviceInterface[]>([])
    const [employees, setEmployees] = React.useState<employeeInterface[]>([])
    const [clients, setClients] = React.useState<clientInterface[]>([])

    const handleDeleteClient = (clientId: number) => {
        axios.post("http://localhost:8081/Transaction/DeleteClient", clientId, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setSeverityValue("success")
            setErrValue(response.data)
            setOpen(true)

            setTimeout(() => {
                axios.get("http://localhost:8081/Client/GetAll", {
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((response: any) => {
                    setClients(response.data)
                })
            }, 2000);

        }).catch((error: any) => {
            console.error(error)

            setSeverityValue("error")
            setErrValue(error.response.data)
            setOpen(true)
        })
    }

    const handleEditClient = (clientId: number) => {
        navigate("/UpdateClient", {state : {key : clientId}})
    }

    const handleAddClient = () => {
        navigate("/InsertClient")
    }

    function clientRenderRow(props: ListChildComponentProps) {
        const { index, style } = props;
        const client = clients[index];

        return (
            <ListItem style={style} key={client.clientId} component="div" disablePadding>
                <ListItemButton sx={itemButtonSX}>
                    <ListItemText primary={client.firstName + " " + client.lastName} sx={itemTextSX}/>
                    <IconButton onClick={() => handleEditClient(client.clientId)} sx={editColorSX}>
                        <EditTwoToneIcon/>
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClient(client.clientId)} sx={deleteColorSX}>
                        <DeleteForeverTwoToneIcon/>
                    </IconButton>
                </ListItemButton>
            </ListItem>
        );
    }

    const handleDeleteEmployee = (employeeId: number) => {
        axios.post("http://localhost:8081/Transaction/DeleteEmployee", employeeId, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setSeverityValue("success")
            setErrValue(response.data)
            setOpen(true)

            setTimeout(() => {
                axios.get("http://localhost:8081/Employee/GetAll", {
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((response: any) => {
                    setEmployees(response.data)
                })
            }, 2000);

        }).catch((error: any) => {
            console.error(error)

            setSeverityValue("error")
            setErrValue(error.response.data)
            setOpen(true)
        })
    }

    const handleEditEmployee = (employeeId: number) => {
        navigate("/UpdateEmployee", {state : {key : employeeId}})
    }

    const handleAddEmployee = () => {
        navigate("/InsertEmployee")
    }

    function employeeRenderRow(props: ListChildComponentProps) {
        const { index, style } = props;
        const employee = employees[index];

        return (
            <ListItem style={style} key={employee.employeeId} component="div" disablePadding>
                <ListItemButton sx={itemButtonSX}>
                    <ListItemText primary={employee.firstName + " " + employee.lastName} sx={itemTextSX}/>
                    <IconButton onClick={() => handleEditEmployee(employee.employeeId)} sx={editColorSX}>
                        <EditTwoToneIcon/>
                    </IconButton>
                    <IconButton onClick={() => handleDeleteEmployee(employee.employeeId)} sx={deleteColorSX}>
                        <DeleteForeverTwoToneIcon/>
                    </IconButton>
                </ListItemButton>
            </ListItem>
        );
    }

    const handleDeleteService = (serviceId: number) => {
        axios.post("http://localhost:8081/Transaction/DeleteService", serviceId, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setSeverityValue("success")
            setErrValue(response.data)
            setOpen(true)

            setTimeout(() => {
                axios.get("http://localhost:8081/Service/GetAll", {
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((response: any) => {
                    setServices(response.data)
                })
            }, 2000);

        }).catch((error: any) => {
            console.error(error)

            setSeverityValue("error")
            setErrValue(error.response.data)
            setOpen(true)
        })
    }

    const handleEditService = (serviceId: number) => {
        navigate("/UpdateService", {state : {key : serviceId}})
    }

    const handleAddService = () => {
        navigate("/InsertService")
    }

    function serviceRenderRow(props: ListChildComponentProps) {
        const { index, style } = props;
        const service = services[index];

        return (
            <ListItem style={style} key={service.serviceId} component="div" disablePadding>
                <ListItemButton sx={itemButtonSX}>
                    <ListItemText primary={service.serviceName + " - " + service.description} sx={itemTextSX}/>
                    <IconButton onClick={() => handleEditService(service.serviceId)} sx={editColorSX}>
                        <EditTwoToneIcon/>
                    </IconButton>
                    <IconButton onClick={() => handleDeleteService(service.serviceId)} sx={deleteColorSX}>
                        <DeleteForeverTwoToneIcon/>
                    </IconButton>
                </ListItemButton>
            </ListItem>
        );
    }

    const handleRefresh = () => {
        axios.get("http://localhost:8081/Client/GetAll", {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setClients(response.data)
        })

        axios.get("http://localhost:8081/Employee/GetAll", {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setEmployees(response.data)
        })

        axios.get("http://localhost:8081/Service/GetAll", {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setServices(response.data)
        })
    };

    useEffect(() => {
        axios.get("http://localhost:8081/Client/GetAll", {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setClients(response.data)
        })

        axios.get("http://localhost:8081/Employee/GetAll", {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setEmployees(response.data)
        })

        axios.get("http://localhost:8081/Service/GetAll", {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setServices(response.data)
        })
    }, [adminId])

    const handleManageTransactions = () => {
        navigate("/AdminTransactions", {state : {key : 0}})
    }

    const handleLogout = () => {
        navigate("/")
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return <div style={adminStyles}>
        <IconButton onClick={handleLogout}>
            <LogoutIcon sx={logoutIconSX}/>
        </IconButton>
        <Box sx={mainAdminBoxSX}>
            <Typography component="h1" variant="h5" color="black" sx={titleSX}>
                MANAGE GHG DATABASES
            </Typography>
            <Box sx={boxSX}>
                <Box sx={clientBoxSX}>
                    <IconButton onClick={() => handleAddClient()} sx={addClientSX}>
                        <AddCircleTwoToneIcon/>
                    </IconButton>
                    <Typography component="h2" variant="h6" color="black" style={clientsStyles}>
                        Clients
                    </Typography>
                    <FixedSizeList
                        height={300}
                        width="90%"
                        itemSize={63}
                        itemCount={clients.length}
                        overscanCount={5}
                    >
                        {clientRenderRow}
                    </FixedSizeList>
                </Box>
                <Box sx={employeeBoxSX}>
                    <IconButton onClick={() => handleAddEmployee()} sx={addEmployeeSX}>
                        <AddCircleTwoToneIcon/>
                    </IconButton>
                    <Typography component="h2" variant="h6" color="black" style={employeesStyles}>
                        Employees
                    </Typography>
                    <FixedSizeList
                        height={300}
                        width="90%"
                        itemSize={63}
                        itemCount={employees.length}
                        overscanCount={5}
                    >
                        {employeeRenderRow}
                    </FixedSizeList>
                </Box>
                <Box sx={serviceBoxSX}>
                    <IconButton onClick={() => handleAddService()} sx={addServiceSX}>
                        <AddCircleTwoToneIcon/>
                    </IconButton>
                    <Typography component="h2" variant="h6" color="black" style={servicesStyles}>
                        Services
                    </Typography>
                    <FixedSizeList
                        height={300}
                        width="90%"
                        itemSize={63}
                        itemCount={services.length}
                        overscanCount={5}
                    >
                        {serviceRenderRow}
                    </FixedSizeList>
                </Box>
                <IconButton onClick={handleRefresh} sx={refreshSX}>
                    <RefreshTwoToneIcon/>
                </IconButton>
            </Box>
            <Button
                variant="contained"
                sx={manageTransactionsButtonSX}
                onClick={handleManageTransactions}
            >
                Manage Transactions
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severityValue} sx={alertSX}>
                    {errValue}
                </Alert>
            </Snackbar>
        </Box>
    </div>
}