import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ProviderDashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/Dashboard/provider",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDashboard(response.data);

        }
        catch (error) {

            console.log(error);

            alert("Failed to load dashboard");

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

                <h2 className="mb-4">
                    Provider Dashboard
                </h2>

                <div className="row">

                    <div className="col-md-4 mb-3">
                        <div className="card text-center shadow p-3">
                            <h5>Total Services</h5>
                            <h2>{dashboard.totalServices}</h2>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card text-center shadow p-3">
                            <h5>Total Bookings</h5>
                            <h2>{dashboard.totalBookings}</h2>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card text-center shadow p-3">
                            <h5>Average Rating</h5>
                            <h2>{dashboard.averageRating}</h2>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card bg-warning text-white text-center shadow p-3">
                            <h5>Pending</h5>
                            <h2>{dashboard.pending}</h2>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card bg-success text-white text-center shadow p-3">
                            <h5>Approved</h5>
                            <h2>{dashboard.approved}</h2>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card bg-danger text-white text-center shadow p-3">
                            <h5>Rejected</h5>
                            <h2>{dashboard.rejected}</h2>
                        </div>
                    </div>

                </div>

            </div>

        </>
    );
}

export default ProviderDashboard;