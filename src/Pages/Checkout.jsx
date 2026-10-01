import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "Cash on Delivery",

    // Payment details
    upiId: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  // =========================
  // GET CART
  // =========================
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("herstyleCart");

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setCart(parsedCart);
          return;
        }
      }

      navigate("/cart");
    } catch (error) {
      console.error("Error loading cart:", error);
      navigate("/cart");
    }
  }, [navigate]);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  // =========================
  // VALIDATION
  // =========================
  const validateForm = () => {
    const newErrors = {};

    // NAME
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (!/^[A-Za-z ]+$/.test(formData.name.trim())) {
      newErrors.name = "Name should contain only letters.";
    }

    // EMAIL
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email = "Please enter a valid email.";
    }

    // PHONE
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone =
        "Please enter a valid 10-digit phone number.";
    }

    // ADDRESS
    if (!formData.address.trim()) {
      newErrors.address = "Please enter your address.";
    }

    // CITY
    if (!formData.city.trim()) {
      newErrors.city = "Please enter your city.";
    } else if (!/^[A-Za-z ]+$/.test(formData.city.trim())) {
      newErrors.city = "City should contain only letters.";
    }

    // STATE
    if (!formData.state.trim()) {
      newErrors.state = "Please enter your state.";
    } else if (!/^[A-Za-z ]+$/.test(formData.state.trim())) {
      newErrors.state = "State should contain only letters.";
    }

    // PIN CODE
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Please enter your PIN code.";
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "PIN code must contain 6 digits.";
    }

    // =========================
    // UPI VALIDATION
    // =========================
    if (formData.payment === "UPI") {
      if (!formData.upiId.trim()) {
        newErrors.upiId = "Please enter your UPI ID.";
      } else if (
        !/^[\w.-]+@[\w.-]+$/.test(formData.upiId.trim())
      ) {
        newErrors.upiId = "Please enter a valid UPI ID.";
      }
    }

    // =========================
    // CARD VALIDATION
    // =========================
    if (formData.payment === "Card") {
      if (!formData.cardName.trim()) {
        newErrors.cardName =
          "Please enter cardholder name.";
      }

      const cleanCardNumber = formData.cardNumber.replace(
        /\s/g,
        ""
      );

      if (!cleanCardNumber) {
        newErrors.cardNumber =
          "Please enter card number.";
      } else if (!/^\d{16}$/.test(cleanCardNumber)) {
        newErrors.cardNumber =
          "Card number must contain 16 digits.";
      }

      if (!formData.expiry.trim()) {
        newErrors.expiry =
          "Please enter expiry date.";
      } else if (
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(
          formData.expiry.trim()
        )
      ) {
        newErrors.expiry =
          "Expiry must be in MM/YY format.";
      }

      if (!formData.cvv.trim()) {
        newErrors.cvv = "Please enter CVV.";
      } else if (!/^\d{3}$/.test(formData.cvv.trim())) {
        newErrors.cvv =
          "CVV must contain 3 digits.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // TOTAL PRICE
  // =========================
  const totalPrice = cart.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;

    return total + price * quantity;
  }, 0);

  // =========================
  // PLACE ORDER
  // =========================
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Do not place another order while popup is showing
    if (showPopup) {
      return;
    }

    // Check cart
    if (!Array.isArray(cart) || cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/cart");
      return;
    }

    // Validate form
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    // =========================
    // CREATE NEW ORDER
    // =========================
    const newOrder = {
      id: Date.now(),

      customer: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        payment: formData.payment,

        // Save payment details for demo
        upiId:
          formData.payment === "UPI"
            ? formData.upiId.trim()
            : "",

        cardName:
          formData.payment === "Card"
            ? formData.cardName.trim()
            : "",

        cardNumber:
          formData.payment === "Card"
            ? formData.cardNumber.trim()
            : "",

        expiry:
          formData.payment === "Card"
            ? formData.expiry.trim()
            : "",
      },

      items: cart.map((item) => ({
        ...item,
        quantity: Number(item.quantity) || 1,
      })),

      total: totalPrice,

      date: new Date().toLocaleDateString("en-IN"),

      status: "Order Placed",
    };

    // =========================
    // GET OLD ORDERS
    // =========================
    let oldOrders = [];

    try {
      const savedOrders =
        localStorage.getItem("herstyleOrders");

      if (savedOrders) {
        const parsedOrders =
          JSON.parse(savedOrders);

        if (Array.isArray(parsedOrders)) {
          oldOrders = parsedOrders;
        }
      }
    } catch (error) {
      console.error(
        "Error reading orders:",
        error
      );

      oldOrders = [];
    }

    // =========================
    // ADD NEW ORDER
    // =========================
    const updatedOrders = [
      ...oldOrders,
      newOrder,
    ];

    // =========================
    // SAVE ORDER
    // =========================
    try {
      localStorage.setItem(
        "herstyleOrders",
        JSON.stringify(updatedOrders)
      );

      // Clear cart
      localStorage.removeItem("herstyleCart");

      // Update state
      setCart([]);

      // =========================
      // SHOW SUCCESS MESSAGE
      // =========================
      setShowPopup(true);

      // =========================
      // REDIRECT TO ORDERS
      // =========================
      setTimeout(() => {
        navigate("/orders");
      }, 2000);

    } catch (error) {
      console.error(
        "Error saving order:",
        error
      );

      alert(
        "Something went wrong while placing your order."
      );
    }
  };

  return (
    <div className="checkout-page">

      {/* =========================
          SUCCESS POPUP
      ========================= */}
      {showPopup && (
        <div className="success-overlay">

          <div className="success-popup">

            <div className="success-icon">
              ✓
            </div>

            <h2>
              Order Placed Successfully!
            </h2>

            <p>
              Thank you for shopping with HERSTYLE.
            </p>

            <span>
              Redirecting to your orders...
            </span>

          </div>

        </div>
      )}


      {/* =========================
          HEADING
      ========================= */}
      <div className="checkout-heading">

        <p>
          HERSTYLE
        </p>

        <h1>
          Checkout
        </h1>

        <span>
          Complete your order securely.
        </span>

      </div>


      {/* =========================
          CHECKOUT CONTAINER
      ========================= */}
      <div className="checkout-container">

        {/* =========================
            CHECKOUT FORM
        ========================= */}
        <form
          className="checkout-form"
          onSubmit={handlePlaceOrder}
        >

          <h2>
            Delivery Information
          </h2>


          {/* NAME */}
          <div className="form-group">

            <label>
              Full Name *
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />

            {errors.name && (
              <small className="error-message">
                {errors.name}
              </small>
            )}

          </div>


          {/* EMAIL */}
          <div className="form-group">

            <label>
              Email Address *
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <small className="error-message">
                {errors.email}
              </small>
            )}

          </div>


          {/* PHONE */}
          <div className="form-group">

            <label>
              Phone Number *
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter 10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              maxLength="10"
            />

            {errors.phone && (
              <small className="error-message">
                {errors.phone}
              </small>
            )}

          </div>


          {/* ADDRESS */}
          <div className="form-group">

            <label>
              Address *
            </label>

            <textarea
              name="address"
              placeholder="House No., Street, Area"
              value={formData.address}
              onChange={handleChange}
              rows="4"
            />

            {errors.address && (
              <small className="error-message">
                {errors.address}
              </small>
            )}

          </div>


          {/* CITY + STATE */}
          <div className="form-row">

            <div className="form-group">

              <label>
                City *
              </label>

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />

              {errors.city && (
                <small className="error-message">
                  {errors.city}
                </small>
              )}

            </div>


            <div className="form-group">

              <label>
                State *
              </label>

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />

              {errors.state && (
                <small className="error-message">
                  {errors.state}
                </small>
              )}

            </div>

          </div>


          {/* PIN CODE */}
          <div className="form-group">

            <label>
              PIN Code *
            </label>

            <input
              type="text"
              name="pincode"
              placeholder="Enter 6 digit PIN code"
              value={formData.pincode}
              onChange={handleChange}
              maxLength="6"
            />

            {errors.pincode && (
              <small className="error-message">
                {errors.pincode}
              </small>
            )}

          </div>


          {/* =========================
              PAYMENT
          ========================= */}

          <h2 className="payment-title">
            Payment Method
          </h2>


          <div className="payment-options">

            {/* COD */}
            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={
                  formData.payment ===
                  "Cash on Delivery"
                }
                onChange={handleChange}
              />

              <div>

                <strong>
                  Cash on Delivery
                </strong>

                <span>
                  Pay when your order arrives
                </span>

              </div>

            </label>


            {/* UPI */}
            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={
                  formData.payment === "UPI"
                }
                onChange={handleChange}
              />

              <div>

                <strong>
                  UPI
                </strong>

                <span>
                  Pay using Google Pay,
                  PhonePe or Paytm
                </span>

              </div>

            </label>


            {/* CARD */}
            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="Card"
                checked={
                  formData.payment === "Card"
                }
                onChange={handleChange}
              />

              <div>

                <strong>
                  Credit / Debit Card
                </strong>

                <span>
                  Secure card payment
                </span>

              </div>

            </label>

          </div>


          {/* =========================
              UPI PAYMENT DETAILS
          ========================= */}

          {formData.payment === "UPI" && (

            <div className="payment-details-box">

              <h3>
                Pay using UPI
              </h3>

              <div className="upi-payment-container">

                {/* UPI ID */}

                <div className="upi-input-section">

                  <label>
                    Enter UPI ID
                  </label>

                  <input
                    type="text"
                    name="upiId"
                    placeholder="example@upi"
                    value={formData.upiId}
                    onChange={handleChange}
                  />

                  {errors.upiId && (
                    <small className="error-message">
                      {errors.upiId}
                    </small>
                  )}

                  <small>
                    Example: yourname@oksbi
                  </small>

                  <button
                    type="button"
                    className="verify-upi-button"
                    onClick={() => {

                      if (!formData.upiId.trim()) {

                        alert(
                          "Please enter your UPI ID."
                        );

                        return;
                      }

                      alert(
                        "UPI ID entered successfully."
                      );

                    }}
                  >
                    Verify UPI ID
                  </button>

                </div>


                {/* QR CODE */}

                <div className="upi-qr-section">

                  <p>
                    OR Scan QR Code
                  </p>

                  <div className="qr-code-box">

                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=HERSTYLE-DEMO-PAYMENT"
                      alt="UPI QR Code"
                    />

                  </div>

                  <span>
                    Scan using Google Pay,
                    PhonePe or Paytm
                  </span>

                </div>

              </div>

            </div>

          )}


          {/* =========================
              CREDIT / DEBIT CARD
          ========================= */}

          {formData.payment === "Card" && (

            <div className="payment-details-box">

              <h3>
                Card Details
              </h3>


              {/* CARD HOLDER */}

              <div className="form-group">

                <label>
                  Cardholder Name
                </label>

                <input
                  type="text"
                  name="cardName"
                  placeholder="Name on card"
                  value={formData.cardName}
                  onChange={handleChange}
                />

                {errors.cardName && (
                  <small className="error-message">
                    {errors.cardName}
                  </small>
                )}

              </div>


              {/* CARD NUMBER */}

              <div className="form-group">

                <label>
                  Card Number
                </label>

                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  maxLength="19"
                  onChange={handleChange}
                />

                {errors.cardNumber && (
                  <small className="error-message">
                    {errors.cardNumber}
                  </small>
                )}

              </div>


              {/* EXPIRY + CVV */}

              <div className="card-payment-row">

                <div className="form-group">

                  <label>
                    Expiry Date
                  </label>

                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    maxLength="5"
                    onChange={handleChange}
                  />

                  {errors.expiry && (
                    <small className="error-message">
                      {errors.expiry}
                    </small>
                  )}

                </div>


                <div className="form-group">

                  <label>
                    CVV
                  </label>

                  <input
                    type="password"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    maxLength="3"
                    onChange={handleChange}
                  />

                  {errors.cvv && (
                    <small className="error-message">
                      {errors.cvv}
                    </small>
                  )}

                </div>

              </div>


              <div className="card-secure-message">
                🔒 Your card information is secure.
              </div>

            </div>

          )}


          {/* =========================
              PLACE ORDER
          ========================= */}

          <button
            type="submit"
            className="place-order-button"
            disabled={showPopup}
          >
            {showPopup
              ? "ORDER PLACED ✓"
              : "PLACE ORDER"}
          </button>


          {/* =========================
              BACK TO CART
          ========================= */}

          <button
            type="button"
            className="back-cart-button"
            onClick={() => navigate("/cart")}
            disabled={showPopup}
          >
            ← BACK TO CART
          </button>

        </form>


        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <div className="checkout-summary">

          <h2>
            Your Order
          </h2>

          <div className="checkout-products">

            {cart.map((item, index) => (

              <div
                className="checkout-product"
                key={
                  item.id ||
                  `product-${index}`
                }
              >

                <img
                  src={item.image}
                  alt={
                    item.name ||
                    "Product"
                  }
                />

                <div className="checkout-product-info">

                  <h3>
                    {item.name ||
                      "Product"}
                  </h3>

                  <p>
                    Quantity:{" "}
                    {item.quantity || 1}
                  </p>

                  <span>
                    ₹
                    {(
                      Number(item.price || 0) *
                      Number(item.quantity || 1)
                    ).toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

            ))}

          </div>


          {/* SUMMARY */}

          <div className="checkout-summary-details">

            <div>

              <span>
                Subtotal
              </span>

              <span>
                ₹
                {totalPrice.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>


            <div>

              <span>
                Shipping
              </span>

              <span>
                FREE
              </span>

            </div>


            <hr />


            <div className="checkout-total">

              <strong>
                Total
              </strong>

              <strong>
                ₹
                {totalPrice.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;