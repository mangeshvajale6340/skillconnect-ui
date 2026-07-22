import { useState } from "react";
import api from "../api";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("Customer");

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/Auth/register", {
        fullName,
        email,
        password,
        phoneNumber,
        role,
      });

      alert("Registration Successful");
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2>Register</h2>

        <form onSubmit={registerUser}>
          <div className="mb-3">
            <label>Full Name</label>
            <input
              className="form-control"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              className="form-control"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label>Phone Number</label>
            <input
              className="form-control"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label>Role</label>

            <select
              className="form-control"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            >
              <option>Customer</option>
              <option>Provider</option>
            </select>
          </div>

          <button
            className="btn btn-success w-100"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;