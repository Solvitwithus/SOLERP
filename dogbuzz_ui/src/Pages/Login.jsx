import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import "../Styles/Login.css";
import axios from "axios"; // We'll use axios for making API calls
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotUsername, setForgotUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      const result = await response.json();

      if (response.ok) {
        const expiryTime = 6 / 24;
        // Set cookies using js-cookie
      Cookies.set("username", username, { path: "/", sameSite: "strict", expires: expiryTime });
      Cookies.set("sessionToken", result.sessionToken, { path: "/", sameSite: "strict", expires: expiryTime });

      // Clear any previous errors
      setError("");

      // Navigate to Dashboard
      navigate("/dashboard");
        
        
      } else {
        setError(result.message || "Invalid credentials.");
        setSuccess(""); 
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      setSuccess(""); 
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotUsername) {
      alert("Please enter your username.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/ForgotPassword", { username: forgotUsername });

      if (response.data.message === "Password reset email sent.") {
        alert("A password reset email has been sent to your registered email.");
        setIsForgotPasswordOpen(false); // Close the popup
      } else {
        alert(response.data.message); // Display any error messages
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <Helmet>
        <title>SolvItERP Login</title>
      </Helmet>
      <div className="login-card">
        <h1 className="login-title">Welcome Back to SOLERP!</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {error && <div className="popup error">{error}</div>}
        {success && <div className="popup success">{success}</div>}

        <div className="forgot-password">
          <p onClick={() => setIsForgotPasswordOpen(true)} className="forgot-link">
            Forgot password?
          </p>
        </div>

        <div className="signup-footer">
          <p>
            Don't have an account?{" "}
            <a href="/">
              <span className="signup-link">Signup</span>
            </a>
          </p>
        </div>
      </div>

      {/* Forgot Password Popup */}
      {isForgotPasswordOpen && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Forgot Password</h2>
            <input
              type="text"
              value={forgotUsername}
              onChange={(e) => setForgotUsername(e.target.value)}
              placeholder="Enter your username"
            />
            <button onClick={handleForgotPassword}>Submit</button>
            <button onClick={() => setIsForgotPasswordOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
