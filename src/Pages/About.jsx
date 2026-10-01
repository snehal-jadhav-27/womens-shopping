import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About HerStyle</h1>
          <p>
            Fashion that makes you feel confident, beautiful, and stylish.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
            alt="Women Fashion"
          />
        </div>

        <div className="about-content">
          <h2>Welcome to HerStyle</h2>

          <p>
            HerStyle is a modern online fashion shopping website created
            especially for women. We offer stylish and comfortable fashion
            products for every occasion.
          </p>

          <p>
            From beautiful dresses and trendy tops to kurtis, jeans, bags,
            and footwear, HerStyle brings different styles together in one
            place.
          </p>

          <p>
            Our goal is to make online shopping simple, enjoyable, and
            convenient for every customer.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-section">
        <h2>Why Choose HerStyle?</h2>

        <div className="why-container">

          <div className="why-card">
            <div className="why-icon">👗</div>
            <h3>Trendy Fashion</h3>
            <p>
              Discover the latest fashion styles and trends for women.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">💰</div>
            <h3>Affordable Prices</h3>
            <p>
              Enjoy stylish products at prices that fit your budget.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">🚚</div>
            <h3>Easy Shopping</h3>
            <p>
              Shop your favorite products easily from the comfort of your home.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">❤️</div>
            <h3>Customer Satisfaction</h3>
            <p>
              We focus on providing a simple and enjoyable shopping experience.
            </p>
          </div>

        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <h2>Our Mission</h2>

        <p>
          Our mission is to provide women with stylish, affordable, and
          quality fashion products while making online shopping easy and
          enjoyable.
        </p>
      </section>

    </div>
  );
}

export default About;