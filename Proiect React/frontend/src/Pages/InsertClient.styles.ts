import React from "react";
import image from "./wallpaperflare.com_wallpaper.jpg";


export const insertClientStyles: React.CSSProperties = {
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

export const mainInsertClientBoxSX: React.CSSProperties = {
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
    width: "60%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "104px"
}

export const lastNameBoxSX: React.CSSProperties = {
    width: "60%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "107px"
}

export const phoneBoxSX: React.CSSProperties = {
    width: "60%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "147px"
}

export const emailBoxSX: React.CSSProperties = {
    width: "60%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "156px"
}

export const passwordBoxSX: React.CSSProperties = {
    width: "60%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "118px"
}

export const confirmPasswordBoxSX: React.CSSProperties = {
    marginBottom: 2,
    width: "60%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "42px"
}

export const firstNameFieldStyles: React.CSSProperties = {
    width: "60%",
    backgroundColor: 'white',
}

export const lastNameFieldStyles: React.CSSProperties = {
    width: "60%",
    backgroundColor: 'white',
}

export const phoneFieldStyles: React.CSSProperties = {
    width: "60%",
    backgroundColor: 'white',
}

export const emailFieldStyles: React.CSSProperties = {
    width: "60%",
    backgroundColor: 'white',
}

export const passwordFieldStyles: React.CSSProperties = {
    width: "60%",
    backgroundColor: 'white',
}

export const confirmPasswordFieldStyles: React.CSSProperties = {
    width: "60%",
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
