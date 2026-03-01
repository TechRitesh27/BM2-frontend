import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminDashboard from "./dashboards/AdminDashboard";
import CustomerDashboard from "./dashboards/CustomerDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";

import StaffLayout from "./layouts/StaffLayout";
import StaffDashboard from "./pages/staff/StaffDashboard";
import PendingServices from "./pages/staff/PendingServices";
import MyAssignments from "./pages/staff/MyAssignments";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Nested Staff Routes */}
        <Route
          path="/staff"
          element={
            <ProtectedRoute role="STAFF">
              <StaffLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="pending" element={<PendingServices />} />
          <Route path="my-assignments" element={<MyAssignments />} />
        </Route>

        <Route
          path="/customer"
          element={
            <ProtectedRoute role="GUEST">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;