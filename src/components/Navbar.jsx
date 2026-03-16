import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const goDashboard = () => {
    if (!user) return;

    if (user.role === "ADMIN") navigate("/admin");
    else if (user.role === "STAFF") navigate("/staff");
    else navigate("/customer");
  };

  const navButtonStyle = {
    color: "black",
    textTransform: "none",
    fontSize: "16px",
    "&:hover": {
      color: "#d1800d",
      background: "transparent"
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "rgba(221, 191, 138, 0.35)",
        backdropFilter: "blur(8px)",
        color: "black",
        boxShadow: "none"
      }}
    >
      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer", color: "black" }}
          onClick={() => navigate("/")}
        >
          BM Group of Hotels
        </Typography>

        <Button sx={navButtonStyle} onClick={() => navigate("/")}>
          Home
        </Button>

        {!user && (
          <Button sx={navButtonStyle} onClick={() => navigate("/login")}>
            Login
          </Button>
        )}

        {!user && (
          <Button sx={navButtonStyle} onClick={() => navigate("/register")}>
            Register
          </Button>
        )}

        {user && (
          <Box>
            <Button sx={navButtonStyle} onClick={goDashboard}>
              Dashboard
            </Button>

            <Button sx={navButtonStyle} onClick={logout}>
              Logout
            </Button>
          </Box>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;