import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Services() {
  const [services, setServices] = useState([]);
  const [ratings, setRatings] = useState({});
  const [keyword, setKeyword] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/Services"
      );

      setServices(response.data);

response.data.forEach(service => {
    loadRatings(service.id);
});
    } catch (error) {
      console.log(error);
    }
  };

  const searchServices = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/Services/search?keyword=${keyword}`
      );

      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteService = async (id) => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/Services/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert("Service Deleted Successfully");

      getServices();

      const bookService = async (id) => {

    try {

        const token = localStorage.getItem("token");

        await axios.post(
            "http://localhost:5000/api/Bookings",
            {
                serviceId: id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Booking Created Successfully");

    } catch (error) {

        console.log(error);

        alert("Booking Failed");

    }

};

const loadRatings = async (serviceId) => {

    try {

        const response = await axios.get(
            `http://localhost:5000/api/Reviews/service/${serviceId}/rating`
        );

        setRatings(prev => ({
            ...prev,
            [serviceId]: response.data
        }));

    } catch (error) {

        console.log(error);

    }

};

    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2>Services</h2>

        <div className="mb-4">

          <input
            className="form-control"
            placeholder="Search Services"
            value={keyword}
            onChange={(e) =>
              setKeyword(e.target.value)
            }
          />

          <button
            className="btn btn-primary mt-2"
            onClick={searchServices}
          >
            Search
          </button>

          <button
            className="btn btn-secondary mt-2 ms-2"
            onClick={getServices}
          >
            Show All
          </button>

        </div>

        <div className="row">

          {services.map((service) => (

            <div
              className="col-md-4 mb-3"
              key={service.id}
            >

              <div className="card p-3 shadow">

                {service.imageUrl && (

    <img
        src={`http://localhost:5000/uploads/${service.imageUrl}`}
        alt={service.title}
        className="card-img-top mb-3"
        style={{
            height: "220px",
            objectFit: "cover"
        }}
    />

)}

                <Link
    to={`/service/${service.id}`}
    className="text-decoration-none"
>
  {
    service.imageUrl && (

        <img
            src={`http://localhost:5000/uploads/${service.imageUrl}`}
            alt={service.title}
            className="img-fluid mb-3"
            style={{
                height: "200px",
                width: "100%",
                objectFit: "cover"
            }}
        />

    )
}

    <h5>{service.title}</h5>

</Link>

                <p>
                  {service.description}
                </p>

                <h6>
                  ₹ {service.price}
                </h6>

                <p>
                  Category: {service.category}
                </p>

                <div className="mb-2">

    <strong>⭐ Rating:</strong>{" "}

    {
        ratings[service.id]
            ? ratings[service.id].averageRating.toFixed(1)
            : "0.0"
    }

    <br />

    <small>

        {
            ratings[service.id]
                ? ratings[service.id].totalReviews
                : 0
        }

        {" "}Reviews

    </small>

</div>

                <div className="mt-2">

    {
        role === "Provider" &&

        <>
            <Link
                to={`/edit-service/${service.id}`}
                className="btn btn-warning me-2"
            >
                Edit
            </Link>

            <button
                className="btn btn-danger"
                onClick={() =>
                    deleteService(service.id)
                }
            >
                Delete
            </button>
        </>
    }

    {
        role === "Customer" &&

        <button
            className="btn btn-success"
            onClick={() =>
                bookService(service.id)
            }
        >
            Book Now
        </button>
    }

    <Link
    to={`/service/${service.id}`}
    className="btn btn-primary"
>
    View Details
</Link>

</div>
              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default Services;