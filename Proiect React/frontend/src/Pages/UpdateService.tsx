import React, {useEffect, useState} from "react"
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import {useLocation, useNavigate} from "react-router-dom";
import {updateServiceStyles, logoutIconSX, descriptionFieldStyles, priceFieldStyles,
    descriptionBoxSX, buttonsBoxSX, goBackBoxSX, mainUpdateServiceBoxSX, serviceNameBoxSX,
    priceBoxSX, boxSX, alertSX, serviceNameFieldStyles, titleSX, serviceInterface
} from "./UpdateService.styles";
import {AlertColor, Button, TextField} from "@mui/material";
import axios from "axios";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const UpdateService = (): JSX.Element => {

    const navigate = useNavigate();
    const location = useLocation();
    const serviceId = parseInt(location.state?.key, 10);

    const [severityValue, setSeverityValue] = React.useState<AlertColor | undefined>("success");
    const [errValue, setErrValue] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const [service, setService] = React.useState<serviceInterface>({
        serviceId : serviceId,
        serviceName : "",
        description : "",
        price : 0});

    useEffect(() => {
        console.log(serviceId);
        axios.post("http://localhost:8081/Service/GetById", serviceId , {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setService(response.data);
            console.log(service)
            setServiceName(response.data.serviceName)
            setDescription(response.data.description)
            setPrice(response.data.price)
        })

    }, [serviceId]);

    const [notEditable, setNotEditable] = useState(true);
    const handleEdit = () => {
        setNotEditable(false);
    };

    const handleSave = () => {

        const newService = {
            serviceId: serviceId,
            serviceName: serviceName,
            description: description,
            price: price
        }

        console.log(newService)

        axios.post("http://localhost:8081/Service/UpdateService", newService, {
            headers: {
                "content-type": "application/json"
            }
        }).then((response: any) => {
            setService(response.data)
            setNotEditable(true)
            setSeverityValue("success")
            setErrValue("Service saved successfully!")
            setOpen(true)
        }).catch((error: any) => {
            console.error(error)
            setSeverityValue("error")
            setErrValue(error.response.data)
            setOpen(true)
        })
    };
    const handleCancel = () => {
        setServiceName(service.serviceName)
        setDescription(service.description)
        setPrice(service.price)
        setNotEditable(true);
    };

    const [serviceName, setServiceName] = useState(service.serviceName);
    const handleChangeServiceName = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setServiceName(event.target.value);
    };

    const [description, setDescription] = useState(service.description);
    const handleChangeDescription = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescription(event.target.value);
    };

    const [price, setPrice] = useState(service.price);
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

    return <div style={updateServiceStyles}>
        <IconButton onClick={handleLogout}>
            <LogoutIcon sx={logoutIconSX}/>
        </IconButton>
        <Box sx={mainUpdateServiceBoxSX}>
            <Typography component="h1" variant="h5" color="black" sx={titleSX}>
                {service.serviceName}
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
                        InputProps={{
                            readOnly: notEditable,
                        }}
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
                        InputProps={{
                            readOnly: notEditable,
                        }}
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
                        InputProps={{
                            readOnly: notEditable,
                        }}
                        onChange={handleChangePrice}
                        variant = "filled"
                        style={priceFieldStyles}
                    />
                </Box>
                <Box sx={buttonsBoxSX}>
                    <Button
                        variant="contained"
                        disabled={!notEditable}
                        onClick={handleEdit}
                    >
                        Edit wash type
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