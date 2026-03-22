import { useState } from "react";
import api from "../../../api/axios";

import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Stack
} from "@mui/material";

import RoomCard from "../components/RoomCard";

export default function SearchRooms() {

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);

  const searchRooms = async () => {

    if (!checkIn || !checkOut) {
      alert("Please select dates");
      return;
    }

    try {

      const res = await api.post(
        "/api/guest/rooms/available",
        {
          checkIn,
          checkOut
        }
      );

      setRoomTypes(res.data);

    } catch (err) {
      console.error("Failed to search rooms", err);
    }

  };

  return (

    <Box>

      <Typography variant="h4" mb={3}>
        Search Available Rooms
      </Typography>

      <Stack direction="row" spacing={2} mb={3}>

        <TextField
          label="Check-In"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />

        <TextField
          label="Check-Out"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />

        <Button variant="contained" onClick={searchRooms}>
          Search
        </Button>

      </Stack>

      <Grid container spacing={3}>

        {roomTypes.map((type) => (

          <Grid item xs={12} md={3} key={type.roomTypeId}>

            <RoomCard
              roomType={type}
              checkIn={checkIn}
              checkOut={checkOut}
            />

          </Grid>

        ))}

      </Grid>

    </Box>
  );
}