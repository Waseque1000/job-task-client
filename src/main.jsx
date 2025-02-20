import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Layout/Main/Main";
import Home from "./Components/Home/Home";
import AuthProviders from "./Components/Context/Authproviders";
import TaskBoard from "./TaskBoard/TaskBoard";
import Registar from "./Components/register/Register";
import PrivateRouts from "./Private/PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/task",
        element: (
          <PrivateRouts>
            <TaskBoard />
          </PrivateRouts>
        ),
      },
      {
        path: "/register",
        element: <Registar />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviders>
      <RouterProvider router={router} />
    </AuthProviders>
  </StrictMode>
);
