import { createBrowserRouter } from "react-router-dom";

import Home from "./Components/Home/Home.jsx";
import App from "./App";
import Default from "./Default";
import Login from "./Components/Auth/Login/Login";

import Users from "./Components/Users/Users";
import Courses_Requests from "./Components/Courses/Requests/Requests.jsx";

import Courses_Applications from "./Components/Courses/Applications/Applications.jsx";
import Courses_Applications_Listof_Freelancers from "./Components/Courses/Applications/List.jsx";
import Courses_Applications_Profile from "./Components/Courses/Applications/Profile.jsx";

import Courses_Paying from "./Components/Courses/Paying/Paying.jsx";
import Courses_Paying_item from "./Components/Courses/Paying/item.jsx";

import All_Courses from "./Components/Courses/All_Courses/All_Courses.jsx";
import All_Courses_item from "./Components/Courses/All_Courses/Item.jsx";

import Request_Course_Item from "./Components/Courses/Requests/Item.jsx";
import Feedbacks_Clients from "./Components/Feedbacks/Clients_Freedbacks/Clients_Freedbacks.jsx";
import Feedbacks_Freelancers from "./Components/Feedbacks/Freelancers_Feedbacks/Freelancers_Feedbacks.jsx";
import Home_Feedbacks from "./Components/Feedbacks/Home_Feedbacks/Home_Feedbacks.jsx";

import Contact from "./Components/Contact/Contact.jsx";
import Not_Found from "./Components/Not_Found";
import Not_Finished from "./Components/Not_Finished";
import ErrorElement from "./Components/ErrorElement";
import Client_Profile from "./Components/Users/Client_Profile.jsx";
import Freelancer_Profile from "./Components/Users/Freelancer_Profile.jsx";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Default />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Home",
                element: <Home />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Users",
                element: <Users />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Users/Clients/:userId",
                element: <Client_Profile />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Users/Freelancers/:userId",
                element: <Freelancer_Profile />,
                errorElement: <ErrorElement />,
            },

            {
                path: "/All_Courses",
                element: <All_Courses />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/All_Courses/:id",
                element: <All_Courses_item />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Courses_Requests",
                element: <Courses_Requests />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Courses_Requests/:id",
                element: <Request_Course_Item />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Courses_Applications",
                element: <Courses_Applications />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Courses_Applications/:courseId",
                element: <Courses_Applications_Listof_Freelancers />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Courses_Applications/:courseId/:freelancerId",
                element: <Courses_Applications_Profile />,
                errorElement: <ErrorElement />,
            },

            {
                path: "/Courses_Paying",
                element: <Courses_Paying />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Courses_Paying/:courseId",
                element: <Courses_Paying_item />,
                errorElement: <ErrorElement />,
            },

            {
                path: "/Home_Feedbacks",
                element: <Home_Feedbacks />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Feedbacks_Clients",
                element: <Feedbacks_Clients />,
                errorElement: <ErrorElement />,
            },
            {
                path: "/Feedbacks_Freelancers",
                element: <Feedbacks_Freelancers />,
                errorElement: <ErrorElement />,
            },

            {
                path: "/Contact",
                element: <Contact />,
                errorElement: <ErrorElement />,
            },
        ],
    },
    {
        path: "/Login",
        element: <Login />,
        errorElement: <ErrorElement />,
    },

    {
        path: "*",
        element: <Not_Found />,
    },
]);

export default routes;
