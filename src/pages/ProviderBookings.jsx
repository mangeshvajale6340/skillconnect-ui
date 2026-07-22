import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ProviderBookings() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/Bookings/provider",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setBookings(response.data);

        } catch (error) {

            console.log(error);
            alert("Failed to Load Bookings");

        }

    };

    const approveBooking = async (id) => {

    try {

        const token = localStorage.getItem("token");

        await axios.put(
            `http://localhost:5000/api/Bookings/${id}/approve`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Booking Approved Successfully");

        loadBookings();

    } catch (error) {

        console.log(error);

        alert("Approval Failed");

    }

};

const rejectBooking = async (id) => {

    try {

        const token = localStorage.getItem("token");

        await axios.put(
            `http://localhost:5000/api/Bookings/${id}/reject`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Booking Rejected Successfully");

        loadBookings();

    } catch (error) {

        console.log(error);

        alert("Reject Failed");

    }

};

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2>Provider Bookings</h2>

                <table className="table table-bordered table-striped">

                    <thead>

                        <tr>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Service</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            bookings.map((booking) => (

                                <tr key={booking.bookingId}>

                                    <td>{booking.customerName}</td>

                                    <td>{booking.customerEmail}</td>

                                    <td>{booking.customerPhone}</td>

                                    <td>{booking.serviceTitle}</td>

                                    <td>{booking.category}</td>

                                    <td>₹{booking.price}</td>

                                    <td>
                                        {
                                            new Date(booking.bookingDate)
                                                .toLocaleDateString()
                                        }
                                    </td>

                                    <td>{booking.status}</td>
<td>

    {booking.status === "Pending" ? (

        <>
            <button
                className="btn btn-success btn-sm me-2"
                onClick={() => approveBooking(booking.bookingId)}
            >
                Approve
            </button>

            <button
                className="btn btn-danger btn-sm"
                onClick={() => rejectBooking(booking.bookingId)}
            >
                Reject
            </button>
        </>

    ) : (

        <span className="badge bg-secondary">
            {booking.status}
        </span>

    )}

</td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </>
    );

}

export default ProviderBookings;