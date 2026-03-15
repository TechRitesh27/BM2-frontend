import { useEffect, useState } from "react";
import api from "../../../api/axios";

import { Box, Typography, CircularProgress, Alert } from "@mui/material";

import BookingTable from "./BookingTable";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await api.get("/api/guest/account/bookings");

      setBookings(res.data || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        My Bookings
      </Typography>

      <BookingTable bookings={bookings} />
    </Box>
  );
}
