const express = require("express");
const parser = require("body-parser");
const router = express.Router();
const multer = require("multer");
const cors = require("cors");

router.use(parser.json());
router.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const uploadDoc = multer({ storage: storage }).array("file");

router.post("/", (req, res) => {

  uploadDoc(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json({"message":"upload ok"});
    }
  });
});

module.exports = router;
