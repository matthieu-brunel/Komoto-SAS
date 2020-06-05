const express = require("express");
const parser = require("body-parser");
const router = express.Router();
const multer = require("multer");
const cors = require("cors");

router.use(parser.json());
router.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/model");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const uploadDoc = multer({ storage: storage }).single("file");

router.post("/", (req, res) => {

  uploadDoc(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).send(req.file);
    }
  });
});

module.exports = router;