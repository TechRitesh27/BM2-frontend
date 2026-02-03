import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const role = localStorage.getItem("role");

  const goDashboard = () => {
    if (role === "ADMIN") navigate("/admin");
    else if (role === "STAFF") navigate("/staff");
    else if (role === "GUEST") navigate("/customer");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
          Hotel Automation
        </Typography>

        {!role && (
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}

        {role && (
          <Box>
            <Button color="inherit" onClick={goDashboard}>Dashboard</Button>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
