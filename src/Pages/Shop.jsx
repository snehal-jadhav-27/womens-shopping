import React, { useEffect, useState } from "react";
import "./Shop.css";

function Shop() {
  const [category, setCategory] = useState("All");

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Popup message state
  const [cartMessage, setCartMessage] = useState("");

  const products = [
    {
      id: 1,
      name: "Floral Summer Dress",
      category: "Dresses",
      price: 1299,
      oldPrice: 1799,
      rating: "4.8",
      badge: "SALE",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 2,
      name: "Elegant Party Dress",
      category: "Dresses",
      price: 1799,
      oldPrice: 2299,
      rating: "4.9",
      badge: "NEW",
      image:
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 3,
      name: "Casual White Top",
      category: "Tops",
      price: 799,
      oldPrice: 999,
      rating: "4.7",
      badge: "NEW",
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 4,
      name: "Stylish Top",
      category: "Tops",
      price: 699,
      oldPrice: 899,
      rating: "4.6",
      badge: "SALE",
      image:
        "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 5,
      name: "Printed Cotton Saree",
      category: "Kurtis",
      price: 999,
      oldPrice: 1299,
      rating: "4.8",
      badge: "NEW",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 6,
      name: "Designer Saree",
      category: "Kurtis",
      price: 1199,
      oldPrice: 1499,
      rating: "4.7",
      badge: "SALE",
      image:
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 7,
      name: "Classic Blue Jeans",
      category: "Jeans",
      price: 1499,
      oldPrice: 1899,
      rating: "4.8",
      badge: "HOT",
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 8,
      name: "Wide Leg Jeans",
      category: "Jeans",
      price: 1599,
      oldPrice: 1999,
      rating: "4.6",
      badge: "NEW",
      image:
        "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 9,
      name: "Elegant Handbag",
      category: "Bags",
      price: 1199,
      oldPrice: 1599,
      rating: "4.9",
      badge: "SALE",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 10,
      name: "Classic Shoulder Bag",
      category: "Bags",
      price: 999,
      oldPrice: 1399,
      rating: "4.7",
      badge: "NEW",
      image:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 11,
      name: "Women's Sneakers",
      category: "Footwear",
      price: 1599,
      oldPrice: 1999,
      rating: "4.8",
      badge: "HOT",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 12,
      name: "Casual White Shoes",
      category: "Footwear",
      price: 1399,
      oldPrice: 1799,
      rating: "4.7",
      badge: "SALE",
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80",
    },
  ];

  const categories = [
    "All",
    "Dresses",
    "Tops",
    "Kurtis",
    "Jeans",
    "Bags",
    "Footwear",
  ];

  /* =========================
     GET SEARCH VALUE FROM URL
  ========================= */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const searchValue = params.get("search") || "";

    setSearchTerm(searchValue);
  }, []);

  /* =========================
     ADD TO CART FUNCTION
  ========================= */

  const addToCart = (product) => {
    // Get existing cart
    const existingCart =
      JSON.parse(localStorage.getItem("herstyleCart")) || [];

    // Check if product already exists
    const existingProduct = existingCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      // Increase quantity
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      // Add new product
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    // Save cart
    localStorage.setItem(
      "herstyleCart",
      JSON.stringify(updatedCart)
    );

    // Show popup message
    setCartMessage(`${product.name} added to cart!`);

    // Hide popup after 2.5 seconds
    setTimeout(() => {
      setCartMessage("");
    }, 2500);
  };

  /* =========================
     ADD TO WISHLIST FUNCTION
  ========================= */

  const addToWishlist = (product) => {
    const existingWishlist =
      JSON.parse(localStorage.getItem("herstyleWishlist")) || [];

    const alreadyExists = existingWishlist.some(
      (item) => item.id === product.id
    );

    if (alreadyExists) {
      alert("This product is already in your wishlist!");
      return;
    }

    const updatedWishlist = [
      ...existingWishlist,
      product,
    ];

    localStorage.setItem(
      "herstyleWishlist",
      JSON.stringify(updatedWishlist)
    );

    alert(`${product.name} added to wishlist!`);
  };

  /* =========================
     FILTER PRODUCTS
  ========================= */

  const filteredProducts = products.filter((product) => {

    // Category filter
    const matchesCategory =
      category === "All" ||
      product.category === category;

    // Search filter
    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="shop-page">

      {/* =========================
          CART POPUP MESSAGE
      ========================= */}

      {cartMessage && (
        <div className="cart-popup">
          <span className="popup-icon">✓</span>

          <div>
            <strong>Added to Cart</strong>
            <p>{cartMessage}</p>
          </div>
        </div>
      )}

      {/* Shop Header */}
      <section className="shop-banner">
        <div className="shop-banner-content">
          <p>HERSTYLE COLLECTION</p>

          <h1>Find Your Style</h1>

          <span>
            Discover fashion that makes you feel confident.
          </span>
        </div>
      </section>

      {/* Category Filter */}
      <section className="shop-section">

        <div className="shop-heading">
          <p>EXPLORE OUR COLLECTION</p>

          <h2>Shop All Products</h2>
        </div>

        <div className="shop-filters">

          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? "active-filter"
                  : ""
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}

        </div>

        {/* Search Result */}
        {searchTerm && (
          <div className="search-result">
            <p>
              Search results for:
              <strong> "{searchTerm}"</strong>
            </p>
          </div>
        )}

        {/* Product Count */}
        <div className="product-top">

          <p>
            Showing{" "}
            <strong>
              {filteredProducts.length}
            </strong>{" "}
            products
          </p>

          <p className="sort-text">
            Sort: <strong>Featured</strong>
          </p>

        </div>

        {/* Products */}
        <div className="shop-products">

          {filteredProducts.length > 0 ? (

            filteredProducts.map((product) => (

              <div
                className="shop-card"
                key={product.id}
              >

                {/* Image */}
                <div className="shop-card-image">

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <span className="product-badge">
                    {product.badge}
                  </span>

                  <button
                    className="wishlist"
                    onClick={() =>
                      addToWishlist(product)
                    }
                  >
                    ♡
                  </button>

                </div>

                {/* Product Details */}
                <div className="shop-card-content">

                  <p className="product-category">
                    {product.category}
                  </p>

                  <h3>{product.name}</h3>

                  <div className="rating">
                    ★★★★★
                    <span>
                      ({product.rating})
                    </span>
                  </div>

                  <div className="price">

                    <strong>
                      ₹{product.price}
                    </strong>

                    <del>
                      ₹{product.oldPrice}
                    </del>

                  </div>

                  {/* ADD TO CART */}
                  <button
                    className="cart-button"
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    Add to Cart
                  </button>

                </div>

              </div>

            ))

          ) : (

            /* NO SEARCH RESULT */
            <div className="no-products">
              <h2>No Products Found</h2>

              <p>
                Sorry, we couldn't find any product
                matching "{searchTerm}".
              </p>

              <button
                onClick={() => {
                  window.location.href = "/shop";
                }}
              >
                View All Products
              </button>
            </div>

          )}

        </div>

      </section>

      {/* Bottom Offer */}
      <section className="shop-offer">

        <div>

          <p>LIMITED TIME OFFER</p>

          <h2>
            Get 20% OFF Your First Order
          </h2>

          <span>
            Use code: HERSTYLE20
          </span>

        </div>

        <button onClick={() => (window.location.href = "/shop")}>
         SHOP NOW →
        </button>

      </section>

    </div>
  );
}

export default Shop;