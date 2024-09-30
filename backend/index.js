const express = require('express')
const app = express()
const port = 5000
require('dotenv').config();

const connectToMongo = require('./db.js');
connectToMongo();

const cors = require('cors');
app.use(cors());

app.use((req,res,next) =>{
res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
res.header(
  "Access-Control-Allow-Hwaders",
  "Origin, X-Requested-With, Content-Type, Accept"
);
next();
})


app.get('/', (req, res) => {
  res.send('hello world')
})

app.use(express.json());

app.use("/api", require("./routes/User"));
app.use("/api", require("./routes/Fooddata"));
app.use("/api", require("./routes/OrdersData"));

app.listen(port, () =>{
    console.log(`gofood listening on port ${port}`)
})