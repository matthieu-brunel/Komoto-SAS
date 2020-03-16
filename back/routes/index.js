const express = require("express");
const router = express.Router();
const image = require("./image");
const mail = require("./mail");
const login = require('./login');
const admin = require("./admin");
const demonstration = require("./demonstration");
const file = require("./file");
const homepage = require("./homepage");
const reference = require("./reference");
const solution = require("./solution");

router.use("/admin", admin);
router.use("/demonstration", demonstration);
router.use("/file", file);
router.use('/login', login);
router.use("/image", image);
router.use("/mail", mail);
router.use("/homepage", homepage);
router.use("/reference", reference);
router.use("/solution", solution);

module.exports = router;
