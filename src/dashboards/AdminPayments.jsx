import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography, Paper, Button, Dialog, DialogTitle,
  DialogContent
} from "@mui/material";

const AdminPayments = () => {
  const [bills, setBills] = useState([]);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchBills = async () => {
    const res = await api.get("/api/admin/payments/bills");
    setBills(res.data);
  };

  const fetchItems = async (billId) => {
    const res = await api.get(`/api/admin/payments/bills/${billId}/items`);
    setItems(res.data);
    setOpen(true);
  };

  const markPaid = async (billId) => {
    await api.put(`/api/admin/payments/bills/${billId}/pay`);
    fetchBills();
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>Payments Management</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Booking</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Pay</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {bills.map(bill => (
            <TableRow key={bill.id}>
              <TableCell>{bill.id}</TableCell>
              <TableCell>{bill.user?.email}</TableCell>
              <TableCell>{bill.booking?.id}</TableCell>
              <TableCell>{bill.totalAmount}</TableCell>
              <TableCell>{bill.status}</TableCell>
              <TableCell>{bill.createdAt}</TableCell>
              <TableCell>
                <Button onClick={() => fetchItems(bill.id)}>View</Button>
              </TableCell>
              <TableCell>
                {bill.status === "OPEN" && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => markPaid(bill.id)}
                  >
                    Mark Paid
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Bill Items</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Source</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.sourceType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default AdminPayments;
