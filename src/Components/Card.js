import React, { useEffect, useRef, useState } from "react";
import { useDispatchCard, useCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  let options = props.options;
  let optionKeys = Object.keys(options);
  let dispatch = useDispatchCard();
  let data = useCart();
  const priceRef = useRef();
  let navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(optionKeys[0] || "");
  const [finalPrice, setFinalPrice] = useState(quantity * parseInt(options[size]));

  const handleCart = async () => {

    if(localStorage.getItem("authToken") === null){
      navigate("/login");
      return;
    }
    else{
      let food = data.find(item => 
        item.id === props.foodItem._id && item.size === size
      );
      if (food) {
        
          await dispatch({
            type: "UPDATE",
            id: props.foodItem._id,
            price: finalPrice,
            qty: quantity,
            size: size
          });
         
        } else{
          await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            img: props.foodItem.img,
            description: props.foodItem.description,
            qty: quantity,
            size: size,
            price: finalPrice,
          });
      }
    }
    }
    useEffect(() => {
      // Update final price when quantity or size changes
      setFinalPrice(quantity * parseInt(options[size]));
    }, [quantity, size, options]);
  
  
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="container">
      <div className="card mt-3 bg-black text-white border">
        <img
          src={props.foodItem.img}
          className="card-img-top w-100"
          style={{ height: "150px", objectFit: "fill" }}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{props.foodItem.description}</p>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success rounded text-white"
              onChange={(e) => setQuantity(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select
              className="m-2 h-100 bg-success rounded text-white"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {optionKeys.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
            <div className="d-inline fs-5">Rs{finalPrice}/-</div>
            <hr />
            <button
              type="button"
              className="btn btn-success"
              onClick={handleCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
