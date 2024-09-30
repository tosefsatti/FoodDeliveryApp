const express = require("express");
const router = express.Router();

router.post("/fooddata", (req,res) =>{
    try{
        

       if (global.food_items && global.food_category) {
            res.status(200).send([global.food_items, global.food_category]);
        } else {
            res.status(500).json({ message: "Food data is not available yet." });
        }

    } 
    catch(error){
        console.log(error.message);

    }
})

module.exports = router;