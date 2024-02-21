import React, {useState} from "react"
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import {insertServiceStyles, logoutIconSX, titleSX, boxSX,
    alertSX, buttonsBoxSX, descriptionBoxSX, priceBoxSX,
    mainInsertServiceBoxSX, serviceNameBoxSX, serviceNameFieldStyles,
    priceFieldStyles, descriptionFieldStyles} from "./InsertService.styles";
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

export const InsertService = (): JSX.Element => {

    const navigate = useNavigate();

    const [severityValue, setSeverityValue] = React.useState<AlertColor | undefined>("success");
    const [errValue, setErrValue] = React.useState("");
    const [open, setOpen] = React.useState(false);


    const handleCreate = () => {

        const newService = {
            serviceName: serviceName,
            description: description,
            price: price
        }

        console.log(newService)

        axios.post("http://localhost:8081/Service/InsertService", newService, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            console.log(response.data)
            setSeverityValue("success")
            setErrValue("Service saved successfully!")
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

    const [serviceName, setServiceName] = useState("");
    const handleChangeServiceName = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setServiceName(event.target.value);
    };

    const [description, setDescription] = useState("");
    const handleChangeDescription = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescription(event.target.value);
    };

    const [price, setPrice] = useState(0);
    const handleChangePrice = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPrice(Number(event.target.value));
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
    return <div style={insertServiceStyles}>
        <IconButton onClick={handleLogout}>
            <LogoutIcon sx={logoutIconSX}/>
        </IconButton>
        <Box sx={mainInsertServiceBoxSX}>
            <Typography component="h1" variant="h5" color="black" sx={titleSX}>
                {"INSERT SERVICE"}
            </Typography>
            <Box component="form" noValidate sx={boxSX}>
                <Box sx={serviceNameBoxSX}>
                    <Typography component="h2" variant="h6" color="black">
                        Service Name:
                    </Typography>
                    <TextField
                        id="serviceName"
                        label="Service Name"
                        value={serviceName}
                        onChange={handleChangeServiceName}
                        variant = "filled"
                        style={serviceNameFieldStyles}
                    />
                </Box>
                <Box sx={descriptionBoxSX}>
                    <Typography component="h2" variant="h6" color="black">
                        Description:
                    </Typography>
                    <TextField
                        id="description"
                        label="Description"
                        value={description}
                        onChange={handleChangeDescription}
                        variant = "filled"
                        style={descriptionFieldStyles}
                    />
                </Box>
                <Box sx={priceBoxSX}>
                    <Typography component="h2" variant="h6" color="black">
                        Price:
                    </Typography>
                    <TextField
                        id="price"
                        label="Price"
                        value={price}
                        onChange={handleChangePrice}
                        variant = "filled"
                        style={priceFieldStyles}
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