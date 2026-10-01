
import React, { useState } from "react";
import "./Home.css";

function Home() {
  const [message, setMessage] = useState("");

  const products = [
    {
      id: 101,
      name: "Elegant Party Dress",
      category: "Dresses",
      price: 1799,
      oldPrice: 2299,
      rating: "4.9",
      badge: "NEW",
      image:
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 102,
      name: "Casual Fashion Top",
      category: "Tops",
      price: 799,
      oldPrice: 999,
      rating: "4.7",
      badge: "NEW",
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 103,
      name: "Classic Blue Jeans",
      category: "Jeans",
      price: 1499,
      oldPrice: 1899,
      rating: "4.8",
      badge: "HOT",
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 104,
      name: "Elegant Handbag",
      category: "Bags",
      price: 1199,
      oldPrice: 1599,
      rating: "4.9",
      badge: "NEW",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // =========================
  // SHOW MESSAGE
  // =========================

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (product) => {
    try {
      // Get existing cart
      const savedCart = localStorage.getItem("herstyleCart");

      let cart = [];

      if (savedCart) {
        cart = JSON.parse(savedCart);
      }

      // Check if product already exists
      const existingProduct = cart.find(
        (item) => item.id === product.id
      );

      let updatedCart;

      if (existingProduct) {
        // Increase quantity
        updatedCart = cart.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: (item.quantity || 1) + 1,
            };
          }

          return item;
        });

        showMessage("Quantity increased in cart!");
      } else {
        // Add new product
        updatedCart = [
          ...cart,
          {
            ...product,
            quantity: 1,
          },
        ];

        showMessage("Item added to cart!");
      }

      // Save cart
      localStorage.setItem(
        "herstyleCart",
        JSON.stringify(updatedCart)
      );

      console.log("Updated Cart:", updatedCart);
    } catch (error) {
      console.error("Cart Error:", error);
      showMessage("Unable to add item to cart!");
    }
  };

  // =========================
  // ADD TO WISHLIST
  // =========================

  const addToWishlist = (product) => {
    try {
      const savedWishlist =
        localStorage.getItem("herstyleWishlist");

      const wishlist = savedWishlist
        ? JSON.parse(savedWishlist)
        : [];

      const alreadyExists = wishlist.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        showMessage("This item is already in wishlist!");
        return;
      }

      const updatedWishlist = [
        ...wishlist,
        product,
      ];

      localStorage.setItem(
        "herstyleWishlist",
        JSON.stringify(updatedWishlist)
      );

      showMessage("Item added to wishlist!");
    } catch (error) {
      console.error("Wishlist Error:", error);
      showMessage("Unable to add item to wishlist!");
    }
  };

  // =========================
  // SUBSCRIBE
  // =========================

  const handleSubscribe = () => {
    showMessage("Successfully subscribed!");
  };

  // =========================
  // NAVIGATION
  // =========================

  const goToShop = () => {
    window.location.href = "/shop";
  };

  const goToSale = () => {
    window.location.href = "/sale";
  };

  // =========================
  // RETURN
  // =========================

  return (
    <div className="home-page">

      {/* =========================
          POPUP MESSAGE
      ========================= */}

      {message && (
        <div className="popup-message">
          {message}
        </div>
      )}

      {/* =========================
          HERO
      ========================= */}

      <section className="hero-section">
        <div className="hero-content">

          <p className="hero-small-text">
            NEW COLLECTION 2026
          </p>

          <h1>
            Dress Your
            <br />
            <span>Confidence</span>
          </h1>

          <p className="hero-description">
            Discover beautiful styles, modern fashion
            and timeless looks made for you.
          </p>

          <button
            type="button"
            className="hero-btn"
            onClick={goToShop}
          >
            SHOP COLLECTION →
          </button>

        </div>
      </section>

      {/* =========================
          FEATURES
      ========================= */}

      <section className="features-section">

        <div className="feature-box">
          <div className="feature-icon">🚚</div>

          <div>
            <h3>Free Shipping</h3>
            <p>On orders above ₹999</p>
          </div>
        </div>

        <div className="feature-box">
          <div className="feature-icon">↩️</div>

          <div>
            <h3>Easy Returns</h3>
            <p>7 days easy return</p>
          </div>
        </div>

        <div className="feature-box">
          <div className="feature-icon">🔒</div>

          <div>
            <h3>Secure Payment</h3>
            <p>100% secure payment</p>
          </div>
        </div>

        <div className="feature-box">
          <div className="feature-icon">💖</div>

          <div>
            <h3>Quality Fashion</h3>
            <p>Made for modern women</p>
          </div>
        </div>

      </section>

      {/* =========================
          CATEGORIES
      ========================= */}

      <section className="categories-section">

        <div className="section-title">
          <p>EXPLORE OUR COLLECTION</p>
          <h2>Shop By Category</h2>
        </div>

        <div className="category-grid">

          <div className="category-item large-category">
            <img
              src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80"
              alt="Dresses"
            />

            <div className="category-overlay">
              <h3>Dresses</h3>

              <button
                type="button"
                onClick={goToShop}
              >
                Explore Collection →
              </button>
            </div>
          </div>

          <div className="category-item">
            <img
              src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80"
              alt="Tops"
            />

            <div className="category-overlay">
              <h3>Tops</h3>

              <button
                type="button"
                onClick={goToShop}
              >
                Shop Now →
              </button>
            </div>
          </div>

          <div className="category-item">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
              alt="Kurtis"
            />

            <div className="category-overlay">
              <h3>Kurtis</h3>

              <button
                type="button"
                onClick={goToShop}
              >
                Shop Now →
              </button>
            </div>
          </div>

          <div className="category-item">
            <img
              src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80"
              alt="Jeans"
            />

            <div className="category-overlay">
              <h3>Jeans</h3>

              <button
                type="button"
                onClick={goToShop}
              >
                Shop Now →
              </button>
            </div>
          </div>

          <div className="category-item">
            <img
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
              alt="Bags"
            />

            <div className="category-overlay">
              <h3>Bags</h3>

              <button
                type="button"
                onClick={goToShop}
              >
                Shop Now →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================
          SALE
      ========================= */}

      <section className="sale-section">

        <div className="sale-content">

          <p>LIMITED TIME OFFER</p>

          <h2>
            FLAT <span>50% OFF</span>
          </h2>

          <p className="sale-text">
            Upgrade your wardrobe with our
            latest collection.
          </p>

          <button
            type="button"
            onClick={goToSale}
          >
            SHOP SALE →
          </button>

        </div>
      </section>

      {/* =========================
          TRENDING
      ========================= */}

      <section className="trending-section">

        <div className="section-title">
          <p>OUR FAVORITES</p>
          <h2>Trending Now</h2>
        </div>

        <div className="trending-grid">

          {products.map((product) => (

            <div
              className="trend-card"
              key={product.id}
            >

              {/* IMAGE */}

              <div className="trend-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

                <span className="product-badge">
                  {product.badge}
                </span>

                {/* WISHLIST */}

                <button
                  type="button"
                  className="wishlist-btn"
                  onClick={() =>
                    addToWishlist(product)
                  }
                >
                  ♡
                </button>

              </div>

              {/* DETAILS */}

              <div className="trend-details">

                <h3>{product.name}</h3>

                <p className="product-price">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>

                {/* ADD TO CART */}

                <button
                  type="button"
                  className="add-cart-btn"
                  onClick={(event) => {
                    event.stopPropagation();
                    addToCart(product);
                  }}
                >
                  ADD TO CART
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* =========================
          STYLE
      ========================= */}

      <section className="style-section">

        <p>FOLLOW OUR STYLE</p>

        <h2>#HERSTYLE</h2>

        <p className="style-description">
          Get inspired. Get styled. Be yourself.
        </p>

      </section>

      {/* =========================
          NEWSLETTER
      ========================= */}

      <section className="newsletter">

        <div>

          <p>STAY IN STYLE</p>

          <h2>Get Fashion Updates</h2>

          <p>
            Subscribe to receive new arrivals,
            offers and fashion inspiration.
          </p>

        </div>

        <div className="subscribe-box">

          <input
            type="email"
            placeholder="Enter your email address"
          />

          <button
            type="button"
            onClick={handleSubscribe}
          >
            SUBSCRIBE
          </button>

        </div>

      </section>

    </div>
  );
}

export default Home;

