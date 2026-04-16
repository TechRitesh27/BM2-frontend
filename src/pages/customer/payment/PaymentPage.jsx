import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, CircularProgress, Alert } from "@mui/material";
import api from "../../../api/axios";

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;

// Dynamically load Razorpay SDK
const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { bookingId, amount } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookingId || !amount) {
      navigate("/customer/bill");
    }
  }, [bookingId, amount, navigate]);

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const sdkLoaded = await loadRazorpay();
      if (!sdkLoaded) {
        setError("Failed to load payment gateway. Please try again.");
        return;
      }

      const res = await api.post("/api/payments/create-order", {
        bookingId,
        amount
      });

      const order = res.data;

      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "BM Group of Hotels",
        description: "Room Booking Payment",
        order_id: order.orderId,

        handler: async (response) => {
          try {
            await api.post("/api/payments/verify", {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            });
            navigate("/customer/payment-success");
          } catch {
            setError("Payment verification failed. Contact support.");
          }
        },

        prefill: {
          name: "",
          email: "",
          contact: ""
        },

        theme: { color: "#caa169" }
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        setError("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || "Payment initiation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h5" mb={2}>
        Complete Your Payment
      </Typography>

      <Typography variant="h6" mb={3}>
        Amount: ₹{amount}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2, maxWidth: 400, mx: "auto" }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        size="large"
        onClick={handlePayment}
        disabled={loading}
        sx={{ backgroundColor: "#caa169", "&:hover": { backgroundColor: "#b8955a" } }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Pay Now"}
      </Button>
    </Box>
  );
}
