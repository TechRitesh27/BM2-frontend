import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";

export default function ServiceRequestTable({ services }) {
  return (
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
        {services.map((s) => (
          <TableRow key={s.id}>
            <TableCell>{s.id}</TableCell>
            <TableCell>{s.serviceType?.name}</TableCell>
            <TableCell>{s.status}</TableCell>
            <TableCell>
              {new Date(s.requestedAt).toLocaleString()}
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
  );
}