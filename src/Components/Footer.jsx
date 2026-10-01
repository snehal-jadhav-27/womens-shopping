import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <h2>HerStyle</h2>
          <p>
            Discover the latest fashion and trends for women.
            Shop your favorite styles with HerStyle.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/categories">Categories</a>
          <a href="/about">About</a>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h3>Customer Service</h3>
          <a href="/contact">Contact Us</a>
          <a href="/orders">My Orders</a>
          <a href="/wishlist">Wishlist</a>
          <a href="/cart">Shopping Cart</a>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 HerStyle. All Rights Reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;