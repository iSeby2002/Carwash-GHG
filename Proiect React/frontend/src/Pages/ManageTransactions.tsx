import React, {useEffect} from "react"
import {useLocation, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
    accountIconSX,
    manageTransactionsStyles,
    homeIconSX,
    logoutIconSX,
    mainManageTransactionBoxSX,
    titleSX,
    boxSX,
    itemButtonSX,
    itemTextSX,
    colorSX,
    refreshSX,
    alertSX, futureBoxSX, pastBoxSX, middleBoxSX, transactionDetaliesInterface
} from "./ManageTransactions.styles";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import {FixedSizeList, ListChildComponentProps} from "react-window";
import {AlertColor, Button, ListItem, ListItemButton, ListItemText} from "@mui/material";
import axios from "axios";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ManageTransactions = () : JSX.Element =>{
    const navigate = useNavigate();
    const location = useLocation();
    const clientId = parseInt(location.state?.key, 10);

    const [severityValue, setSeverityValue] = React.useState<AlertColor | undefined>("success");
    const [errValue, setErrValue] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const [pastTransactions, setPastTransactions] = React.useState<transactionDetaliesInterface[]>([])
    const [futureTransactions, setFutureTransactions] = React.useState<transactionDetaliesInterface[]>([])

    function pastRenderRow(props: ListChildComponentProps) {
        const { index, style } = props;
        const transaction = pastTransactions[index];

        return (
            <ListItem style={style} key={transaction.transactionId} component="div" disablePadding>
                <ListItemButton sx={itemButtonSX}>
                    <ListItemText primary={transaction.transactionDate + " : " + transaction.serviceName + " - " + transaction.description + " | Washer : " + transaction.firstName + " " + transaction.lastName} sx={itemTextSX}/>
                </ListItemButton>
            </ListItem>
        );
    }

    const handleDelete = (transactionId: number) => {
        axios.post("http://localhost:8081/Transaction/DeleteById", transactionId, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setSeverityValue("success")
            setErrValue(response.data)
            setOpen(true)

            setTimeout(() => {
                axios.post("http://localhost:8081/Client/GetPastTransactions", clientId, {
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((response: any) => {
                    setPastTransactions(response.data)
                })

                axios.post("http://localhost:8081/Client/GetFutureTransactions", clientId, {
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((response: any) => {
                    setFutureTransactions(response.data)
                })
            }, 2000);

        }).catch((error: any) => {
            console.error(error)

            setSeverityValue("error")
            setErrValue(error.response.data)
            setOpen(true)
        })
    }

    function futureRenderRow(props: ListChildComponentProps) {
        const { index, style } = props;
        const transaction = futureTransactions[index];

        return (
            <ListItem style={style} key={transaction.transactionId} component="div" disablePadding>
                <ListItemButton sx={itemButtonSX}>
                    <ListItemText primary={transaction.transactionDate + " : " + transaction.serviceName + " - " + transaction.description + " | Washer : " + transaction.firstName + " " + transaction.lastName} sx={itemTextSX}/>
                    <IconButton onClick={() => handleDelete(transaction.transactionId)} sx={colorSX}>
                        <DeleteForeverTwoToneIcon/>
                    </IconButton>
                </ListItemButton>
            </ListItem>
        );
    }

    useEffect(() => {
        axios.post("http://localhost:8081/Client/GetPastTransactions", clientId, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setPastTransactions(response.data)
        })

        axios.post("http://localhost:8081/Client/GetFutureTransactions", clientId, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setFutureTransactions(response.data)
        })

    }, [clientId])

    const handleLogout = () => {
        navigate("/");
    }

    const handleHome = () => {
        navigate("/Reservation", {state : {key: clientId}});
    }

    const handleAccount = () => {
        navigate("/Profile", {state : {key : clientId}})
    }

    const handleGoBack = () => {
        navigate("/Profile", {state : {key : clientId}})
    }

    const handleRefresh = () => {
        axios.post("http://localhost:8081/Client/GetPastTransactions", clientId, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setPastTransactions(response.data)
        })

        axios.post("http://localhost:8081/Client/GetFutureTransactions", clientId, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setFutureTransactions(response.data)
        })
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return <div style={manageTransactionsStyles}>
        <IconButton onClick={handleLogout}>
            <LogoutIcon sx={logoutIconSX}/>
        </IconButton>
        <IconButton onClick={handleHome}>
            <HomeIcon sx={homeIconSX}/>
        </IconButton>
        <IconButton onClick={handleAccount}>
            <AccountCircleIcon sx={accountIconSX}/>
        </IconButton>
        <Box sx={mainManageTransactionBoxSX}>
            <Typography component="h1" variant="h5" color="black" sx={titleSX}>
                MANAGE TRANSACTIONS
            </Typography>
            <Box sx={boxSX}>
                <Box sx={pastBoxSX}>
                    <Typography component="h2" variant="h6" color="black">
                        Past Transactions
                    </Typography>
                    <FixedSizeList
                        height={300}
                        width='90%'
                        itemSize={60}
                        itemCount={pastTransactions.length}
                        overscanCount={5}
                    >
                        {pastRenderRow}
                    </FixedSizeList>
                </Box>
                <Box sx={middleBoxSX}>
                    <IconButton onClick={handleRefresh} sx={refreshSX}>
                        <RefreshTwoToneIcon/>
                    </IconButton>
                    <Button
                        variant="contained"
                        onClick={handleGoBack}
                    >
                        Go Back
                    </Button>
                </Box>
                <Box sx={futureBoxSX}>
                    <Typography component="h2" variant="h6" color="black">
                        Future Transactions
                    </Typography>

                    <FixedSizeList
                        height={300}
                        width='90%'
                        itemSize={80}
                        itemCount={futureTransactions.length}
                        overscanCount={5}
                    >
                        {futureRenderRow}
                    </FixedSizeList>
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