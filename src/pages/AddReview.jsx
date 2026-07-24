import { useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function AddReview() {

    const params = useParams();

    console.log("Params:", params);
    console.log("ServiceId:", params.serviceId);

    const serviceId = Number(params.serviceId);

    console.log("Number ServiceId:", serviceId);

    const navigate = useNavigate();

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const submitReview = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            console.log({
                serviceId: Number(serviceId),
                rating,
                comment
            });

            await api.post(
                "/api/Reviews",
                {
                    serviceId: Number(serviceId),
                    rating,
                    comment
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Review Added Successfully");

            navigate("/my-bookings");

        } catch (error) {

            console.log(error);
            console.log(error.response);
            console.log(error.response?.data);

            alert("Failed to Add Review");

        }

    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <div className="card p-4">

                    <h2>Add Review</h2>

                    <form onSubmit={submitReview}>

                        <div className="mb-3">

                            <label>Rating</label>

                            <select
                                className="form-control"
                                value={rating}
                                onChange={(e) =>
                                    setRating(Number(e.target.value))
                                }
                            >
                                <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                                <option value={4}>⭐⭐⭐⭐ (4)</option>
                                <option value={3}>⭐⭐⭐ (3)</option>
                                <option value={2}>⭐⭐ (2)</option>
                                <option value={1}>⭐ (1)</option>
                            </select>

                        </div>

                        <div className="mb-3">

                            <label>Comment</label>

                            <textarea
                                className="form-control"
                                rows="5"
                                value={comment}
                                onChange={(e) =>
                                    setComment(e.target.value)
                                }
                            />

                        </div>

                        <button className="btn btn-success">
                            Submit Review
                        </button>

                    </form>

                </div>

            </div>

        </>
    );

}

export default AddReview;