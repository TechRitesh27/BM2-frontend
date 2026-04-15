import React from "react";
import axios from "axios";

const PaymentPage = () => {

  const handlePayment = async () => {
    try {
      // 1. Create order from backend
      const response = await axios.post("http://localhost:8081/api/payment/create-order", {
        amount: amount   // in paise (₹50)
      });

    console.log("Backend Response:", response.data);

    const order = response.data;

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }
      // 2. Razorpay options
      const options = {
        key: "rzp_test_SYHr69TaJWpviq", // from Razorpay dashboard
        amount: order.amount,
        currency: "INR",
        name: "Hotel Booking",
        description: "Room Payment",
        order_id: order.orderId,

        handler: function (response) {
          alert("Payment Successful ✅");
          console.log(response);
        },

        prefill: {
          name: "Pranjal",
          email: "user@gmail.com",
          contact: "9999999999"
        },

        theme: {
          color: "#caa169"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment Failed ❌");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Complete Your Booking</h2>
      <button style={styles.button} onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px"
  },
  button: {
    padding: "12px 25px",
    fontSize: "18px",
    backgroundColor: "#caa169",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default PaymentPage;