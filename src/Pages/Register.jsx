import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Check if user already exists
    const existingUser = JSON.parse(
      localStorage.getItem("herstyleUser")
    );

    if (existingUser && existingUser.email === email) {
      alert("This email is already registered.");
      navigate("/login");
      return;
    }

    // Save user
    const user = {
      name: name,
      email: email,
      password: password,
    };

    localStorage.setItem(
      "herstyleUser",
      JSON.stringify(user)
    );

    alert("Registration successful!");

    navigate("/login");
  };

  return (
    <div className="register-page">

      <div className="register-container">

        {/* Left Side */}
        <div className="register-image">
          <div className="register-overlay">
            <h1>HerStyle</h1>
            <p>
              Create your account and discover your style.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="register-form-section">

          <div className="register-form">

            <p className="register-small-title">
              JOIN HERSTYLE
            </p>

            <h2>Create Account</h2>

            <p className="register-description">
              Register to start shopping your favorite
              fashion.
            </p>

            <form onSubmit={handleRegister}>

              {/* Name */}
              <div className="register-input">
                <label>Full Name</label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </div>

              {/* Email */}
              <div className="register-input">
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
              <div className="register-input">
                <label>Password</label>

                <input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
              </div>

              {/* Confirm Password */}
              <div className="register-input">
                <label>Confirm Password</label>

                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                />
              </div>

              <button
                type="submit"
                className="register-button"
              >
                CREATE ACCOUNT
              </button>

            </form>

            {/* Login */}
            <div className="already-account">
              Already have an account?

              <button
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;