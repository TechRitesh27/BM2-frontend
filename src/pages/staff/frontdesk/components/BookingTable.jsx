import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Stack
} from "@mui/material";

import api from "../../../../api/axios";

export default function BookingTable({ bookings = [], refresh }) {

  const handleCheckIn = async (id) => {

    await api.put(`/api/staff/frontdesk/bookings/${id}/checkin`);

    refresh();

  };

  const handleCheckOut = async (id) => {

    await api.put(`/api/staff/frontdesk/bookings/${id}/checkout`);

    refresh();

  };

  return (

    <Table>

      <TableHead>

        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Guest</TableCell>
          <TableCell>Room</TableCell>
          <TableCell>Check-In</TableCell>
          <TableCell>Check-Out</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>

      </TableHead>

      <TableBody>

        {bookings.map((b) => (

          <TableRow key={b.id}>

            <TableCell>{b.id}</TableCell>

            <TableCell>{b.user?.name}</TableCell>

            <TableCell>{b.room?.roomNumber}</TableCell>

            <TableCell>{b.checkIn}</TableCell>

            <TableCell>{b.checkOut}</TableCell>

            <TableCell>{b.status}</TableCell>

            <TableCell>

              <Stack direction="row" spacing={1}>

                {b.status === "BOOKED" && (
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleCheckIn(b.id)}
                  >
                    Check-In
                  </Button>
                )}

                {b.status === "CHECKED_IN" && (
                  <Button
                    size="small"
                    color="success"
                    variant="contained"
                    onClick={() => handleCheckOut(b.id)}
                  >
                    Check-Out
                  </Button>
                )}

              </Stack>

            </TableCell>

          </TableRow>

        ))}

      </TableBody>

    </Table>

  );
}