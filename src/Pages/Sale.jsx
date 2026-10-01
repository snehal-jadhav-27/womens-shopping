
import React, { useState } from "react";
import "./Sale.css";

function Sale() {
  const [message, setMessage] = useState("");

  const saleProducts = [
    {
      id: 1,
      name: "Floral Summer Dress",
      price: 649,
      oldPrice: 1299,
      category: "Dresses",
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Stylish Women's Jacket",
      price: 499,
      oldPrice: 999,
      category: "Jackets",
      image:
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Women's Casual Jacket",
      price: 899,
      oldPrice: 1799,
      category: "Jackets",
      image:
        "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Stylish Shoulder Bag",
      price: 599,
      oldPrice: 1199,
      category: "Bags",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwBVNzYkUWvPT0jwFjX5yLxqJhb_qXQvHs8Ki2QsUuFw&s=10",
    },
    {
      id: 5,
      name: "Women's Casual Shirt",
      price: 449,
      oldPrice: 899,
      category: "Shirts",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNVizOqT7jS73eDqTHll-yN7_RLR7Kbql-AYPGCQhqsg&s=10",
    },
    {
      id: 6,
      name: "Elegant Long Dress",
      price: 999,
      oldPrice: 1999,
      category: "Dresses",
      image:
        "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // ADD TO CART
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
              quantity: (item.quantity || 1) + 1,
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

    // Show message
    setMessage(`${product.name} added to cart!`);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div className="sale-page">

      {/* Cart Message */}
      {message && (
        <div className="cart-message">
          {message}
        </div>
      )}

      {/* Heading */}
      <div className="sale-heading">
        <p>LIMITED TIME OFFER</p>

        <h1>50% OFF SALE</h1>

        <span>
          Shop our special sale collection
        </span>
      </div>

      {/* Products */}
      <div className="sale-grid">

        {saleProducts.map((product) => (
          <div
            className="sale-card"
            key={product.id}
          >

            {/* Image */}
            <div className="sale-image">

              <img
                src={product.image}
                alt={product.name}
              />

              <span>50% OFF</span>

            </div>

            {/* Product Name */}
            <h3>{product.name}</h3>

            {/* Price */}
            <div className="price">

              <strong>
                ₹{product.price.toLocaleString("en-IN")}
              </strong>

              <del>
                ₹{product.oldPrice.toLocaleString("en-IN")}
              </del>

            </div>

            {/* Add To Cart */}
            <button
              type="button"
              onClick={() => addToCart(product)}
            >
              ADD TO CART
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Sale;
