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

export interface employeeInterface {
    employeeId : number,
    firstName : string,
    lastName : string,
    salary : number,
    disponibility : boolean,
    employeeAddress : employeeAddressInterface,
    transactions : transactionInterface[]
}

export interface employeeAddressInterface {
    employeeAddressId : number,
    streetAddress : string,
    city : string,
    state : string,
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
    price : number
}

export const adminStyles: React.CSSProperties = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
}

export const logoutIconSX: React.CSSProperties = {
    color: "black"
}

export const mainAdminBoxSX: React.CSSProperties = {
    gap: "50px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

export const titleSX: React.CSSProperties = {
    marginTop: 20
}

export const boxSX: React.CSSProperties = {
    backgroundColor: "orange",
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
}

export const clientBoxSX: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

export const employeeBoxSX: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

export const serviceBoxSX: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

export const alertSX: React.CSSProperties = {
    width: '100%'
}

export const refreshSX: React.CSSProperties = {
    color: "white",
    marginTop: -37,
    marginRight: 1,
    backgroundColor: "black",
    border: '1px solid black',
}

export const deleteColorSX: React.CSSProperties = {
    color: "white",
    backgroundColor: "black",
    border: '1px solid black',
}

export const editColorSX: React.CSSProperties = {
    color: "white",
    backgroundColor: "black",
    border: '1px solid black',
    marginRight: 2
}

export const addClientSX: React.CSSProperties = {
    color: "white",
    backgroundColor: "black",
    border: '1px solid black',
    marginLeft: -60,
    marginTop: 1
}

export const clientsStyles: React.CSSProperties = {
    marginTop: -30,
}

export const addEmployeeSX: React.CSSProperties = {
    color: "white",
    backgroundColor: "black",
    border: '1px solid black',
    marginLeft: -60,
    marginTop: 1
}

export const employeesStyles: React.CSSProperties = {
    marginTop: -30,
}

export const addServiceSX: React.CSSProperties = {
    color: "white",
    backgroundColor: "black",
    border: '1px solid black',
    marginLeft: -60,
    marginTop: 1
}

export const servicesStyles: React.CSSProperties = {
    marginTop: -30,
}

export const itemButtonSX: React.CSSProperties = {
    backgroundColor: "grey",
    border: '1px solid black',
    borderRadius: '4px'
}

export const itemTextSX: React.CSSProperties = {
    color: "white"
}

export const manageTransactionsButtonSX: React.CSSProperties = {

}