const express = require("express");
const router = express.Router();
const order = require("../models/Orders.js");


router.post("/orderdata", async(req,res) =>{
    
     let data = req.body.order_data;
    
// Ensure order_data is an array and order_date is passed correctly
if (!data || !Array.isArray(data)) {
    return res.status(400).json({ error: "Invalid order data" });
  }
  await data.splice(0, 0, {Order_date: req.body.order_date});
    try{
        let eID = await order.findOne({ email: req.body.email });
        if (!eID) {
            await order.create({
                email: req.body.email,
                order_data: data, // Wrap data in an array if it's not already
                
              });
              console.log("Order Created Successfully");
              return res.json({ success: true });
            }
              else {
                // If email exists, update the document with new order data
                await order.findOneAndUpdate(
                  { email: req.body.email },
                  { $push: { order_data: data } }
                );
                console.log("Order Updated Successfully");
                return res.json({ success: true });
              }
            }
 catch(error){
    console.log(error.message);
    return res.status(500).json({ error: error.message });
}
   
    
})

router.post("/getdata", async(req,res) =>{
  try{
    let myData = await order.findOne({email: req.body.email});
    if (!myData) {
      return res.status(404).json({ message: "No orders found for this email" });
    }
    const flattenedOrders = myData.order_data.flat();

    return res.json({ order_data: flattenedOrders });


  } catch(error){
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
})

module.exports = router;