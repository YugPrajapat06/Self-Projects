import { createBrowserRouter } from "react-router";
import Home from "./features/home/pages/Home";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import LandingPage from "./features/home/pages/LandingPage";
import ShowTrailer from "./features/movie/pages/ShowTrailer";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage/>
    },
    {
        path: "/home",
        element: <Protected><Home/></Protected>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {  
        path: "/register",
        element: <Register/>
    },
    {
        path:"/show-trailer",
        element: <ShowTrailer/>
    }
])


