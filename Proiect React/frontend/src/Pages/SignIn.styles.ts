import React from "react";
import image from "./wallpaperflare.com_wallpaper.jpg";

export const signInStyles: React.CSSProperties = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
}

export const titleSX: React.CSSProperties = {
    marginTop: 25
}

export const mainSignInBoxSX: React.CSSProperties = {
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