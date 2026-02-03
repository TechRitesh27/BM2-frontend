import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, Typography, Paper
} from "@mui/material";
import CreateStaffDialog from "./CreateStaffDialog";

const StaffTable = () => {
  const [staff, setStaff] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchStaff = async () => {
    const res = await api.get("/api/admin/users/staff");
    setStaff(res.data);
  };

  const toggleStatus = async (id, active) => {
    const url = active
      ? `/api/admin/users/${id}/deactivate`
      : `/api/admin/users/${id}/activate`;
    await api.put(url);
    fetchStaff();
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Staff Management</Typography>
      <Button variant="contained" sx={{ my: 2 }} onClick={() => setOpen(true)}>
        Create Staff
      </Button>

      <CreateStaffDialog open={open} onClose={() => setOpen(false)} onSaved={fetchStaff} />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {staff.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.active ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Button
                  color={user.active ? "error" : "success"}
                  onClick={() => toggleStatus(user.id, user.active)}
                >
                  {user.active ? "Deactivate" : "Activate"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default StaffTable;
