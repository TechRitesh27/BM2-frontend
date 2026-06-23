import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Paper, Stack, CircularProgress,
  Alert, Button, Chip
} from "@mui/material";
import BillItemsTable from "./BillItemsTable";

export default function CustomerBill() {
  const [bill, setBill] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const billRes = await api.get("/api/guest/account/bill");
        setBill(billRes.data);
        const itemsRes = await api.get(`/api/guest/account/bill/${billRes.data.id}/items`);
        setItems(itemsRes.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "No active bill found");
      } finally {
        setLoading(false);
      }
    };
    fetchBill();
  }, []);

  const handlePayment = () => {
    navigate("/customer/payment", {
      state: {
        bookingId: bill.booking?.id,
        billId: bill.id,
        amount: bill.totalAmount
      }
    });
  };

  if (loading) return <Box textAlign="center" mt={5}><CircularProgress /></Box>;

  if (error) return (
    <Box>
      <Typography variant="h4" mb={3}>My Bill</Typography>
      <Alert severity="info">{error}</Alert>
    </Box>
  );

  if (!bill) return (
    <Box>
      <Typography variant="h4" mb={3}>My Bill</Typography>
      <Alert severity="info">No active bill found. Book a room to get started.</Alert>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h4" mb={3}>My Bill</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack spacing={1.5}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography><b>Bill ID:</b> {bill.id}</Typography>
            <Chip
              label={bill.status}
              color={bill.status === "PAID" ? "success" : "warning"}
            />
          </Box>
          <Typography><b>Booking:</b> #{bill.booking?.id}</Typography>
          <Typography>
            <b>Created:</b> {new Date(bill.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="h6">
            Total Amount: ₹{bill.totalAmount?.toLocaleString()}
          </Typography>

          {bill.status === "OPEN" && (
            <Button
              variant="contained"
              onClick={handlePayment}
              sx={{
                mt: 1,
                backgroundColor: "#caa169",
                "&:hover": { backgroundColor: "#b8955a" }
              }}
            >
              Pay Now — ₹{bill.totalAmount?.toLocaleString()}
            </Button>
          )}

          {bill.status === "PAID" && (
            <Alert severity="success">
              This bill has been paid. Thank you!
            </Alert>
          )}
        </Stack>
      </Paper>

      <Typography variant="h6" mb={2}>Bill Items</Typography>
      <BillItemsTable items={items} />
    </Box>
  );
}
