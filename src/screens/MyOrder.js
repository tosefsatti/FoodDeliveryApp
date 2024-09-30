import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
const MyOrder = () => {
  const [orderData, setOrderData] = useState([]);


  const fetchOrders = async() =>{
    const userEmail = localStorage.getItem("userEmail");
    console.log(userEmail);
     try{
      const response = await fetch("http://localhost:5000/api/getdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const result = await response.json();
      console.log(result);
      setOrderData(result.order_data || []);

     } catch(error){
      console.error("Error fetching order data:", error);
     } 
  
  
  }

  useEffect(() =>{
   fetchOrders();
  },[])

 
  return (
    <>
      <Navbar />
      <div className="container" style={{ minHeight: "70vh" }}>
        <div className="row">
          {orderData.length > 0 ? (
            orderData.map((order, index) => (
              <div key={index}>
                {/* Check if Order_date exists */}
                {order.Order_date ? (
                  <div className="m-auto mt-5 text-white">
                    <strong>{order.Order_date}</strong>
                    <hr />
                  </div>
                ) : (
                  <div className="card mt-3 bg-black text-white border p-2" style={{maxWidth: "360px"}}>
                    <h5 className="card-title">{order.name}</h5>
                    <div className="card-body">
                      <div>Quantity: {order.qty}</div>
                      <div>Size: {order.size}</div>
                      <div>Order Date: {order.Order_date || "N/A"}</div>
                    </div>
                    <div>Price: {order.price}</div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="fs-3 text-white text-center">No Orders yet</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );

}
export default MyOrder;
