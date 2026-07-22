import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ManageUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/Admin/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(response.data);

        }
        catch (error) {

            console.log(error);

            alert("Failed to Load Users");

        }

    };

    const deleteUser = async (id) => {

        if (!window.confirm("Delete this user?"))
            return;

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/Admin/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("User Deleted Successfully");

            loadUsers();

        }
        catch (error) {

            console.log(error);

            alert("Delete Failed");

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2>Manage Users</h2>

                <table className="table table-bordered table-striped">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Phone</th>

                            <th>Role</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            users.map(user => (

                                <tr key={user.id}>

                                    <td>{user.id}</td>

                                    <td>{user.fullName}</td>

                                    <td>{user.email}</td>

                                    <td>{user.phoneNumber}</td>

                                    <td>{user.role}</td>

                                    <td>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                deleteUser(user.id)
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

export default ManageUsers;