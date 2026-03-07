import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role === "ADMIN") navigate("/admin");
    else if (user.role === "STAFF") navigate("/staff");
    else navigate("/customer");
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", mt: 12 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Hotel Automation System
        </Typography>

        <Typography variant="h6" color="text.secondary" mb={4}>
          Manage bookings, staff and hotel operations seamlessly
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={handleStart}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default Home;