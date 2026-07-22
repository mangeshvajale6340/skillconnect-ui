import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function ServiceDetails() {

    const { id } = useParams();

    const [service, setService] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(null);

    useEffect(() => {

        loadService();
        loadReviews();
        loadRating();

    }, []);

    const loadService = async () => {

        const response = await axios.get(
            `http://localhost:5000/api/Services/${id}`
        );

        setService(response.data);

    };

    const loadReviews = async () => {

        const response = await axios.get(
            `http://localhost:5000/api/Reviews/service/${id}`
        );

        setReviews(response.data);

    };

    const loadRating = async () => {

        const response = await axios.get(
            `http://localhost:5000/api/Reviews/service/${id}/rating`
        );

        setRating(response.data);

    };

    // ===========================
    // Book Service
    // ===========================

    const bookService = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {

                alert("Please Login First");

                return;

            }

            await axios.post(

                "http://localhost:5000/api/Bookings",

                {
                    serviceId: Number(id)
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            alert("Service Booked Successfully");

        }
        catch (error) {

            console.log(error);

            if (error.response) {

                alert(error.response.data);

            }
            else {

                alert("Booking Failed");

            }

        }

    };

    if (!service)
        return <h3 className="text-center mt-5">Loading...</h3>;

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <div className="card p-4 shadow">

                    {
                        service.imageUrl && (

                            <img
                                src={`http://localhost:5000/uploads/${service.imageUrl}`}
                                alt={service.title}
                                className="img-fluid rounded mb-3"
                                style={{
                                    maxHeight: "350px",
                                    objectFit: "cover"
                                }}
                            />

                        )
                    }

                    <h2>{service.title}</h2>

                    <p>{service.description}</p>

                    <h4>₹ {service.price}</h4>

                    <p>

                        <strong>Category :</strong>

                        {" "}

                        {service.category}

                    </p>

                    <button
                        className="btn btn-success mb-4"
                        onClick={bookService}
                    >
                        Book Service
                    </button>

                    <hr />

                    <h4>

                        ⭐ Average Rating :

                        {

                            rating

                                ? rating.averageRating.toFixed(1)

                                : "0.0"

                        }

                    </h4>

                    <p>

                        Total Reviews :

                        {

                            rating

                                ? rating.totalReviews

                                : 0

                        }

                    </p>

                    <hr />

                    <h3>Customer Reviews</h3>

                    {

                        reviews.length === 0

                            ?

                            <p>No Reviews Yet</p>

                            :

                            reviews.map((review, index) => (

                                <div
                                    key={index}
                                    className="border rounded p-3 mb-3"
                                >

                                    <h5>

                                        {review.customer}

                                    </h5>

                                    <h6>

                                        ⭐ {review.rating}/5

                                    </h6>

                                    <p>

                                        {review.comment}

                                    </p>

                                    <small>

                                        {

                                            new Date(
                                                review.createdAt
                                            ).toLocaleDateString()

                                        }

                                    </small>

                                </div>

                            ))

                    }

                </div>

            </div>

        </>

    );

}

export default ServiceDetails;