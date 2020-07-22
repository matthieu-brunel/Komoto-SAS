const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require('./../middleware/auth');
router.use(parser.json());
var fs = require('fs-js');
const path = require('path');

router.post("/", Auth, (req, res) => {
  const image = req.body;
  const sql = "INSERT INTO image (name, url, alt, section) VALUES (? , ? , ?, ?)";
  connection.query(
    sql,
    [image.name, image.url, image.alt, image.section],
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

router.put("/:id", Auth, (req, res) => {
  const idImage = req.params.id;
  const image = req.body;
  const sqlUpdate = `UPDATE image SET name=?, url=?, alt=?, section=? WHERE id=${idImage}`;
  connection.query(
    sqlUpdate,
    [
      image.name,
      image.url,
      image.alt,
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
  )
});

router.delete("/:id", Auth, (req, res) => {
  const idImage = req.params.id;

  const sql = "DELETE FROM image WHERE id=?";
  connection.query(sql, [idImage], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't put image" + error);
    } else {
      res.status(200).json({ "id": req.params.id });
    }
  });
});

module.exports = router;
