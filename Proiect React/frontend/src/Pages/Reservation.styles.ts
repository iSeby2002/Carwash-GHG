import React from "react";
import image from "./wallpaperflare.com_wallpaper.jpg";

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

export const reservationStyles: React.CSSProperties = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
}

export const titleSX: React.CSSProperties = {
    marginTop: 20
}

export const mainReservationBoxSX: React.CSSProperties = {
    gap: "50px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

export const boxSX: React.CSSProperties = {
    backgroundColor: "orange",
    width: 600,
}

export const washTypeStyles: React.CSSProperties = {
    marginTop: 20,
    marginLeft: 45,
    color: "black"
}

export const selectSX: React.CSSProperties ={
    width: 350,
    marginTop: -5,
    marginLeft: 28,
    backgroundColor: 'white'
}

export const dataAndTimeStyles: React.CSSProperties ={
    marginTop: 20,
    marginLeft: 45,
    color: "black"
}

export const dataAndTimeSX: React.CSSProperties ={
    width: 350,
    marginTop: -5,
    marginLeft: 28,
    backgroundColor: 'white'
}

export const chooseEmplyeeStyles: React.CSSProperties ={
    marginTop: 20,
    marginLeft: 45,
    color: "black"
}

export const emplyeesSX: React.CSSProperties ={
    marginLeft: 28,
    color: "white"
}

export const radioSX: React.CSSProperties ={
    color: "white"
}

export const buttonSX: React.CSSProperties = {
    marginTop: 5,
    marginLeft: 25,
    marginBottom: 1,
    width: 200,
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

export const listStyle: React.CSSProperties = {
    marginTop: -34,
}

