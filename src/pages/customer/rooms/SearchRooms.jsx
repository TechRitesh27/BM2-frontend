import { useState } from "react";
import api from "../../../api/axios";
import {
  Box, Typography, TextField, Button, Grid,
  Stack, Alert, CircularProgress
} from "@mui/material";
import RoomCard from "../components/RoomCard";

export default function SearchRooms() {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckInChange = (val) => {
    setCheckIn(val);
    // Auto-push checkout if it's before the new check-in
    if (checkOut && checkOut <= val) {
      const next = new Date(val);
      next.setDate(next.getDate() + 1);
      setCheckOut(next.toISOString().split("T")[0]);
    }
  };

  const searchRooms = async () => {
    setError("");
    if (!checkIn || !checkOut) {
      setError("Please select both check-in and check-out dates");
      return;
    }
    if (checkOut <= checkIn) {
      setError("Check-out date must be after check-in date");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/guest/rooms/available", { checkIn, checkOut });
      setRoomTypes(res.data || []);
      setSearched(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to search rooms. Please try again.");
      setRoomTypes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" mb={3}>Search Available Rooms</Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3} alignItems="flex-end">
        <TextField
          label="Check-In Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: today }}
          value={checkIn}
          onChange={(e) => handleCheckInChange(e.target.value)}
          sx={{ minWidth: 180 }}
        />
        <TextField
          label="Check-Out Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: checkIn || tomorrow }}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          sx={{ minWidth: 180 }}
        />
        <Button
          variant="contained"
          onClick={searchRooms}
          disabled={loading}
          size="large"
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : "Search"}
        </Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {searched && roomTypes.length === 0 && !error && (
        <Alert severity="info">
          No rooms available for the selected dates. Try different dates.
        </Alert>
      )}

      <Grid container spacing={3}>
        {roomTypes.map((type) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={type.roomTypeId}>
            <RoomCard roomType={type} checkIn={checkIn} checkOut={checkOut} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
