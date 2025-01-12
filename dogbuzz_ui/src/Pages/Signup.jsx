import React, { useState } from "react";
import "../Styles/Signup.css";
import { useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet"
const Signup = () => {
    const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"), // Ensure passwords match
    };

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      setSuccess(""); // Clear success message
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/Signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
        setError(""); // Clear any previous error messages
        // Hide the popup after 10 seconds
        setTimeout(() => setSuccess(""), 10000);
        navigate("/login"); // Redirect to the login page after successful signup
      } else {
        setError(result.message || "An error occurred.");
        setSuccess(""); // Clear success message
        // Hide the popup after 10 seconds
        setTimeout(() => setError(""), 10000);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      setSuccess(""); // Clear success message
      // Hide the popup after 10 seconds
      setTimeout(() => setError(""), 10000);
    }
  };

  return (
    <div className="signup-container">
      <Helmet>
        <title>SolvItERP Sign Up</title>
      </Helmet>
      <title>SolvItERP Sign Up</title>
      <div className="signup-card">
        <h1 className="signup-title">Welcome to SOLERP!</h1>
        <p className="signup-subtitle">Create your account to get started</p>

        <form className="signup-form" onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
              maxLength="10"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
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
              required
              minLength="8"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm your password"
              required
              minLength="8"
            />
          </div>

          <div className="input-group">
            <label>
              <input type="checkbox" required /> By signing up, you agree to our
              <a href="/terms"> Terms and Conditions</a>.
            </label>
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account?{" "}
            <a href="/login">
              <span className="login-link">Login</span>
            </a>
          </p>
        </div>
      </div>

      {(error || success) && (
        <div className={`popup ${error ? "error" : "success"}`}>
          <p>{error || success}</p>
        </div>
      )}
    </div>
  );
};

export default Signup;
