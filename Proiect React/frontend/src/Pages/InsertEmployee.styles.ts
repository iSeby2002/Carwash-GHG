import React from "react";
import image from "./wallpaperflare.com_wallpaper.jpg";

export const insertEmployeeStyles: React.CSSProperties = {
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

export const mainInsertEmployeeBoxSX: React.CSSProperties = {
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

export const firstNameBoxSX: React.CSSProperties = {
    marginTop: 2,
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "40px"
}

export const lastNameBoxSX: React.CSSProperties = {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "42px"
}

export const salaryBoxSX: React.CSSProperties = {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "82px"
}

export const streetAddressBoxSX: React.CSSProperties = {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "7px"
}

export const cityBoxSX: React.CSSProperties = {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "106px"
}

export const stateBoxSX: React.CSSProperties = {
    marginBottom: 2,
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "94px"
}

export const firstNameFieldStyles: React.CSSProperties = {
    width: "70%",
    backgroundColor: 'white',
}

export const lastNameFieldStyles: React.CSSProperties = {
    width: "70%",
    backgroundColor: 'white',
}

export const salaryFieldStyles: React.CSSProperties = {
    width: "70%",
    backgroundColor: 'white',
}

export const streetAddressFieldStyles: React.CSSProperties = {
    width: "70%",
    backgroundColor: 'white',
}

export const cityFieldStyles: React.CSSProperties = {
    width: "70%",
    backgroundColor: 'white',
}

export const stateFieldStyles: React.CSSProperties = {
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