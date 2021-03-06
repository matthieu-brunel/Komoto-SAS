const express = require("express");
const parser = require("body-parser");
const router = express.Router();
const multer = require("multer");
const cors = require("cors");
const path = require('path');

router.use(parser.json());
router.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/documents");
  },
  filename: (req, file,/*  callback */ cb) => {
    //callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    cb(null, file.originalname);
  }
});

const uploadDoc = multer({ storage: storage }).single("file");

router.post("/", (req, res) => {

  uploadDoc(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else {
      return res.status(200).send(req.file);
    }
  });
});

module.exports = router;
