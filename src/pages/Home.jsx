import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Hotel Automation System
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Manage bookings, staff and hotel operations seamlessly
        </Typography>
        <Button variant="contained" size="large" onClick={() => navigate("/login")}>
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
