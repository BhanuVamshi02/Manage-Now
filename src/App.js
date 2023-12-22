import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SigninPage from "../src/pages/SigninPage";
import DashboardPage from "../src/pages/DashboardPage";
import Home from "../src/pages/Home";
import { AuthContext } from "./Context/AuthContext";
import { Protected } from "./Protected";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
    },
    {
      path: "/login",
      element: <LoginPage></LoginPage>,
    },
    {
      path: "/signin",
      element: <SigninPage></SigninPage>,
    },
    {
      path: "/dashboard",
      element: (
        <Protected>
          <DashboardPage />
        </Protected>
      ),
    },
  ]);

  return (
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  );
};

export default App;
