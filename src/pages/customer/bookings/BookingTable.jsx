import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

export default function BookingTable({ bookings }) {

  const rows = bookings || [];

  return (
    <Paper sx={{ p: 2 }}>

      <Table>

        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Room</TableCell>
            <TableCell>Check In</TableCell>
            <TableCell>Check Out</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {rows.map((b) => (

            <TableRow key={b.id}>

              <TableCell>{b.id}</TableCell>

              <TableCell>
                {b.room?.roomNumber}
              </TableCell>

              <TableCell>
                {b.checkIn}
              </TableCell>

              <TableCell>
                {b.checkOut}
              </TableCell>

              <TableCell>
                {b.status}
              </TableCell>

              <TableCell>
                ₹{b.totalAmount}
              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </Paper>
  );
}