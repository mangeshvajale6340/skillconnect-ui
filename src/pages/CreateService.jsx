import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CreateService() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

    const createService = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);

            if (image != null) {
                formData.append("image", image);
            }

            await axios.post(
                "http://localhost:5000/api/Services",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Service Created Successfully");

            navigate("/my-services");

        } catch (error) {

            console.log(error);

            alert("Failed to Create Service");

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <div className="card p-4">

                    <h2>Create Service</h2>

                    <form onSubmit={createService}>

                        <div className="mb-3">

                            <label>Title</label>

                            <input
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Description</label>

                            <textarea
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Price</label>

                            <input
                                type="number"
                                className="form-control"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Category</label>

                            <input
                                className="form-control"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Image</label>

                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) => setImage(e.target.files[0])}
                            />

                        </div>

                        <button className="btn btn-success">

                            Create Service

                        </button>

                    </form>

                </div>

            </div>

        </>

    );

}

export default CreateService;