import React, { useState } from "react";
import "./Contact.css";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you for contacting HerStyle!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="contact-page">

      {/* Header */}
      <section className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We would love to hear from you. Get in touch with HerStyle.
        </p>
      </section>

      {/* Contact Section */}
      <section className="contact-section">

        {/* Contact Information */}
        <div className="contact-info">

          <h2>Get In Touch</h2>

          <p>
            Have a question about our products, orders, or services?
            Feel free to contact us.
          </p>

          <div className="contact-item">
            <span>📍</span>
            <div>
              <h3>Address</h3>
              <p>Pune, Maharashtra, India</p>
            </div>
          </div>

          <div className="contact-item">
            <span>📧</span>
            <div>
              <h3>Email</h3>
              <p>support@herstyle.com</p>
            </div>
          </div>

          <div className="contact-item">
            <span>📞</span>
            <div>
              <h3>Phone</h3>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className="contact-item">
            <span>🕒</span>
            <div>
              <h3>Working Hours</h3>
              <p>Monday - Saturday, 10 AM - 6 PM</p>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="contact-form-container">

          <h2>Send Us a Message</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="contact-btn">
              Send Message
            </button>

          </form>

        </div>

      </section>

    </div>
  );
}

export default Contact;