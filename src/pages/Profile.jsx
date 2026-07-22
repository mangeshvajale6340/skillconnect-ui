import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/Auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2>My Profile</h2>

        {user && (
          <div className="card p-3">

            <h5>{user.fullName}</h5>

            <p>Email: {user.email}</p>

            <p>
              Phone:
              {user.phoneNumber}
            </p>

            <p>Role: {user.role}</p>

          </div>
        )}

      </div>
    </>
  );
}

export default Profile;