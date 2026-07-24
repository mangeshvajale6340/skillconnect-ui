import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function MyBookings() {

    const [bookings, setBookings] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/api/Bookings/my",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            setBookings(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to Load Bookings");

        }

    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2>My Bookings</h2>

                <table className="table table-bordered table-striped">

                    <thead>

                        <tr>
                            <th>Service</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Booking Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {bookings.map((booking) => (

                            <tr key={booking.bookingId}>

                                <td>{booking.serviceTitle}</td>

                                <td>{booking.category}</td>

                                <td>₹{booking.price}</td>

                                <td>
                                    {new Date(booking.bookingDate).toLocaleDateString()}
                                </td>

                                <td>{booking.status}</td>

                                <td>

                                    {booking.status === "Approved" ? (

                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() =>
                                                navigate(`/add-review/${booking.serviceId}`)
                                            }
                                        >
                                            Add Review
                                        </button>

                                    ) : (

                                        <span className="text-muted">
                                            --
                                        </span>

                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>
    );

}

export default MyBookings;