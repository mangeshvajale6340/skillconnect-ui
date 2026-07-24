import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/api/Admin/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDashboard(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to load Admin Dashboard");

        }

    };

    if (!dashboard)
        return (
            <>
                <Navbar />
                <div className="container mt-5">
                    Loading...
                </div>
            </>
        );

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">Admin Dashboard</h2>

                <div className="row">

                    <div className="col-md-3 mb-3">
                        <div className="card shadow text-center p-3">
                            <h5>Total Users</h5>
                            <h2>{dashboard.totalUsers}</h2>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className="card shadow text-center p-3">
                            <h5>Total Services</h5>
                            <h2>{dashboard.totalServices}</h2>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className="card shadow text-center p-3">
                            <h5>Total Bookings</h5>
                            <h2>{dashboard.totalBookings}</h2>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className="card shadow text-center p-3">
                            <h5>Total Reviews</h5>
                            <h2>{dashboard.totalReviews}</h2>
                        </div>
                    </div>

                </div>

            </div>

        </>
    );

}

export default AdminDashboard;