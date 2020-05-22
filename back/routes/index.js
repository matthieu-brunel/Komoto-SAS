const express = require("express");
const router = express.Router();
const image = require("./image");
const mail = require("./mail");
const login = require("./login");
const admin = require("./admin");
const demonstration = require("./demonstration");
const file = require("./file");
const homepage = require("./homepage");
const reference = require("./reference");
const solution = require("./solution");
const language = require("./language");
const contact = require("./contact");
const uploadcontact = require("./uploadcontact");
const uploadImage = require("./uploadImage");
const uploadMultipleImage = require("./uploadMultipleImage");
const navbar = require("./navbar");
const formulaire = require("./formulaire");
const test = require("./test");
const html = require("./html");

router.use("/admin", admin);
router.use("/demonstration", demonstration);
router.use("/file", file);
router.use("/login", login);
router.use("/image", image);
router.use("/mail", mail);
router.use("/homepage", homepage);
router.use("/language", language);
router.use("/reference", reference);
router.use("/solution", solution);
router.use("/contact", contact);
router.use("/uploadcontact", uploadcontact);
router.use("/uploadImage", uploadImage);
router.use("/uploadMultipleImage", uploadMultipleImage);
router.use("/documents", express.static("public/documents"));

router.use("/navbar", navbar);
router.use("/formulaire", formulaire);

router.use("/test", test);
router.use("/html", html);

module.exports = router;
