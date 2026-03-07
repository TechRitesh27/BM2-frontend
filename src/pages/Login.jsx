import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CircularProgress
} from "@mui/material";

import { useAuth } from "../auth/AuthContext";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (!user) return;

    if (user.role === "ADMIN") navigate("/admin");
    else if (user.role === "STAFF") navigate("/staff");
    else navigate("/customer");

  }, [user, navigate]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");
    setLoading(true);

    try {

      const data = await login(email, password);

      if (data.role === "ADMIN") navigate("/admin");
      else if (data.role === "STAFF") navigate("/staff");
      else navigate("/customer");

    } catch {

      setError("Invalid email or password");

    } finally {

      setLoading(false);

    }

  };

  return (
    <Container maxWidth="sm">

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >

        <Paper elevation={4} sx={{ p: 4, width: "100%" }}>

          <Typography variant="h5" align="center" mb={3}>
            Hotel Automation Login
          </Typography>

          {error && (
            <Typography color="error" align="center" mb={2}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Password"
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>

          </form>

        </Paper>

      </Box>

    </Container>
  );
};

export default Login;