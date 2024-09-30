import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import burger2 from "../assets/burger2.jpg";
import momos2 from "../assets/momos2.jpg";
import pizza2 from "../assets/pizza2.jpg";

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/fooddata", {
      method: "POST",
    });
    const json = await response.json();
    // console.log(json[0], json[1]);
    setFoodItem(json[0]);
    setFoodCat(json[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "contain" }}
        >
          <div className="carousel-inner">
            <div
              className="carousel-caption d-none d-md-block"
              style={{ zIndex: "50" }}
            >
              <div className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* <button className="btn fs-4 btn-outline-success bg-success text-white" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src={burger2}
                className="d-block carousel-image w-100"
                style={{ maxHeight: "600px", objectFit: "fill" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={momos2}
                className="d-block carousel-image w-100"
                style={{ maxHeight: "600px", objectFit: "fill" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={pizza2}
                className="d-block carousel-image w-100"
                style={{ maxHeight: "600px", objectFit: "fill" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container text-white">
        {foodCat.length > 0
          ? foodCat.map((item, index) => {
              return (
                <div className="row mb-3 mt-4 " key={index}>
                  <div  className="fs-4">
                    {item.CategoryName}
                  </div>
                  <hr />
                  {foodItem.length > 0 ? (
                    foodItem
                      .filter(
                        (category) =>
                        (item.CategoryName === category.CategoryName) && category.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filterItem) => {
                        return (
                          <div
                            key={filterItem._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              
                              foodItem={filterItem}
                              options={filterItem.options[0]}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No Data Found</div>
                  )}
                </div>
              );
            })
          : ""}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
