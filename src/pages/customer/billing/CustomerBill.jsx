import { useEffect, useState } from "react";
import api from "../../../api/axios";

import {
  Box,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  Alert
} from "@mui/material";

import BillItemsTable from "./BillItemsTable";

export default function CustomerBill() {

  const [bill, setBill] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBill = async () => {

    try {

      const billRes = await api.get("/api/guest/account/bill");

      setBill(billRes.data);

      const itemsRes = await api.get(
        `/api/guest/account/bill/${billRes.data.id}/items`
      );

      setItems(itemsRes.data || []);

    } catch (err) {

      setError("Failed to load bill");

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBill();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  if (!bill) {
    return (
      <Typography>
        No active bill found
      </Typography>
    );
  }

  return (
    <Box>

      <Typography variant="h4" mb={3}>
        My Bill
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>

        <Stack spacing={1}>

          <Typography>
            <b>Bill ID:</b> {bill.id}
          </Typography>

          <Typography>
            <b>Status:</b> {bill.status}
          </Typography>

          <Typography>
            <b>Created:</b>{" "}
            {new Date(bill.createdAt).toLocaleString()}
          </Typography>

          <Typography variant="h6">
            Total Amount: ₹{bill.totalAmount}
          </Typography>

        </Stack>

      </Paper>

      <BillItemsTable items={items} />

    </Box>
  );
}