import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, TextField, Button, Typography, Box,
  Paper, CircularProgress, Alert, Stepper, Step, StepLabel
} from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  // Forgot password state
  const [forgotMode, setForgotMode]   = useState(false);
  const [fpStep, setFpStep]           = useState(0); // 0=email, 1=otp, 2=new password
  const [fpEmail, setFpEmail]         = useState("");
  const [fpOtp, setFpOtp]             = useState("");
  const [fpNewPass, setFpNewPass]     = useState("");
  const [fpConfirm, setFpConfirm]     = useState("");
  const [fpLoading, setFpLoading]     = useState(false);
  const [fpError, setFpError]         = useState("");
  const [fpSuccess, setFpSuccess]     = useState("");

  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (user.role === "ADMIN") navigate("/admin");
    else if (user.role === "STAFF") navigate("/staff");
    else navigate("/customer");
  }, [user, navigate]);

  const handleLogin = async (e) => {
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

  // Step 1 — send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setFpError(""); setFpSuccess("");
    if (!fpEmail) { setFpError("Please enter your email"); return; }
    setFpLoading(true);
    try {
      await api.post("/api/auth/forgot-password", { email: fpEmail });
      setFpStep(1);
      setFpSuccess("OTP sent to " + fpEmail + ". Check your inbox.");
    } catch (err) {
      setFpError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setFpLoading(false);
    }
  };

  // Step 2 — verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setFpError(""); setFpSuccess("");
    if (!fpOtp) { setFpError("Enter the OTP"); return; }
    setFpLoading(true);
    try {
      await api.post("/api/auth/verify-otp", { email: fpEmail, otp: fpOtp });
      setFpStep(2);
      setFpSuccess("OTP verified. Set your new password.");
    } catch (err) {
      setFpError(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setFpLoading(false);
    }
  };

  // Step 3 — reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setFpError(""); setFpSuccess("");
    if (fpNewPass !== fpConfirm) { setFpError("Passwords do not match"); return; }
    if (fpNewPass.length < 6)   { setFpError("Password must be at least 6 characters"); return; }
    setFpLoading(true);
    try {
      await api.post("/api/auth/reset-password", {
        email: fpEmail,
        otp: fpOtp,
        newPassword: fpNewPass
      });
      setFpSuccess("Password reset successfully! You can now log in.");
      setTimeout(() => {
        setForgotMode(false);
        setFpStep(0);
        setFpEmail(""); setFpOtp(""); setFpNewPass(""); setFpConfirm("");
        setFpSuccess(""); setFpError("");
      }, 2000);
    } catch (err) {
      setFpError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setFpLoading(false);
    }
  };

  // ---- Forgot Password UI ----
  if (forgotMode) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Paper elevation={4} sx={{ p: 4, width: "100%" }}>
            <Typography variant="h5" align="center" mb={1}>
              Reset Password
            </Typography>

            <Stepper activeStep={fpStep} sx={{ mb: 3 }}>
              {["Enter Email", "Verify OTP", "New Password"].map((label) => (
                <Step key={label}><StepLabel>{label}</StepLabel></Step>
              ))}
            </Stepper>

            {fpError   && <Alert severity="error"   sx={{ mb: 2 }}>{fpError}</Alert>}
            {fpSuccess && <Alert severity="success" sx={{ mb: 2 }}>{fpSuccess}</Alert>}

            {/* Step 0 */}
            {fpStep === 0 && (
              <form onSubmit={handleSendOtp}>
                <TextField
                  fullWidth label="Registered Email" type="email" margin="normal"
                  value={fpEmail} onChange={e => setFpEmail(e.target.value)} required
                />
                <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }} disabled={fpLoading}>
                  {fpLoading ? <CircularProgress size={22} /> : "Send OTP"}
                </Button>
              </form>
            )}

            {/* Step 1 */}
            {fpStep === 1 && (
              <form onSubmit={handleVerifyOtp}>
                <TextField
                  fullWidth label="Enter 6-digit OTP" margin="normal" inputProps={{ maxLength: 6 }}
                  value={fpOtp} onChange={e => setFpOtp(e.target.value)} required
                />
                <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }} disabled={fpLoading}>
                  {fpLoading ? <CircularProgress size={22} /> : "Verify OTP"}
                </Button>
                <Button fullWidth sx={{ mt: 1 }} onClick={handleSendOtp} disabled={fpLoading}>
                  Resend OTP
                </Button>
              </form>
            )}

            {/* Step 2 */}
            {fpStep === 2 && (
              <form onSubmit={handleResetPassword}>
                <TextField
                  fullWidth label="New Password" type="password" margin="normal"
                  value={fpNewPass} onChange={e => setFpNewPass(e.target.value)} required
                />
                <TextField
                  fullWidth label="Confirm New Password" type="password" margin="normal"
                  value={fpConfirm} onChange={e => setFpConfirm(e.target.value)} required
                />
                <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }} disabled={fpLoading}>
                  {fpLoading ? <CircularProgress size={22} /> : "Reset Password"}
                </Button>
              </form>
            )}

            <Button fullWidth sx={{ mt: 2 }} onClick={() => { setForgotMode(false); setFpStep(0); setFpError(""); setFpSuccess(""); }}>
              Back to Login
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }

  // ---- Normal Login UI ----
  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper elevation={4} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h5" align="center" mb={3}>
            Hotel Automation Login
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth label="Email" margin="normal" type="email"
              value={email} onChange={e => setEmail(e.target.value)} required
            />
            <TextField
              fullWidth label="Password" margin="normal" type="password"
              value={password} onChange={e => setPassword(e.target.value)} required
            />
            <Button fullWidth variant="contained" sx={{ mt: 3 }} type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
            <Button fullWidth sx={{ mt: 1 }} onClick={() => setForgotMode(true)}>
              Forgot Password?
            </Button>
            <Button fullWidth sx={{ mt: 0.5 }} onClick={() => navigate("/register")}>
              Don't have an account? Register
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
