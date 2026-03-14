import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack
} from "@mui/material";

import api from "../../../api/axios";

export default function RoomCard({ room, checkIn, checkOut }) {

  const bookRoom = async () => {

    try {

      await api.post(
        "/api/guest/rooms/book",
        {
          roomId: room.id,
          checkIn,
          checkOut
        }
      );

      alert("Room booked successfully!");

    } catch (err) {

      console.error("Booking failed", err);

      alert("Booking failed");

    }

  };

  return (

    <Card>

      <CardContent>

        <Typography variant="h6">
          Room {room.roomNumber}
        </Typography>

        <Typography>
          Type: {room.roomType?.name}
        </Typography>

        <Typography>
          Price: ₹{room.roomType?.basePrice}
        </Typography>

        <Typography>
          Floor: {room.floor}
        </Typography>

        <Stack mt={2}>

          <Button
            variant="contained"
            onClick={bookRoom}
          >
            Book Room
          </Button>

        </Stack>

      </CardContent>

    </Card>

  );
}