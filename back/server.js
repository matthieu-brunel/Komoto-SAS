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

const staticPath = path.join(__dirname,'/')
app.use(express.static(staticPath));
app.use("/model", express.static(__dirname + "/public/model")); 


app.use(cors());

app.use("/api", api);

/* app.use("/upload", express.static("public/images"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single("file");

// upload file path
app.post("/api/uploadFile", [Auth], (req, res) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    } else {
      // si la sauvegarde a fonctionné, on renvoi un status 200
      return res.status(200).send(req.file);
    }
  });
}); */

const server = app.listen(parseInt(SERVER_ADDRESS), () => {
  console.log(`server is listening on port ${SERVER_ADDRESS}`);
});

module.exports = server;
