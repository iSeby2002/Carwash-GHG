import React from "react"
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

export interface serviceInterface {
    serviceId : number,
    serviceName : string,
    description : string,
    price : number
}

export interface transactionInterface {
    transactionId : number,
    clientId : number,
    employeeId : number,
    serviceId : number,
    transactionDate : string,
    price : number,
    service : serviceInterface
}

export const changePasswordStyles: React.CSSProperties = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
}

export const mainChangePasswordBoxSX: React.CSSProperties = {
    gap: "50px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}


export const titleSX: React.CSSProperties = {
    marginTop: 20
}

export const logoutIconSX: React.CSSProperties = {
    color: "black"
}

export const homeIconSX: React.CSSProperties = {
    color: "black"
}

export const accountIconSX: React.CSSProperties = {
    color: "black"
}

export const boxSX: React.CSSProperties = {
    backgroundColor: "orange",
    width: 550,
}

export const currentPasswordSX: React.CSSProperties = {
    marginTop: 2,
    marginLeft: 5
}

export const currentPasswordFieldStyles: React.CSSProperties = {
    width: 300,
    marginTop: -40,
    marginLeft: 240,
    backgroundColor: 'white',
}

export const newPasswordSX: React.CSSProperties = {
    marginTop: 2,
    marginLeft: 5
}

export const newPasswordFieldStyles: React.CSSProperties = {
    width: 300,
    marginTop: -40,
    marginLeft: 240,
    backgroundColor: 'white',
}

export const confirmPasswordSX: React.CSSProperties = {
    marginTop: 2,
    marginLeft: 5
}

export const confirmPasswordFieldStyles: React.CSSProperties = {
    width: 300,
    marginTop: -40,
    marginLeft: 240,
    backgroundColor: 'white',
}

export const saveButtonSX: React.CSSProperties = {
    marginTop: 2,
    marginLeft: 22,
    marginBottom: 2
}

export const cancelButtonSX: React.CSSProperties = {
    marginTop: 2,
    marginLeft: 5,
    marginBottom: 2
}

export const alertSX: React.CSSProperties = {
    width: '100%'
}