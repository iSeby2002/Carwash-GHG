import React from "react";
import image from "./wallpaperflare.com_wallpaper.jpg";

export interface serviceInterface {
    serviceId : number,
    serviceName : string,
    description : string,
    price : number
}

export const updateServiceStyles: React.CSSProperties = {
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

export const mainUpdateServiceBoxSX: React.CSSProperties = {
    gap: "50px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

export const boxSX: React.CSSProperties = {
    backgroundColor: "orange",
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: "10px"
}

export const alertSX: React.CSSProperties = {
    width: '100%'
}

export const serviceNameBoxSX: React.CSSProperties = {
    marginTop: 2,
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "30px"
}

export const descriptionBoxSX: React.CSSProperties = {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "56px"
}

export const priceBoxSX: React.CSSProperties = {
    marginBottom: 2,
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "112px"
}

export const serviceNameFieldStyles: React.CSSProperties = {
    width: "70%",
    backgroundColor: 'white',
}

export const descriptionFieldStyles: React.CSSProperties = {
    width: "70%",
    backgroundColor: 'white',
}

export const priceFieldStyles: React.CSSProperties = {
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

export const goBackBoxSX: React.CSSProperties = {
    marginBottom: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
}