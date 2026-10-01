import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }

    // Get registered user
    const registeredUser = JSON.parse(
      localStorage.getItem("herstyleUser")
    );

    // User not registered
    if (!registeredUser) {
      alert("You are not registered. Please register first.");
      navigate("/register");
      return;
    }

    // Check login details
    if (
      email === registeredUser.email &&
      password === registeredUser.password
    ) {
      alert("Login successful!");

      localStorage.setItem("isLoggedIn", "true");

      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* Left Side */}
        <div className="login-image">
          <div className="login-overlay">
            <h1>HerStyle</h1>
            <p>
              Style that makes you feel confident.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="login-form-section">

          <div className="login-form">

            <p className="login-small-title">
              WELCOME BACK
            </p>

            <h2>Login to HerStyle</h2>

            <p className="login-description">
              Sign in to continue shopping your favorite styles.
            </p>

            <form onSubmit={handleLogin}>

              {/* Email */}
              <div className="input-group">
                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

              {/* Password */}
              <div className="input-group">
                <label>Password</label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="login-button"
              >
                LOGIN
              </button>

            </form>

            {/* Register */}
            <div className="register-text">
              Don't have an account?
              
              <button
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;