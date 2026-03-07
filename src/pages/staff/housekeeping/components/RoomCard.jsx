import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack
} from "@mui/material";

import api from "../../../../api/axios";

export default function RoomCard({ room, refresh }) {

  const markCleaning = async () => {

    await api.put(`/api/staff/housekeeping/rooms/${room.id}/cleaning`);

    refresh();

  };

  const markCleaned = async () => {

    await api.put(`/api/staff/housekeeping/rooms/${room.id}/cleaned`);

    refresh();

  };

  return (

    <Card>

      <CardContent>

        <Typography variant="h6">
          Room {room.roomNumber}
        </Typography>

        <Typography>
          Floor: {room.floor}
        </Typography>

        <Typography>
          Status: {room.status}
        </Typography>

        <Stack spacing={1} mt={2}>

          {room.status === "DIRTY" && (
            <Button
              variant="contained"
              onClick={markCleaning}
            >
              Start Cleaning
            </Button>
          )}

          {room.status === "CLEANING" && (
            <Button
              variant="contained"
              color="success"
              onClick={markCleaned}
            >
              Mark Cleaned
            </Button>
          )}

        </Stack>

      </CardContent>

    </Card>

  );
}