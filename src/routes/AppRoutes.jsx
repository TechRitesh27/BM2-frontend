import { Routes, Route, Navigate } from "react-router-dom";

/* Public Pages */
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

/* Auth */
import ProtectedRoute from "../auth/ProtectedRoute";

/* Admin Layout */
import AdminLayout from "../layouts/AdminLayout";

/* Admin Pages */
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminRooms from "../pages/admin/rooms/AdminRooms";
import AdminBookings from "../pages/admin/bookings/AdminBookings";
import AdminUsers from "../pages/admin/users/AdminUsers";
import AdminPayments from "../pages/admin/payments/AdminPayments";

/* Customer Layout */
import CustomerLayout from "../layouts/CustomerLayout";

/* Customer Pages */
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import SearchRooms from "../pages/customer/rooms/SearchRooms";
import MyServiceRequests from "../pages/customer/services/MyServiceRequests";
import CustomerBill from "../pages/customer/billing/CustomerBill";
import MyBookings from "../pages/customer/bookings/MyBookings";
import PaymentPage from "../pages/customer/payment/PaymentPage";
import PaymentSuccess from "../pages/customer/payment/PaymentSuccess";

/* Staff Layout */
import StaffLayout from "../layouts/StaffLayout";

/* Staff Core */
import StaffRedirect from "../pages/staff/StaffRedirect";
import StaffDashboard from "../pages/staff/StaffDashboard";

/* Staff Service Module */
import PendingServices from "../pages/staff/services/PendingServices";
import MyAssignments from "../pages/staff/services/MyAssignments";
import ServiceHistory from "../pages/staff/services/ServiceHistory";

/* Front Desk Module */
import FrontDeskDashboard from "../pages/staff/frontdesk/FrontDeskDashboard";
import BookingsPage from "../pages/staff/frontdesk/BookingsPage";
import QrScannerPage from "../pages/staff/frontdesk/QrScannerPage";

/* Housekeeping Module */
import HousekeepingDashboard from "../pages/staff/housekeeping/HousekeepingDashboard";
import RoomCleaningPage from "../pages/staff/housekeeping/RoomCleaningPage";

function AppRoutes() {
  const token = localStorage.getItem("accessToken");

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />

      {/* Prevent logged-in users from accessing login */}
      <Route
        path="/login"
        element={token ? <Navigate to="/" replace /> : <Login />}
      />
      <Route path="/register" element={<Register />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="rooms" element={<AdminRooms />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="payments" element={<AdminPayments />} />
      </Route>

      {/* ================= STAFF ================= */}
      <Route
        path="/staff"
        element={
          <ProtectedRoute role="STAFF">
            <StaffLayout />
          </ProtectedRoute>
        }
      >
        {/* Auto redirect based on staff type */}
        <Route index element={<StaffRedirect />} />

        {/* Generic dashboard */}
        <Route path="dashboard" element={<StaffDashboard />} />

        {/* Service requests */}
        <Route path="pending" element={<PendingServices />} />
        <Route path="my-assignments" element={<MyAssignments />} />
        <Route path="services/history" element={<ServiceHistory />} />

        {/* Front Desk */}
        <Route path="frontdesk/dashboard" element={<FrontDeskDashboard />} />
        <Route path="frontdesk/bookings" element={<BookingsPage />} />
        <Route path="frontdesk/qr" element={<QrScannerPage />} />

        {/* Housekeeping */}
        <Route
          path="housekeeping/dashboard"
          element={<HousekeepingDashboard />}
        />
        <Route path="housekeeping/rooms" element={<RoomCleaningPage />} />
      </Route>

      {/* ================= CUSTOMER ================= */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute role="GUEST">
            <CustomerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CustomerDashboard />} />
        <Route path="rooms" element={<SearchRooms />} />
        <Route path="/customer/bill" element={<CustomerBill />} />
        <Route path="/customer/bookings" element={<MyBookings />} />
<Route path="/customer/payment" element={<PaymentPage />} />
<Route path="/customer/payment-success" element={<PaymentSuccess />} />

        <Route
          path="/customer/services"
          element={
            <ProtectedRoute role="GUEST">
              <MyServiceRequests />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 404 FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
