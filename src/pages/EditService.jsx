import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function EditService() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState("");

    useEffect(() => {

        loadService();

    }, []);

    const loadService = async () => {

        try {

            const response = await axios.get(
                `http://localhost:5000/api/Services/${id}`
            );

            setTitle(response.data.title);
            setDescription(response.data.description);
            setPrice(response.data.price);
            setCategory(response.data.category);
            setCurrentImage(response.data.imageUrl);

        }
        catch (error) {

            console.log(error);

            alert("Failed to Load Service");

        }

    };

    const updateService = async (e) => {

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

            await axios.put(

                `http://localhost:5000/api/Services/${id}`,

                formData,

                {
                    headers: {

                        Authorization: `Bearer ${token}`,

                        "Content-Type": "multipart/form-data"

                    }
                }

            );

            alert("Service Updated Successfully");

            navigate("/my-services");

        }
        catch (error) {

            console.log(error);

            alert("Update Failed");

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <div className="card p-4 shadow">

                    <h2>Edit Service</h2>

                    <form onSubmit={updateService}>

                        <div className="mb-3">

                            <label>Title</label>

                            <input
                                className="form-control"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                            />

                        </div>

                        <div className="mb-3">

                            <label>Description</label>

                            <textarea
                                className="form-control"
                                rows="4"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                            />

                        </div>

                        <div className="mb-3">

                            <label>Price</label>

                            <input
                                type="number"
                                className="form-control"
                                value={price}
                                onChange={(e) =>
                                    setPrice(e.target.value)
                                }
                            />

                        </div>

                        <div className="mb-3">

                            <label>Category</label>

                            <input
                                className="form-control"
                                value={category}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                            />

                        </div>

                        {
                            currentImage && (

                                <div className="mb-3">

                                    <label>Current Image</label>

                                    <br />

                                    <img
                                        src={`http://localhost:5000/uploads/${currentImage}`}
                                        alt="Service"
                                        className="img-thumbnail"
                                        style={{
                                            width: "250px",
                                            height: "180px",
                                            objectFit: "cover"
                                        }}
                                    />

                                </div>

                            )
                        }

                        <div className="mb-3">

                            <label>Change Image</label>

                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) =>
                                    setImage(e.target.files[0])
                                }
                            />

                        </div>

                        <button
                            className="btn btn-primary"
                        >
                            Update Service
                        </button>

                    </form>

                </div>

            </div>

        </>

    );

}

export default EditService;