import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Unauthorized() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goHome = () => {
    if (!user) { navigate("/login"); return; }
    if (user.role === "ADMIN") navigate("/admin");
    else if (user.role === "STAFF") navigate("/staff");
    else navigate("/customer");
  };

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h3" gutterBottom>403</Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        You don't have permission to view this page.
      </Typography>
      <Button variant="contained" sx={{ mt: 3 }} onClick={goHome}>
        Go to Dashboard
      </Button>
    </Box>
  );
}
