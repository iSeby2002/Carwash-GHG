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

export const signUpStyles: React.CSSProperties = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
}

export const titleSX: React.CSSProperties = {
    marginTop: 25
}

export const mainSignUpBoxSX: React.CSSProperties = {
    gap: "50px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

export const buttonSX: React.CSSProperties = {
    marginTop: 2,
}

export const fieldStyles: React.CSSProperties = {
    backgroundColor: 'white',
}

export const alertSX: React.CSSProperties = {
    width: '100%'
}