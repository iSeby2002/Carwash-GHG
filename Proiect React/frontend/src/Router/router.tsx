import {createBrowserRouter, RouteObject} from "react-router-dom";
import {SignIn} from "../Pages/SignIn";
import {SignUp} from "../Pages/SignUp";
import {Reservation} from "../Pages/Reservation";
import {Admin} from "../Pages/Admin";
import {Profile} from "../Pages/Profile";
import {ChangePassword} from "../Pages/ChangePassword";
import {ManageTransactions} from "../Pages/ManageTransactions";
import {AdminTransactions} from "../Pages/AdminTransactions";
import {InsertClient} from "../Pages/InsertClient";
import {InsertEmployee} from "../Pages/InsertEmployee";
import {InsertService} from "../Pages/InsertService";
import {UpdateClient} from "../Pages/UpdateClient";
import {UpdateEmployee} from "../Pages/UpdateEmployee";
import {UpdateService} from "../Pages/UpdateService";
import {UpdateTransaction} from "../Pages/UpdateTransaction";
import {InsertTransaction} from "../Pages/InsertTransaction";

const routes: RouteObject[] = [
    {path: "/", element: <SignIn/>},
    {path: "/SignUp", element: <SignUp/>},
    {path: "/Reservation", element: <Reservation/>},
    {path: "/Admin", element: <Admin/>},
    {path: "/Profile", element: <Profile/>},
    {path: "/ChangePassword", element: <ChangePassword/>},
    {path: "/ManageTransactions", element: <ManageTransactions/>},
    {path: "/AdminTransactions", element: <AdminTransactions/>},
    {path: "/InsertClient", element: <InsertClient/>},
    {path: "/InsertEmployee", element: <InsertEmployee/>},
    {path: "/InsertService", element: <InsertService/>},
    {path: "/UpdateClient", element: <UpdateClient/>},
    {path: "/UpdateEmployee", element: <UpdateEmployee/>},
    {path: "/UpdateService", element: <UpdateService/>},
    {path: "/UpdateTransaction", element: <UpdateTransaction/>},
    {path: "/InsertTransaction", element: <InsertTransaction/>},
]

export const router = createBrowserRouter(routes)