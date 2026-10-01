import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  // Check login status
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [showProfile, setShowProfile] = useState(false);

  // Get registered user
  const registeredUser = JSON.parse(
    localStorage.getItem("herstyleUser")
  );

  // =========================
  // SEARCH
  // =========================

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (value) {
      window.location.href = `/shop?search=${encodeURIComponent(value)}`;
    } else {
      window.location.href = "/shop";
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
    setShowProfile(false);

    window.location.href = "/";
  };

  return (
    <>
      <nav className="navbar">

        {/* Logo */}
        <div className="logo">
          <a href="/">HerStyle</a>
        </div>

        {/* Menu */}
        <ul className="nav-links">

          <li>
            <a href="/">Home</a>
          </li>

          <li>
            <a href="/shop">Shop</a>
          </li>

          <li>
            <a href="/categories">Categories</a>
          </li>

          <li>
            <a href="/about">About</a>
          </li>

          <li>
            <a href="/contact">Contact</a>
          </li>

        </ul>

        {/* Right Side */}
        <div className="nav-actions">

          {/* Search */}
          <button
            className="nav-icon search-icon-btn"
            onClick={() => setShowSearch(!showSearch)}
          >
            🔍
          </button>

          {/* Wishlist */}
          <a href="/wishlist" className="nav-icon">
            ❤️
          </a>

          {/* Cart */}
          <a href="/cart" className="nav-icon">
            🛒
          </a>

          {/* =========================
              PROFILE / LOGIN
          ========================= */}

          {isLoggedIn ? (
            <div className="profile-container">

              {/* Profile Icon */}
              <button
                className="profile-icon"
                onClick={() =>
                  setShowProfile(!showProfile)
                }
              >
                👤
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="profile-dropdown">

                  <div className="profile-header">
                    <div className="profile-circle">
                      👤
                    </div>

                    <div>
                      <h4>
                        {registeredUser?.name ||
                          "User"}
                      </h4>

                      <p>
                        {registeredUser?.email}
                      </p>
                    </div>
                  </div>

                  <hr />

                  <button
                    className="profile-menu-item"
                    onClick={() =>
                      window.location.href =
                        "/profile"
                    }
                  >
                    👤 My Profile
                  </button>

                  <button
                    className="profile-menu-item"
                    onClick={() =>
                      window.location.href =
                        "/orders"
                    }
                  >
                    📦 My Orders
                  </button>

                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>

                </div>
              )}

            </div>
          ) : (
            <a href="/login" className="login-btn">
              Login
            </a>
          )}

        </div>

      </nav>

      {/* =========================
          SEARCH BAR
      ========================= */}

      {showSearch && (
        <form
          className="navbar-search"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            autoFocus
          />

          <button type="submit">
            Search
          </button>
        </form>
      )}
    </>
  );
}

export default Navbar;