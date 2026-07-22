import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/api/Auth/login", {
    email,
    password
});

            console.log(response.data);

            // Save Login Data
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("name", response.data.fullName);

            alert("Login Successful");

            navigate("/dashboard");

        }
        catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data);
            }
            else {
                alert("Unable to connect to server.");
            }

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            <h3 className="text-center">
                                SkillConnect Login
                            </h3>

                        </div>

                        <div className="card-body">

                            <form onSubmit={loginUser}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Login
                                </button>

                            </form>

                            <hr />

                            <p className="text-center">

                                Don't have an account?

                                <Link
                                    to="/register"
                                    className="ms-2"
                                >
                                    Register
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;