import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// ProtectedRoute component checks if the user is authenticated
const ProtectedRoute = ({ children }) => {
  // Retrieve cookies for authentication
  const username = Cookies.get("username");
  const sessionToken = Cookies.get("sessionToken");

  // Check if username and sessionToken are valid
  if (!username || !sessionToken) {
    // Redirect to the login page if authentication fails
    return <Navigate to="/Login" />;
  }

  // If authenticated, allow access to the protected route
  return children;
};

export default ProtectedRoute;
