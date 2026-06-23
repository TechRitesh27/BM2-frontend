import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { Grid, Box, CircularProgress, Typography, Alert } from "@mui/material";
import RoomCard from "./components/RoomCard";

export default function RoomCleaningPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/staff/housekeeping/rooms");
      setRooms(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load rooms");
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  if (loading) return <Box textAlign="center" mt={5}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h5" mb={3}>Room Cleaning Management</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {rooms.length === 0 && !error && (
        <Alert severity="success">All rooms are clean! No pending tasks.</Alert>
      )}

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={room.id}>
            <RoomCard room={room} refresh={fetchRooms} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
