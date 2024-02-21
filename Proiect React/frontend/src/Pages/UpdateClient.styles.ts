import React from "react";
import image from "./wallpaperflare.com_wallpaper.jpg";

export interface clientInterface {
    clientId : number,
    firstName : string,
    lastName : string,
    email : string,
    password : string,
    phone : string,
    transactions : transactionInterface[]
}

export interface transactionInterface {
    transactionId : number,
    clientId : number,
    employeeId : number,
    serviceId : number,
    transactionDate : string,
    price : number
}

export const updateClientStyles: React.CSSProperties = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
}

export const titleSX: React.CSSProperties = {
    marginTop: 20
}

export const logoutIconSX: React.CSSProperties = {
    color: "black"
}

export const mainUpdateClientBoxSX: React.CSSProperties = {
    gap: "50px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

export const boxSX: React.CSSProperties = {
    backgroundColor: "orange",
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: "10px"
}

export const firstNameBoxSX: React.CSSProperties = {
    marginTop: 2,
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "30px"
}

export const lastNameBoxSX: React.CSSProperties = {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "32px"
}

export const phoneBoxSX: React.CSSProperties = {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "71px"
}

export const emailBoxSX: React.CSSProperties = {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "79px"
}

export const passwordBoxSX: React.CSSProperties = {
    marginBottom: 2,
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "42px"
}

export const firstNameFieldStyles: React.CSSProperties = {
    width: "70%",
    backgroundColor: 'white',
}

export const lastNameFieldStyles: React.CSSProperties = {
    width: "70%",
    backgroundColor: 'white',
}

export const phoneFieldStyles: React.CSSProperties = {
    width: "70%",
    backgroundColor: 'white',
}

export const emailFieldStyles: React.CSSProperties = {
    width: "70%",
    backgroundColor: 'white',
}

export const passwordFieldStyles: React.CSSProperties = {
    width: "70%",
    backgroundColor: 'white',
}

export const buttonsBoxSX: React.CSSProperties = {
    marginBottom: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "50px"
}

export const alertSX: React.CSSProperties = {
    width: '100%'
}

export const goBackBoxSX: React.CSSProperties = {
    marginBottom: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
}