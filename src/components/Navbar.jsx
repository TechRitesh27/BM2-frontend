import { AppBar, Toolbar, Typography, Button, Box, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const roleLabel = { ADMIN: "Admin", STAFF: "Staff", GUEST: "Guest" };
const roleColor = { ADMIN: "error", STAFF: "warning", GUEST: "primary" };

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const goDashboard = () => {
    if (!user) return;
    if (user.role === "ADMIN") navigate("/admin");
    else if (user.role === "STAFF") navigate("/staff");
    else navigate("/customer");
  };

  const navBtn = {
    color: "black",
    textTransform: "none",
    fontSize: "15px",
    "&:hover": { color: "#d1800d", background: "transparent" }
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
          sx={{ flexGrow: 1, cursor: "pointer", color: "black", fontWeight: 600 }}
          onClick={() => navigate("/")}
        >
          BM Group of Hotels
        </Typography>

        <Button sx={navBtn} onClick={() => navigate("/")}>Home</Button>

        {!user && (
          <>
            <Button sx={navBtn} onClick={() => navigate("/login")}>Login</Button>
            <Button sx={navBtn} onClick={() => navigate("/register")}>Register</Button>
          </>
        )}

        {user && (
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              label={`${roleLabel[user.role] || user.role}${user.staffType ? ` · ${user.staffType}` : ""}`}
              color={roleColor[user.role] || "default"}
              size="small"
              variant="outlined"
            />
            <Button sx={navBtn} onClick={goDashboard}>Dashboard</Button>
            <Button sx={navBtn} onClick={logout}>Logout</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
