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

  return (
    <AppBar position="static">

      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Hotel Automation
        </Typography>

        {!user && (
          <Button
            color="inherit"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}

        {user && (
          <Box>

            <Button color="inherit" onClick={goDashboard}>
              Dashboard
            </Button>

            <Button color="inherit" onClick={logout}>
              Logout
            </Button>

          </Box>
        )}

      </Toolbar>

    </AppBar>
  );
};

export default Navbar;