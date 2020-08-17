const express = require("express");
const parser = require("body-parser");
const app = express();
const multer = require("multer");
const cors = require("cors");
const path = require('path');
const api = require("./routes");
const Auth = require("./middleware/auth");

require("dotenv").config();
const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;


app.use(parser.json());
app.use(
  parser.urlencoded({
    extended: true
  })
);

app.use(cors());
app.use("/api", api);

const staticPath = path.join(__dirname,'/')
app.use(express.static(staticPath));

app.use("/model", express.static(__dirname + "/public/model")); 
app.use("/images", express.static(__dirname + "/public/images")); 
app.use("/documents", express.static(__dirname + "/public/documents"));




const server = app.listen(parseInt(SERVER_ADDRESS), () => {
  console.log(`server is listening on port ${SERVER_ADDRESS}`);
});

module.exports = server;
