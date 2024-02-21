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

export interface transactionInterface {
    transactionId : number,
    clientId : number,
    employeeId : number,
    serviceId : number,
    transactionDate : string,
    price : number
}

export const updateTransactionsStyles: React.CSSProperties = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
}

export const mainUpdateTransactionBoxSX: React.CSSProperties = {
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

export const boxSX: React.CSSProperties = {
    backgroundColor: "orange",
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: "50px",
}

export const alertSX: React.CSSProperties = {
    width: '100%'
}

export const chooseEmplyeeStyles: React.CSSProperties ={
    color: "black"
}

export const washTypeStyles: React.CSSProperties = {
    color: "black"
}

export const selectSX: React.CSSProperties ={
    width: "65%",
    backgroundColor: 'white'
}

export const dataAndTimeStyles: React.CSSProperties ={
    color: "black"
}

export const dataAndTimeSX: React.CSSProperties ={
    width: "65%",
    backgroundColor: 'white'
}

export const emplyeesSX: React.CSSProperties ={
    color: "white"
}

export const clientsSX: React.CSSProperties ={
    color: "white"
}

export const radioSX: React.CSSProperties ={
    color: "white"
}

export const listStyle: React.CSSProperties = {
    width: "65%"
}

export const servicesBoxSX: React.CSSProperties = {
    marginTop: 2,
    display: 'flex',
    width: "50%",
    flexDirection: 'row',
    alignItems: 'center',
    gap: "85px",
}

export const dateBoxSX: React.CSSProperties = {
    display: 'flex',
    width: "50%",
    flexDirection: 'row',
    alignItems: 'center',
    gap: "70px",
}

export const employeesBoxSX: React.CSSProperties = {
    display: 'flex',
    width: "50%",
    flexDirection: 'row',
    alignItems: 'center',
    gap: "19px",
}

export const clientsBoxSX: React.CSSProperties = {
    display: 'flex',
    width: "50%",
    flexDirection: 'row',
    alignItems: 'center',
    gap: "60px",
}

export const buttonsBoxSX: React.CSSProperties = {
    display: 'flex',
    width: "50%",
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: "50px",
}