import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import CreateService from "./pages/CreateService";
import EditService from "./pages/EditService";
import MyBookings from "./pages/MyBookings";
import ProviderBookings from "./pages/ProviderBookings";
import MyServices from "./pages/MyServices";
import AddReview from "./pages/AddReview";
import ServiceDetails from "./pages/ServiceDetails";
import ProviderDashboard from "./pages/ProviderDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageServices from "./pages/ManageServices";
import ManageReviews from "./pages/ManageReviews";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Default */}
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                {/* Authentication */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Profile */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                {/* Public Services */}
                <Route
                    path="/services"
                    element={
                        <ProtectedRoute>
                            <Services />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/service/:id"
                    element={
                        <ProtectedRoute>
                            <ServiceDetails />
                        </ProtectedRoute>
                    }
                />

                {/* Provider */}

                <Route
                    path="/create-service"
                    element={
                        <ProtectedRoute role="Provider">
                            <CreateService />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-service/:id"
                    element={
                        <ProtectedRoute role="Provider">
                            <EditService />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-services"
                    element={
                        <ProtectedRoute role="Provider">
                            <MyServices />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/provider-bookings"
                    element={
                        <ProtectedRoute role="Provider">
                            <ProviderBookings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/provider-dashboard"
                    element={
                        <ProtectedRoute role="Provider">
                            <ProviderDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Customer */}

                <Route
                    path="/my-bookings"
                    element={
                        <ProtectedRoute role="Customer">
                            <MyBookings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/customer-dashboard"
                    element={
                        <ProtectedRoute role="Customer">
                            <CustomerDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-review/:serviceId"
                    element={
                        <ProtectedRoute role="Customer">
                            <AddReview />
                        </ProtectedRoute>
                    }
                />

                {/* Admin */}

                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute role="Admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/manage-users"
                    element={
                        <ProtectedRoute role="Admin">
                            <ManageUsers />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/manage-services"
                    element={
                        <ProtectedRoute role="Admin">
                            <ManageServices />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/manage-reviews"
                    element={
                        <ProtectedRoute role="Admin">
                            <ManageReviews />
                        </ProtectedRoute>
                    }
                />

                {/* Invalid URL */}

                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;