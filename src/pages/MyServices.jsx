import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function MyServices() {

    const [services, setServices] = useState([]);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/Services/my",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setServices(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed To Load Services");

        }

    };

    const deleteService = async (id) => {

        if (!window.confirm("Are you sure you want to delete this service?")) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/Services/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Service Deleted Successfully");

            loadServices();

        } catch (error) {

            console.log(error);

            alert("Delete Failed");

        }

    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h2>My Services</h2>

                    <Link
                        to="/create-service"
                        className="btn btn-primary"
                    >
                        + Create Service
                    </Link>

                </div>

                <table className="table table-bordered table-striped">

                    <thead>

                        <tr>

                            <th>Title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            services.map((service) => (

                                <tr key={service.id}>

                                    <td>{service.title}</td>

                                    <td>{service.description}</td>

                                    <td>{service.category}</td>

                                    <td>₹{service.price}</td>

                                    <td>

                                        <Link
                                            to={`/edit-service/${service.id}`}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteService(service.id)}
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

export default MyServices;