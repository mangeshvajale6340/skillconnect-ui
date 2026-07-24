import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

function ManageServices() {

    const [services, setServices] = useState([]);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/api/Admin/services",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setServices(response.data);

        } catch (error) {

            console.log(error);
            alert("Failed to Load Services");

        }

    };

    const deleteService = async (id) => {

        if (!window.confirm("Delete this service?"))
            return;

        try {

            const token = localStorage.getItem("token");

            await api.delete(
                `/api/Admin/services/${id}`,
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

                <h2>Manage Services</h2>

                <table className="table table-bordered table-striped">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Provider</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {services.map(service => (

                            <tr key={service.id}>

                                <td>{service.id}</td>
                                <td>{service.title}</td>
                                <td>{service.category}</td>
                                <td>₹{service.price}</td>
                                <td>{service.provider}</td>

                                <td>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteService(service.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>
    );

}

export default ManageServices;