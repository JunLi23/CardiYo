// don't change imports, unless adding new ones, thank you!
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./pages/App";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import HealthHub from "./pages/HealthHub";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import "./styles/index.css";
import LoginSignUp from "./pages/LoginSignUp";
import FAQ from "./pages/FAQ";
import NewMessage from "./pages/2233";

const savedDark = sessionStorage.getItem("darkMode");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (savedDark === "true" || (savedDark === null && prefersDark)) {
  document.body.classList.add("dark");
}
const textScale = sessionStorage.getItem("textScale");
if (textScale && textScale !== "off") {
  document.documentElement.classList.add(`large-text-${textScale}`);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginSignUp />,
  },
  {
    path: "/LoginSignUp",
    element: <LoginSignUp />,
  },
  {
    path: "/",
    element: <App />,
    children: [
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
        element: <HealthHub />,
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
        path: "/FAQ",
        element: <FAQ />,
      },
      {
        path: "/new-message",
        element: <NewMessage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);