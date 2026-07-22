import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ManageReviews() {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/Admin/reviews",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setReviews(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to Load Reviews");

        }

    };

    const deleteReview = async (id) => {

        if (!window.confirm("Delete this review?"))
            return;

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/Admin/reviews/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Review Deleted Successfully");

            loadReviews();

        } catch (error) {

            console.log(error);

            alert("Delete Failed");

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2>Manage Reviews</h2>

                <table className="table table-bordered table-striped">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Customer</th>
                            <th>Service</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            reviews.map(review => (

                                <tr key={review.id}>

                                    <td>{review.id}</td>

                                    <td>{review.customer}</td>

                                    <td>{review.service}</td>

                                    <td>{review.rating}</td>

                                    <td>{review.comment}</td>

                                    <td>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                deleteReview(review.id)
                                            }
                                        >
                                            Delete
                                        </button>

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

export default ManageReviews;