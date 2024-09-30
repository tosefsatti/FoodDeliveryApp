import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Please enter valid credentials!");
    } else {
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h1 className="fs-2 text-center text white fw-bold mt-5 text-white">
        Register Now
      </h1>
      <div className="rounded mx-2 mx-sm-1 mx-md-auto">
        <div
          className="container mx-auto bg-black text-white border rounded p-3 p-md-4 mx-md-auto"
          style={{ maxWidth: "600px" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={credentials.name}
                  id="exampleInputName"
                  placeholder="Enter your name"
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email address"
                name="email"
                value={credentials.email}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handleChange}
              />
              <div
                id="emailHelp"
                className="form-text "
                style={{ color: "#7D7D7D" }}
              >
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={credentials.password}
                placeholder="******"
                id="exampleInputPassword1"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputLocation" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={credentials.location}
                id="exampleInputLocation"
                placeholder="Current location"
                onChange={handleChange}
              />
            </div>

           <div className="text-center mt-4">
           <button type="submit" className="btn btn-primary" style={{width:"100%"}}>
              Signup
            </button>
            <div className="">
              <span>Already have a Account?</span>
              <Link to="/login" className="btn m-2 btn-danger">
                Login
              </Link>
            </div>
           </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
