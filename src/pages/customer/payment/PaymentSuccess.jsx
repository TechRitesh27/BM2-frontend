import { Box, Typography, Button, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper elevation={4} sx={{ p: 6, textAlign: "center", maxWidth: 420 }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Your booking is confirmed. A confirmation email has been sent to you.
        </Typography>
        <Box display="flex" gap={2} justifyContent="center">
          <Button variant="contained" onClick={() => navigate("/customer/bookings")}>
            View Bookings
          </Button>
          <Button variant="outlined" onClick={() => navigate("/customer")}>
            Dashboard
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
