import { useEffect, useState } from "react";
import api from "../../../api/axios";

import {
  Typography,
  Box,
  CircularProgress
} from "@mui/material";

import BookingTable from "./components/BookingTable";

export default function BookingsPage() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {

    try {

      const res = await api.get("/api/staff/frontdesk/bookings");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.content || [];

      setBookings(data);

    } catch (err) {

      console.error("Failed to load bookings", err);
      setBookings([]);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>

      <Typography variant="h5" mb={3}>
        Booking Management
      </Typography>

      <BookingTable
        bookings={bookings}
        refresh={fetchBookings}
      />

    </Box>
  );
}