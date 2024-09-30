import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  let data = useCart();
  let location = useLocation();
  let navigate = useNavigate();
  const [cartView, setCartView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success px-md-4">
        <div className="container-fluid">
          <Link className="navbar-brand fs-4 fst-italic fw-bold" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link fs-5 ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {!localStorage.getItem("authToken") ? (
                ""
              ) : (
                <li className="nav-item">
                  <Link
                    className={`nav-link fs-5 ${
                      location.pathname === "/myorders" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/myorders"
                  >
                    My Orders
                  </Link>
                </li>
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <form className="d-flex justify-content-between">
                <Link
                  type="button"
                  className="btn btn-light text-success fw-bold"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
              </form>
            ) : (
              <div className="d-flex">
                <div
                  type="button"
                  className="btn btn-light text-success mx-1 fw-bold"
                  onClick={() => setCartView(true)}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  <Badge pill bg="danger mx-1">
                    {data.length}
                  </Badge>
                </div>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}
                <button
                  type="button"
                  className="btn btn-light text-danger fw-bold mx-1"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
