import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import axios from "axios";

export default function ServiceTable({ services, showAssign }) {
  const handleAssign = (id) => {
    axios.put(
      `/api/staff/services/${id}/assign`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Service</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {services.map((s) => (
          <TableRow key={s.id}>
            <TableCell>{s.id}</TableCell>
            <TableCell>{s.serviceType.name}</TableCell>
            <TableCell>{s.status}</TableCell>
            <TableCell>
              {showAssign && (
                <Button onClick={() => handleAssign(s.id)}>Assign</Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}