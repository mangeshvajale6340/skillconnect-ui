import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand"
                    to="/dashboard"
                >
                    SkillConnect
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav me-auto">

                        {/* Home */}

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/dashboard"
                            >
                                Home
                            </Link>

                        </li>

                        {/* Services */}

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/services"
                            >
                                Services
                            </Link>

                        </li>

                        {/* Customer Menu */}

                        {role === "Customer" && (

                            <>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/customer-dashboard"
                                    >
                                        Dashboard
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/my-bookings"
                                    >
                                        My Bookings
                                    </Link>

                                </li>

                            </>

                        )}

                        {/* Provider Menu */}

                        {role === "Provider" && (

                            <>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/provider-dashboard"
                                    >
                                        Dashboard
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/create-service"
                                    >
                                        Create Service
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/my-services"
                                    >
                                        My Services
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/provider-bookings"
                                    >
                                        Provider Bookings
                                    </Link>

                                </li>

                            </>

                        )}

                        {/* Admin Menu */}

                        {role === "Admin" && (

                            <>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/admin-dashboard"
                                    >
                                        Admin Dashboard
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/manage-users"
                                    >
                                        Manage Users
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/manage-services"
                                    >
                                        Manage Services
                                    </Link>

                                </li>
                                <li className="nav-item">

    <Link
        className="nav-link"
        to="/manage-reviews"
    >
        Manage Reviews
    </Link>

</li>

                            </>

                        )}

                        {/* Profile */}

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/profile"
                            >
                                Profile
                            </Link>

                        </li>

                    </ul>

                    <span className="navbar-text text-white me-3">

                        Welcome, <strong>{name}</strong>

                    </span>

                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;