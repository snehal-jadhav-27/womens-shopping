import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // Load wishlist
  useEffect(() => {
    const savedWishlist =
      JSON.parse(
        localStorage.getItem("herstyleWishlist")
      ) || [];

    setWishlist(savedWishlist);
  }, []);

  // Remove item
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "herstyleWishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  // Add item to cart
  const addToCart = (product) => {
    const existingCart =
      JSON.parse(
        localStorage.getItem("herstyleCart")
      ) || [];

    const existingProduct = existingCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "herstyleCart",
      JSON.stringify(updatedCart)
    );

    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="wishlist-page">

      {/* Header */}
      <section className="wishlist-header">
        <p>HERSTYLE</p>
        <h1>My Wishlist</h1>
        <span>
          Your favorite fashion items in one place.
        </span>
      </section>

      {wishlist.length === 0 ? (

        /* Empty Wishlist */
        <div className="empty-wishlist">

          <div className="empty-wishlist-icon">
            ♡
          </div>

          <h2>Your Wishlist is Empty</h2>

          <p>
            You haven't added any products to your
            wishlist yet.
          </p>

          <button
            onClick={() => navigate("/shop")}
          >
            EXPLORE SHOP
          </button>

        </div>

      ) : (

        /* Wishlist Products */
        <section className="wishlist-content">

          <div className="wishlist-top">
            <div>
              <p>YOUR FAVORITES</p>
              <h2>
                {wishlist.length} Items
              </h2>
            </div>

            <button
              className="continue-shopping"
              onClick={() => navigate("/shop")}
            >
              CONTINUE SHOPPING
            </button>
          </div>

          <div className="wishlist-grid">

            {wishlist.map((product) => (

              <div
                className="wishlist-card"
                key={product.id}
              >

                {/* Image */}
                <div className="wishlist-image">

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <button
                    className="remove-wishlist"
                    onClick={() =>
                      removeFromWishlist(product.id)
                    }
                  >
                    ×
                  </button>

                  <span className="wishlist-badge">
                    {product.badge}
                  </span>

                </div>

                {/* Details */}
                <div className="wishlist-details">

                  <p className="wishlist-category">
                    {product.category}
                  </p>

                  <h3>{product.name}</h3>

                  <div className="wishlist-rating">
                    ⭐ {product.rating}
                  </div>

                  <div className="wishlist-price">

                    <span>
                      ₹{product.price}
                    </span>

                    <del>
                      ₹{product.oldPrice}
                    </del>

                  </div>

                  <button
                    className="wishlist-cart-button"
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    ADD TO CART
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

      )}

    </div>
  );
}

export default Wishlist;