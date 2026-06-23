import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Chip, Typography
} from "@mui/material";

const statusColor = {
  PENDING:   "warning",
  ASSIGNED:  "info",
  COMPLETED: "success",
  CANCELLED: "default",
  REJECTED:  "error",
};

export default function ServiceRequestTable({ services }) {
  const rows = services || [];

  return (
    <Paper sx={{ p: 2 }}>
      {rows.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" py={3}>
          No service requests yet.
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Requested At</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>Rejection Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.serviceType?.name}</TableCell>
                <TableCell>₹{s.serviceType?.price?.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={s.status}
                    color={statusColor[s.status] || "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{s.assignedStaff?.name || "—"}</TableCell>
                <TableCell>
                  {s.requestedAt ? new Date(s.requestedAt).toLocaleString() : "—"}
                </TableCell>
                <TableCell>
                  {s.completedAt ? new Date(s.completedAt).toLocaleString() : "—"}
                </TableCell>
                <TableCell>
                  {s.rejectionReason || "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}
