import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (!json.success) {
      alert("Please enter valid credentials!");
    } else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
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
        Login to your Account
      </h1>
      <div className=" rounded mx-2 mx-sm-1 mx-md-auto">
        <div
          className="container mx-auto bg-black text-white border rounded p-3 p-md-4 mx-md-auto"
          style={{ maxWidth: "600px" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
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
                className="form-text"
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

           <div className="text-center mt-4">
           <button type="submit" className="btn btn-success" style={{width: "100%"}}>
              Login
            </button>
            <div className="fs-6">
              <span>Don't have a Account?</span>
              <Link to="/signup" className="btn m-2 btn-danger">
                Register now
              </Link>
            </div>
           </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
