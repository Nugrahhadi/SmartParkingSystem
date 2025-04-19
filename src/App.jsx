import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SmartParkingApp from "./mobile/SmartParkingApp";
import ParkingDetailScreen from "./mobile/ParkingDetailScreen";
import ParkingReservationScreen from "./mobile/ParkingReservationScreen";
import LoginRegisterScreen from "./mobile/LoginRegisterScreen";
import AdminDashboard from "./admin/AdminDashboard";
import SensorMonitoringScreen from "./admin/SensorMonitoringScreen";
import AdminUserManagement from "./admin/AdminUserManagement";
import AdminSystemConfig from "./admin/AdminSystemConfig";
import AdminReports from "./admin/AdminReports";
import ParkingLocation from "./admin/ParkingLocation";
import TransactionsScreen from "./admin/TransactionsScreen";
import ProfileTab from "./mobile/ProfileTab";
import PaymentTab from "./mobile/PaymentTab";
import ReservationTab from "./mobile/ReservationTab";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginRegisterScreen />} />

        {/* Mobile Routes */}
        <Route path="/mobile" element={<SmartParkingApp />} />
        <Route path="/mobile/parking/:id" element={<ParkingDetailScreen />} />
        <Route
          path="/mobile/reserve/:id"
          element={<ParkingReservationScreen />}
        />
        <Route path="/mobile/profile" element={<ProfileTab />} />
        <Route path="/mobile/payment" element={<PaymentTab />} />
        <Route path="/mobile/reservation" element={<ReservationTab />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/sensors" element={<SensorMonitoringScreen />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />
        <Route path="/admin/config" element={<AdminSystemConfig />} />
        <Route path="/admin/reports/" element={<AdminReports />} />
        <Route path="/admin/locations/" element={<ParkingLocation />} />
        <Route path="/admin/transactions/" element={<TransactionsScreen />} />

        {/* Default redirect to login */}
        <Route path="/" element={<LoginRegisterScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
