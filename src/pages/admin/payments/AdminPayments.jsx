import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography, Paper, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, Chip, Stack, Alert
} from "@mui/material";

const AdminPayments = () => {
  const [bills, setBills] = useState([]);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const fetchBills = async () => {
    try {
      const res = await api.get("/api/admin/payments/bills");
      setBills(res.data || []);
    } catch {
      setError("Failed to load bills");
    }
  };

  const fetchItems = async (billId) => {
    try {
      const res = await api.get(`/api/admin/payments/bills/${billId}/items`);
      setItems(res.data || []);
      setOpen(true);
    } catch {
      setError("Failed to load bill items");
    }
  };

  const markPaid = async (billId) => {
    try {
      await api.put(`/api/admin/payments/bills/${billId}/pay`);
      fetchBills();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to mark bill as paid");
    }
  };

  useEffect(() => { fetchBills(); }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>Payments & Bills</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Bill ID</TableCell>
            <TableCell>Guest</TableCell>
            <TableCell>Booking</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {bills.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center">No bills found</TableCell>
            </TableRow>
          )}
          {bills.map((bill) => (
            <TableRow key={bill.id}>
              <TableCell>#{bill.id}</TableCell>
              <TableCell>
                {bill.user?.name}<br />
                <small>{bill.user?.email}</small>
              </TableCell>
              <TableCell>#{bill.booking?.id}</TableCell>
              <TableCell>₹{bill.totalAmount?.toLocaleString()}</TableCell>
              <TableCell>
                <Chip
                  label={bill.status}
                  color={bill.status === "PAID" ? "success" : "warning"}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {bill.createdAt ? new Date(bill.createdAt).toLocaleDateString() : "—"}
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button size="small" variant="outlined" onClick={() => fetchItems(bill.id)}>
                    View Items
                  </Button>
                  {bill.status === "OPEN" && (
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => markPaid(bill.id)}
                    >
                      Mark Paid
                    </Button>
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Bill Items Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Bill Items</DialogTitle>
        <DialogContent>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">No items</TableCell>
                </TableRow>
              )}
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="right">₹{item.amount?.toLocaleString()}</TableCell>
                  <TableCell>{item.sourceType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AdminPayments;
