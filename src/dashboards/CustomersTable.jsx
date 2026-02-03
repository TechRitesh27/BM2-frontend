import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, Typography, Paper
} from "@mui/material";

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    const res = await api.get("/api/admin/users/customers");
    setCustomers(res.data);
  };

  const toggleStatus = async (id, active) => {
    const url = active
      ? `/api/admin/users/${id}/deactivate`
      : `/api/admin/users/${id}/activate`;
    await api.put(url);
    fetchCustomers();
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Customers</Typography>

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
          {customers.map(user => (
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

export default CustomersTable;
