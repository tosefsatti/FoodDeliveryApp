const express = require("express");
const router = express.Router();
const user = require("../models/User.js");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET  || 'donottrusteverybody';

router.post("/createuser",[
    body("email").isEmail(),
    body("password").isLength({min: 5}),
    body("name").isLength({min: 5})
]
    ,async(req, res) =>{


        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });

        }

           const salt = await bcrypt.genSalt(10);
           let securePassword = await bcrypt.hash(req.body.password, salt);

    try{
       await user.create({
            name: req.body.name,
            password: securePassword,
            email: req.body.email,
            location: req.body.location
        })
        res.json({success:true})

    } catch(error){
    console.log(error);
    res.json({success:false})
    }


})

router.post("/loginuser",[
    body("email").isEmail(),
    body("password").isLength({min: 5}),
    
]
    ,async(req, res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });

        }
         let email = req.body.email;
    try{
      let userData = await user.findOne({email});
       if(!userData){
        
        return res.status(400).json({errors: "Incorrect email or password" });
       }
       

       const comparePass = await bcrypt.compare(req.body.password, userData.password)
 
       if(!comparePass){
        
        return res.status(400).json({errors: "Incorrect email or password" });
       }

       let data = {
        user:{
            id: userData.id,
        }
       }

       const authToken = jwt.sign(data, jwtSecret)

       res.json({success:true, authToken: authToken});

    } catch(error){
    console.log(error);
    res.json({success:false})
    }


})

module.exports = router;