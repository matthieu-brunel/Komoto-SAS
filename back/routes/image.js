const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require('./../middleware/auth');
router.use(parser.json());

router.post("/",Auth, (req, res) => {
  const image = req.body;
  console.log(image);
  const sql = "INSERT INTO image (name, url, alt ,homepage_id, section) VALUES (? , ? , ? , ?, ?)";
  connection.query(
    sql,
    [image.name, image.url, image.alt , image.homepage_id, image.section],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't post image" + error);
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
      }
    }
  );
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM image";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get image");
    } else {
      res.json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  const idImageOne = parseInt(req.params.id);
  const sql = "SELECT * FROM image where id = ?";
  connection.query(sql, [idImageOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get reference");
    } else {
      res.json(results);
    }
  });
});

router.put("/:id",Auth, (req, res) => {
  const idImage = req.params.id;
  const image = req.body;
  const sql = `UPDATE image SET name=?, url=?, alt=?, homepage_id=?, section=? WHERE id=${idImage}`;
  connection.query(
    sql,
    [
      image.name, 
      image.url,
      image.alt, 
      image.homepage_id, 
      image.section, 
      idImage
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't put Image" + error);
      } else {
        res.json(req.body);
      }
    }
  );
});

router.delete("/:id",Auth, (req, res) => {
  const idImage = req.params.id;
  const sql = "DELETE FROM image WHERE id=?";
  connection.query(sql, [idImage], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't put image" + error);
    } else {
      res.json(req.body);
    }
  });
});

module.exports = router;
