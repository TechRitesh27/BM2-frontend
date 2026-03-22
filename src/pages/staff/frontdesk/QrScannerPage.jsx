import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import api from "../../../api/axios";

import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert
} from "@mui/material";

export default function QrScannerPage() {

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState("");

  // 🔊 Beep sound
  const beep = () => {
    const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
    audio.play();
  };

  // ===============================
  // HANDLE SCAN
  // ===============================
  const handleScan = async (result) => {

    if (!result || scanned) return;

    const text = result[0]?.rawValue;
    if (!text) return;

    setScanned(true);
    setLoading(true);
    setError("");

    beep();

    try {

      // ✅ Extract token (NEW FORMAT)
      const token = text.split("BOOKING:")[1];

      if (!token) {
        throw new Error("Invalid format");
      }

      // ✅ Correct API (STAFF)
      const res = await api.get(
        `/api/staff/frontdesk/scan?token=${token}`
      );

      setBooking(res.data);

    } catch (err) {

      console.error(err);
      setError("Invalid QR Code");

      setTimeout(() => {
        setScanned(false);
        setError("");
      }, 2000);

    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // CHECK-IN
  // ===============================
  const handleCheckIn = async () => {
    await api.put(`/api/staff/frontdesk/bookings/${booking.id}/check-in`);
    alert("Checked-in successfully");
    resetScanner();
  };

  // ===============================
  // CHECK-OUT
  // ===============================
  const handleCheckOut = async () => {
    await api.put(`/api/staff/frontdesk/bookings/${booking.id}/check-out`);
    alert("Checked-out successfully");
    resetScanner();
  };

  // ===============================
  // RESET
  // ===============================
  const resetScanner = () => {
    setBooking(null);
    setScanned(false);
    setError("");
  };

  return (
    <Box>

      <Typography variant="h4" mb={2}>
        Front Desk QR Scanner
      </Typography>

      {/* SCANNER */}
      {!scanned && (
        <Scanner
          onScan={handleScan}
          onError={(err) => console.error(err)}
        />
      )}

      {/* LOADING */}
      {loading && (
        <Box mt={2}>
          <CircularProgress />
          <Typography>Processing QR...</Typography>
        </Box>
      )}

      {/* ERROR */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* BOOKING DETAILS */}
      {booking && (
        <Paper sx={{ p: 3, mt: 2 }}>

          <Typography variant="h6" gutterBottom>
            Booking Details
          </Typography>

          <Typography>
            Booking ID: {booking.id}
          </Typography>

          <Typography>
            Guest: {booking.user?.email}
          </Typography>

          <Typography>
            Room: {booking.room?.roomNumber} ({booking.room?.roomType?.name})
          </Typography>

          <Typography>
            Status: {booking.status}
          </Typography>

          <Typography>
            Amount: ₹{booking.totalAmount}
          </Typography>

          <Box mt={3} display="flex" gap={2}>

            {booking.status === "BOOKED" && (
              <Button variant="contained" onClick={handleCheckIn}>
                Check-In
              </Button>
            )}

            {booking.status === "CHECKED_IN" && (
              <Button
                variant="contained"
                color="error"
                onClick={handleCheckOut}
              >
                Check-Out
              </Button>
            )}

            <Button variant="outlined" onClick={resetScanner}>
              Scan Again
            </Button>

          </Box>

        </Paper>
      )}

    </Box>
  );
}