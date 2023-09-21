import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/OrderModal.module.css";

const phoneNumConverter = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/\D/g, "");

  const formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(
    3,
    6
  )}-${cleaned.slice(6)}`;

  return formatted;
};

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderError, setOrderError] = useState("");
  const navigate = useNavigate();

  const placeOrder = async () => {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name.trim(),
        // Use the formatted phone number
        phone: phoneNumConverter(phone),
        address: address.trim(),
        items: order
      })
    });
    const data = await response.json();

    return data;
  };

  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
                value={name}
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(phoneNumConverter(e.target.value));
                }}
                value={phone}
                type="text"
                id="phone"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                value={address}
                type="text"
                id="address"
              />
            </label>
          </div>
        </form>

        {orderError && <p className={styles.orderError}>{orderError}</p>}

        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={async () => {
              if (!name || !phone || !address) {
                setOrderError("Please fill out all fields");

                setTimeout(() => {
                  setOrderError("");
                }, 3000);
                return;
              }
              const data = await placeOrder();
              navigate(`/order-confirmation/${data.id}`);
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
