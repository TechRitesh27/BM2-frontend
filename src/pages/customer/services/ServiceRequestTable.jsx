import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper
} from "@mui/material";

export default function ServiceRequestTable({ services }) {

  const data = Array.isArray(services) ? services : [];

  if (data.length === 0) {
    return (
      <Typography color="text.secondary">
        No service requests yet.
      </Typography>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Requested At</TableCell>
            <TableCell>Completed</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.id}</TableCell>

              <TableCell>
                {s.serviceType?.name || "-"}
              </TableCell>

              <TableCell>
                {s.status || "-"}
              </TableCell>

              <TableCell>
                {s.requestedAt
                  ? new Date(s.requestedAt).toLocaleString()
                  : "-"}
              </TableCell>

              <TableCell>
                {s.completedAt
                  ? new Date(s.completedAt).toLocaleString()
                  : "-"}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </Paper>
  );
}