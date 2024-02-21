import React from 'react';
import './App.css';
import {Route, Router, RouterProvider, Routes} from "react-router-dom";
import {router} from "./Router/router";
import {SignIn} from "./Pages/SignIn";


const App = () => {

    return <div>
        <RouterProvider router={router}></RouterProvider>
    </div>

}

export default App;
