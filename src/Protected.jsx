import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Context/AuthContext";

export const Protected = ({ children }) => {
  const { user } = useContext(Context);

  if (user) {
    // Case 1: If user is present, allow access to children (DashboardPage)
    return children;
  } else {
    // Case 2: If user is not present, navigate to the specified route (default is "/")
    return <Navigate to="/" />;
  }
};
