
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";

function Order() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // =========================
  // LOAD ORDERS
  // =========================
  useEffect(() => {
    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("herstyleOrders")
      );

      if (Array.isArray(savedOrders)) {
        // Latest order first
        setOrders([...savedOrders].reverse());
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      setOrders([]);
    }
  }, []);

  // =========================
  // FORMAT PRICE
  // =========================
  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN");
  };

  // =========================
  // TOTAL ITEMS
  // =========================
  const getTotalItems = (items = []) => {
    return items.reduce(
      (total, item) => total + Number(item.quantity || 1),
      0
    );
  };

  // =========================
  // NAVIGATION
  // =========================
  const handleContinueShopping = () => {
    navigate("/shop");
  };

  const handleHome = () => {
    navigate("/");
  };

  // =========================
  // VIEW ORDER DETAILS
  // =========================
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  // =========================
  // CLOSE MODAL
  // =========================
  const closeDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="orders-page">

      {/* =========================
          HEADER
      ========================= */}
      <header className="orders-header">

        <div
          className="orders-logo"
          onClick={handleHome}
        >
          HERSTYLE
        </div>

        <nav className="orders-nav">
          <button
            type="button"
            onClick={handleHome}
          >
            Home
          </button>

          <button
            type="button"
            onClick={handleContinueShopping}
          >
            Shop
          </button>
        </nav>

      </header>


      {/* =========================
          PAGE HEADING
      ========================= */}
      <section className="orders-hero">

        <p>HERSTYLE</p>

        <h1>My Orders</h1>

        <span>
          Track and manage all your HerStyle orders
        </span>

      </section>


      {/* =========================
          ORDERS
      ========================= */}
      <main className="orders-container">

        {orders.length === 0 ? (

          /* =========================
             NO ORDERS
          ========================= */
          <div className="empty-orders">

            <div className="empty-icon">
              🛍
            </div>

            <h2>No Orders Yet</h2>

            <p>
              You haven't placed any orders yet.
              Start shopping and your orders will
              appear here.
            </p>

            <button
              type="button"
              className="shop-now-button"
              onClick={handleContinueShopping}
            >
              START SHOPPING
            </button>

          </div>

        ) : (

          /* =========================
             ORDERS AVAILABLE
          ========================= */
          <>
            <div className="orders-top-bar">

              <div>
                <h2>Your Orders</h2>

                <p>
                  {orders.length}{" "}
                  {orders.length === 1
                    ? "order"
                    : "orders"}
                </p>
              </div>

              <button
                type="button"
                className="continue-shopping-button"
                onClick={handleContinueShopping}
              >
                + CONTINUE SHOPPING
              </button>

            </div>


            {/* =========================
                ORDER LIST
            ========================= */}
            <div className="orders-list">

              {orders.map((order) => {

                const items = Array.isArray(order.items)
                  ? order.items
                  : [];

                return (
                  <div
                    className="order-card"
                    key={order.id}
                  >

                    {/* =========================
                        ORDER HEADER
                    ========================= */}
                    <div className="order-card-header">

                      <div className="order-info">

                        <div>
                          <span>ORDER ID</span>

                          <strong>
                            #
                            {String(
                              order.id || Date.now()
                            ).slice(-8)}
                          </strong>
                        </div>

                        <div>
                          <span>ORDER DATE</span>

                          <strong>
                            {order.date || "N/A"}
                          </strong>
                        </div>

                        <div>
                          <span>ITEMS</span>

                          <strong>
                            {getTotalItems(items)}
                          </strong>
                        </div>

                      </div>


                      <div className="order-status">

                        <span className="status-dot"></span>

                        {order.status ||
                          "Order Placed"}

                      </div>

                    </div>


                    {/* =========================
                        PRODUCTS
                    ========================= */}
                    <div className="order-products">

                      {items.length > 0 ? (

                        items.map((item, index) => (

                          <div
                            className="order-product"
                            key={
                              item.id ||
                              `${order.id}-${index}`
                            }
                          >

                            <img
                              src={item.image}
                              alt={
                                item.name ||
                                "Product"
                              }
                            />

                            <div className="order-product-info">

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
                                {formatPrice(
                                  Number(
                                    item.price || 0
                                  ) *
                                    Number(
                                      item.quantity || 1
                                    )
                                )}
                              </span>

                            </div>

                          </div>

                        ))

                      ) : (

                        <p>
                          No product information
                          available.
                        </p>

                      )}

                    </div>


                    {/* =========================
                        ORDER FOOTER
                    ========================= */}
                    <div className="order-card-footer">

                      <div className="payment-info">

                        <span>PAYMENT</span>

                        <strong>
                          {order.customer?.payment ||
                            "Cash on Delivery"}
                        </strong>

                      </div>


                      <div className="order-total">

                        <span>
                          TOTAL AMOUNT
                        </span>

                        <strong>
                          ₹
                          {formatPrice(
                            order.total
                          )}
                        </strong>

                      </div>


                      <button
                        type="button"
                        className="details-button"
                        onClick={() =>
                          handleViewDetails(order)
                        }
                      >
                        VIEW DETAILS
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>
          </>
        )}

      </main>


      {/* =========================
          ORDER DETAILS POPUP
      ========================= */}
      {selectedOrder && (

        <div
          className="order-modal-overlay"
          onClick={closeDetails}
        >

          <div
            className="order-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* CLOSE BUTTON */}
            <button
              type="button"
              className="close-modal"
              onClick={closeDetails}
              aria-label="Close"
            >
              ×
            </button>


            {/* =========================
                MODAL HEADING
            ========================= */}
            <div className="modal-heading">

              <div className="modal-check">
                ✓
              </div>

              <h2>Order Details</h2>

              <p>
                Order #
                {String(
                  selectedOrder.id || ""
                ).slice(-8)}
              </p>

            </div>


            {/* =========================
                DELIVERY INFORMATION
            ========================= */}
            <div className="details-section">

              <h3>
                Delivery Information
              </h3>

              <div className="customer-details">

                <div>
                  <span>Name</span>

                  <strong>
                    {selectedOrder.customer?.name ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>Email</span>

                  <strong>
                    {selectedOrder.customer?.email ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>Phone</span>

                  <strong>
                    {selectedOrder.customer?.phone ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>Address</span>

                  <strong>
                    {selectedOrder.customer?.address ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>City</span>

                  <strong>
                    {selectedOrder.customer?.city ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>State</span>

                  <strong>
                    {selectedOrder.customer?.state ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>PIN Code</span>

                  <strong>
                    {selectedOrder.customer?.pincode ||
                      "N/A"}
                  </strong>
                </div>

                <div>
                  <span>Payment</span>

                  <strong>
                    {selectedOrder.customer?.payment ||
                      "Cash on Delivery"}
                  </strong>
                </div>

              </div>

            </div>


            {/* =========================
                ORDERED PRODUCTS
            ========================= */}
            <div className="details-section">

              <h3>
                Ordered Items
              </h3>

              <div className="modal-products">

                {Array.isArray(
                  selectedOrder.items
                ) &&
                  selectedOrder.items.map(
                    (item, index) => (

                      <div
                        className="modal-product"
                        key={
                          item.id ||
                          `${selectedOrder.id}-${index}`
                        }
                      >

                        <img
                          src={item.image}
                          alt={
                            item.name ||
                            "Product"
                          }
                        />

                        <div>

                          <h4>
                            {item.name ||
                              "Product"}
                          </h4>

                          <p>
                            Qty:{" "}
                            {item.quantity || 1}
                          </p>

                        </div>

                        <strong>
                          ₹
                          {formatPrice(
                            Number(
                              item.price || 0
                            ) *
                              Number(
                                item.quantity || 1
                              )
                          )}
                        </strong>

                      </div>

                    )
                  )}

              </div>

            </div>


            {/* =========================
                TOTAL
            ========================= */}
            <div className="modal-total">

              <span>
                Total Amount
              </span>

              <strong>
                ₹
                {formatPrice(
                  selectedOrder.total
                )}
              </strong>

            </div>


            {/* =========================
                SHOPPING BUTTON
            ========================= */}
            <button
              type="button"
              className="modal-shopping-button"
              onClick={handleContinueShopping}
            >
              CONTINUE SHOPPING
            </button>

          </div>

        </div>

      )}


      {/* =========================
          FOOTER
      ========================= */}
      <footer className="orders-footer">

        <p>
          © 2026 HERSTYLE. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Order;
