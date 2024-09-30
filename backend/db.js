const mongoose = require("mongoose");
const { db } = require("./models/User");
const mongoURI = 'mongodb+srv://touseefsatticom:kjjCoDPbhlsO2A7d@cluster0.jpif5.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongo = async () =>{
    try{
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully!");
        const db = mongoose.connection.db;

        const fetched_data = await db.collection("food_items").find({}).toArray();
        const foodCategory = await db.collection("food_category").find({}).toArray(); 
       
       global.food_items = fetched_data;
       global.food_category = foodCategory;

    } catch(error){
        console.error("Error connecting to MongoDB:", error.message);
    }
}

module.exports = connectToMongo;


