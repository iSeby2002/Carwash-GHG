import React from "react";
import image from "./wallpaperflare.com_wallpaper.jpg";

export interface transactionDetaliesInterface {
    transactionId : number,
    transactionDate : string,
    clientFirstName : string,
    clientLastName : string,
    firstName : string,
    lastName : string,
    serviceName : string,
    description : string
}

export const adminTransactionsStyles: React.CSSProperties = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
}

export const mainAdminTransactionBoxSX: React.CSSProperties = {
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
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
}

export const pastBoxSX: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

export const middleBoxSX: React.CSSProperties = {
    width: '15%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: "70px"
}

export const futureBoxSX: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

export const alertSX: React.CSSProperties = {
    width: '100%'
}

export const itemButtonSX: React.CSSProperties = {
    backgroundColor: "grey",
    border: '1px solid black',
    borderRadius: '4px',
}

export const itemTextSX: React.CSSProperties = {
    color: "white"
}

export const colorSX: React.CSSProperties = {
    color: "white",
    backgroundColor: "black",
    border: '1px solid black',
}

export const refreshSX: React.CSSProperties = {
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

export const addTransactionSX: React.CSSProperties = {
    color: "white",
    backgroundColor: "black",
    border: '1px solid black',
}

export const totalIncomeSX: React.CSSProperties = {
    marginTop: 2,
    marginBottom :2
}