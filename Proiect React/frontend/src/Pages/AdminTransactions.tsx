import React, {useEffect} from "react"
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import {useLocation, useNavigate} from "react-router-dom";
import {
    adminTransactionsStyles, logoutIconSX, mainAdminTransactionBoxSX, boxSX, itemButtonSX,
    itemTextSX, colorSX, refreshSX, alertSX, transactionDetaliesInterface, titleSX, pastBoxSX,
    middleBoxSX, futureBoxSX, editColorSX, addTransactionSX, totalIncomeSX
} from "./AdminTransactions.styles";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import {AlertColor, Button, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {FixedSizeList, ListChildComponentProps} from "react-window";
import axios from "axios";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RefreshTwoToneIcon from "@mui/icons-material/RefreshTwoTone";
import Snackbar from "@mui/material/Snackbar";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AdminTransactions = (): JSX.Element => {

    const navigate = useNavigate();
    const location = useLocation();
    const adminId = parseInt(location.state?.key, 10);

    const [severityValue, setSeverityValue] = React.useState<AlertColor | undefined>("success");
    const [errValue, setErrValue] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const [pastTransactions, setPastTransactions] = React.useState<transactionDetaliesInterface[]>([])
    const [futureTransactions, setFutureTransactions] = React.useState<transactionDetaliesInterface[]>([])

    const [totalIncome, setTotalIncome] = React.useState<number>(0);

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
                axios.get("http://localhost:8081/Transaction/GetAllPastTransactions", {
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((response: any) => {
                    setPastTransactions(response.data)
                })

                axios.get("http://localhost:8081/Transaction/GetAllFutureTransactions", {
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((response: any) => {
                    setFutureTransactions(response.data)
                })

                axios.get("http://localhost:8081/Transaction/GetTotalIncome", {
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((response: any) => {
                    setTotalIncome(response.data)
                })
            }, 2000);

        }).catch((error: any) => {
            console.error(error)

            setSeverityValue("error")
            setErrValue(error.response.data)
            setOpen(true)
        })
    }

    const handleEditTransaction= (transactionId: number) => {
        navigate("/UpdateTransaction", {state : {key : transactionId}})
    }

    const handleAddTransaction= () => {
        navigate("/InsertTransaction", {state : {key : 0}})
    }

    function pastRenderRow(props: ListChildComponentProps) {
        const { index, style } = props;
        const transaction = pastTransactions[index];

        return (
            <ListItem style={style} key={transaction.transactionId} component="div" disablePadding>
                <ListItemButton sx={itemButtonSX}>
                    <ListItemText primary={transaction.transactionDate + " : " + transaction.serviceName + " - " + transaction.description + " | Washer : " + transaction.firstName + " " + transaction.lastName + " | Client : " + transaction.clientFirstName + " " + transaction.clientLastName} sx={itemTextSX}/>
                    <IconButton onClick={() => handleEditTransaction(transaction.transactionId)} sx={editColorSX}>
                        <EditTwoToneIcon/>
                    </IconButton>
                    <IconButton onClick={() => handleDelete(transaction.transactionId)} sx={colorSX}>
                        <DeleteForeverTwoToneIcon/>
                    </IconButton>
                </ListItemButton>
            </ListItem>
        );
    }

    function futureRenderRow(props: ListChildComponentProps) {
        const { index, style } = props;
        const transaction = futureTransactions[index];

        return (
            <ListItem style={style} key={transaction.transactionId} component="div" disablePadding>
                <ListItemButton sx={itemButtonSX}>
                    <ListItemText primary={transaction.transactionDate + " : " + transaction.serviceName + " - " + transaction.description + " | Washer : " + transaction.firstName + " " + transaction.lastName + " | Client : " + transaction.clientFirstName + " " + transaction.clientLastName} sx={itemTextSX}/>
                    <IconButton onClick={() => handleEditTransaction(transaction.transactionId)} sx={editColorSX}>
                        <EditTwoToneIcon/>
                    </IconButton>
                    <IconButton onClick={() => handleDelete(transaction.transactionId)} sx={colorSX}>
                        <DeleteForeverTwoToneIcon/>
                    </IconButton>
                </ListItemButton>
            </ListItem>
        );
    }

    useEffect(() => {
        axios.get("http://localhost:8081/Transaction/GetAllPastTransactions", {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setPastTransactions(response.data)
        })

        axios.get("http://localhost:8081/Transaction/GetAllFutureTransactions", {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setFutureTransactions(response.data)
        })

        axios.get("http://localhost:8081/Transaction/GetTotalIncome", {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setTotalIncome(response.data)
        })

    }, [adminId])

    const handleLogout = () => {
        navigate("/")
    };

    const handleGoBack = () => {
        navigate("/Admin", {state : {key : adminId}})
    }

    const handleRefresh = () => {
        axios.get("http://localhost:8081/Transaction/GetAllPastTransactions",{
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setPastTransactions(response.data)
        })

        axios.get("http://localhost:8081/Transaction/GetAllFutureTransactions", {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setFutureTransactions(response.data)
        })

        axios.get("http://localhost:8081/Transaction/GetTotalIncome", {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setTotalIncome(response.data)
        })
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return <div style={adminTransactionsStyles}>
        <IconButton onClick={handleLogout}>
            <LogoutIcon sx={logoutIconSX}/>
        </IconButton>
        <Box sx={mainAdminTransactionBoxSX}>
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
                        itemSize={80}
                        itemCount={pastTransactions.length}
                        overscanCount={5}
                    >
                        {pastRenderRow}
                    </FixedSizeList>
                    <Typography component="h2" variant="h6" color="black" sx={totalIncomeSX}>
                        {"Total Income: " + totalIncome}
                    </Typography>
                </Box>
                <Box sx={middleBoxSX}>
                    <IconButton onClick={handleRefresh} sx={refreshSX}>
                        <RefreshTwoToneIcon/>
                    </IconButton>
                    <IconButton onClick={() => handleAddTransaction()} sx={addTransactionSX}>
                        <AddCircleTwoToneIcon/>
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
                    <Typography component="h2" variant="h6" color="orange" sx={totalIncomeSX}>
                        {"Total Income: " + totalIncome}
                    </Typography>
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