import { useEffect, useState } from "react";
import api from "../../../api/axios";

import {
  Grid,
  Box,
  CircularProgress,
  Typography
} from "@mui/material";

import RoomCard from "./components/RoomCard";

export default function RoomCleaningPage() {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {

    try {

      const res = await api.get("/api/staff/housekeeping/rooms");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.content || [];

      setRooms(data);

    } catch (err) {

      console.error("Failed to fetch rooms", err);
      setRooms([]);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchRooms();
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
        Room Cleaning Management
      </Typography>

      <Grid container spacing={3}>

        {rooms.map((room) => (

          <Grid item xs={12} md={3} key={room.id}>

            <RoomCard
              room={room}
              refresh={fetchRooms}
            />

          </Grid>

        ))}

      </Grid>

    </Box>

  );

}