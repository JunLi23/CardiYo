// don't change imports, unless adding new ones, thank you!
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./pages/App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import HealthHub from "./pages/HealthHub";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import "./styles/index.css";
import LoginSignUp from "./pages/LoginSignUp";
import FAQ from "./pages/FAQ";
import NewMessage from "./pages/2233";

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <App />,
  //   children: [
  //     {
  //       path: "/",
  //       element: <RecordList />,
  //     },
  //   ],
  // },
  // {
  //   path: "/edit/:id",
  //   element: <App />,
  //   children: [
  //     {
  //       path: "/edit/:id",
  //       element: <Record />,
  //     },
  //   ],
  // },
  // {
  //   path: "/create",
  //   element: <App />,
  //   children: [
  //     {
  //       path: "/create",
  //       element: <Record />,
  //     },
  //   ],
  // }, 
  {
  path: "/",
  element: <LoginSignUp />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/Workouts",
    element: <Workouts />,
  },
  {
    path: "/HealthHub",
    element:<HealthHub />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/Settings",
    element: <Settings />,
  },
  {
    path: "/LoginSignUp",
    element: <LoginSignUp />,
  },
  {
    path: "/FAQ",
    element: <FAQ />,
  },
  {
    path: "/new-message",
    element: <NewMessage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   