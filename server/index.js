const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 5100;
require('dotenv').config();
const authRoute = require("./routes/authroute");
const productRoute = require('./routes/productroute')
const mongoDB = require('./mongodb')


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


app.use("/auth", authRoute);
app.use('/product', productRoute);

mongoDB.then(()=>{
app.listen(port, (req, res) => {
  console.log(`Server is running on port http://localhost:${port}`);
});
})
