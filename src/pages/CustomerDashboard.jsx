import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function CustomerDashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        const token = localStorage.getItem("token");

        const response = await axios.get(
            "http://localhost:5000/api/Dashboard/customer",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setDashboard(response.data);

    };

    if (!dashboard)
        return <>Loading...</>;

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2>Customer Dashboard</h2>

                <div className="row">

                    <div className="col-md-4">
                        <div className="card p-3 shadow text-center">
                            <h5>Bookings</h5>
                            <h2>{dashboard.totalBookings}</h2>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card p-3 shadow text-center">
                            <h5>Reviews</h5>
                            <h2>{dashboard.reviews}</h2>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card p-3 shadow text-center">
                            <h5>Approved</h5>
                            <h2>{dashboard.approved}</h2>
                        </div>
                    </div>

                    <div className="col-md-4 mt-3">
                        <div className="card bg-warning text-white p-3 text-center">
                            <h5>Pending</h5>
                            <h2>{dashboard.pending}</h2>
                        </div>
                    </div>

                    <div className="col-md-4 mt-3">
                        <div className="card bg-danger text-white p-3 text-center">
                            <h5>Rejected</h5>
                            <h2>{dashboard.rejected}</h2>
                        </div>
                    </div>

                </div>

            </div>

        </>
    );

}

export default CustomerDashboard;