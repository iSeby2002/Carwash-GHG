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
export const profileStyles: React.CSSProperties = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
}

export const titleSX: React.CSSProperties = {
    marginTop: 20
}

export const mainProfileBoxSX: React.CSSProperties = {
    gap: "50px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

export const boxSX: React.CSSProperties = {
    backgroundColor: "orange",
    width: 500,
}

export const firstNameSX: React.CSSProperties = {
    marginTop: 2,
    marginLeft: 5,
}

export const firstNameFieldStyles: React.CSSProperties = {
    width: 300,
    marginTop: -40,
    marginLeft: 190,
    backgroundColor: 'white',
}

export const lastNameSX: React.CSSProperties = {
    marginTop: 2,
    marginLeft: 5,
}

export const lastNameFieldStyles: React.CSSProperties = {
    width: 300,
    marginTop: -40,
    marginLeft: 190,
    backgroundColor: 'white',
}

export const phoneSX: React.CSSProperties = {
    marginTop: 2,
    marginLeft: 5,
}

export const phoneFieldStyles: React.CSSProperties = {
    width: 300,
    marginTop: -40,
    marginLeft: 190,
    backgroundColor: 'white',
}

export const emailSX: React.CSSProperties = {
    marginTop: 2,
    marginLeft: 5,
}

export const emailFieldStyles: React.CSSProperties = {
    width: 300,
    marginTop: -40,
    marginLeft: 190,
    backgroundColor: 'white',
}

export const passwordSX: React.CSSProperties = {
    marginTop: 2,
    marginLeft: 5,
}

export const passwordFieldStyles: React.CSSProperties = {
    width: 300,
    marginTop: -40,
    marginLeft: 190,
    backgroundColor: 'white',
}

export const transactionSX: React.CSSProperties = {
    marginTop: 2,
    marginLeft: 5,
}

export const editButtonSX: React.CSSProperties = {
    marginLeft: 4,
    marginTop: 3,
    marginBottom: 1,
    width: 200
}

export const saveButtonSX: React.CSSProperties = {
    marginLeft: 2.5,
    marginTop: 3,
    marginBottom: 1,
    width: 100
}

export const cancelButtonSX: React.CSSProperties = {
    marginLeft: 2,
    marginTop: 3,
    marginBottom: 1,
    width: 100
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

export const alertSX: React.CSSProperties = {
    width: '100%'
}

export const manageTransactionButtonSX: React.CSSProperties ={
    marginLeft: 28,
    marginTop: -7
}

export const changePasswordButtonSX: React.CSSProperties ={
    marginLeft: 20
}