
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Get cart items
  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("herstyleCart")) || [];

    setCart(savedCart);
  }, []);

  // Update cart
  const updateCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "herstyleCart",
      JSON.stringify(updatedCart)
    );
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: (item.quantity || 1) + 1,
          }
        : item
    );

    updateCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: (item.quantity || 1) - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  // Remove item
  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  };

  // Total price
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) * (item.quantity || 1),
    0
  );

  // Proceed to checkout
  const proceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-page">

      {/* Heading */}

      <div className="cart-heading">
        <p>HERSTYLE</p>

        <h1>My Cart</h1>

        <span>
          Review your favorite fashion items.
        </span>
      </div>

      {cart.length === 0 ? (

        /* Empty Cart */

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛍️
          </div>

          <h2>Your Cart is Empty</h2>

          <p>
            You haven't added any products to your cart yet.
          </p>

          <button
            type="button"
            onClick={() => navigate("/shop")}
          >
            CONTINUE SHOPPING
          </button>

        </div>

      ) : (

        /* Cart */

        <div className="cart-container">

          {/* Products */}

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                {/* Image */}

                <img
                  src={item.image}
                  alt={item.name}
                />

                {/* Product Details */}

                <div className="cart-product-details">

                  <h3>{item.name}</h3>

                  <p className="cart-category">
                    {item.category}
                  </p>

                  <p className="cart-price">
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </p>

                </div>

                {/* Quantity */}

                <div className="quantity-box">

                  <button
                    type="button"
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity || 1}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>

                </div>

                {/* Item Total */}

                <div className="item-total">
                  ₹
                  {(
                    Number(item.price) *
                    (item.quantity || 1)
                  ).toLocaleString("en-IN")}
                </div>

                {/* Remove */}

                <button
                  type="button"
                  className="remove-button"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  ✕
                </button>

              </div>

            ))}

          </div>

          {/* Summary */}

          <div className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>

              <span>
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>FREE</span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>

              <span>
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            {/* PROCEED TO CHECKOUT */}

            <button
              type="button"
              className="checkout-button"
              onClick={proceedToCheckout}
            >
              PROCEED TO CHECKOUT
            </button>

            {/* CONTINUE SHOPPING */}

            <button
              type="button"
              className="continue-button"
              onClick={() => navigate("/shop")}
            >
              CONTINUE SHOPPING
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;

