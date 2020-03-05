const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require('./../middleware/auth');
router.use(parser.json());

router.post("/",Auth, (req, res) => {
  const reference = req.body;
  const sql =
    "INSERT INTO reference (subtitle, title, section, description, image_id) VALUES (? , ? , ? , ?, ?)";
  connection.query(
    sql,
    [
      reference.subtitle,
      reference.title,
      reference.section,
      reference.description,
      reference.image_id
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't post reference" + error);
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
      }
    }
  );
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM reference";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get reference");
    } else {
      res.json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  const idReferenceOne = parseInt(req.params.id);
  const sql = "SELECT * FROM reference where id = ?";
  connection.query(sql, [idReferenceOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get reference");
    } else {
      res.json(results);
    }
  });
});

router.put("/:id", Auth,(req, res) => {
  const idReference = req.params.id;
  const reference = req.body;
  console.log("text", req.body);
  const sql = `UPDATE reference SET subtitle=?, title=?, section=?, description=?, image_id=? WHERE id=${idReference}`;
  connection.query(
    sql,
    [
      reference.subtitle,
      reference.title,
      reference.section,
      reference.description,
      reference.image_id,
      idReference
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't put reference" + error);
      } else {
        res.json(req.body);
      }
    }
  );
});

router.delete("/:id",Auth, (req, res) => {
  const idReference = req.params.id;
  const sql = "DELETE  FROM reference WHERE id=?";
  connection.query(sql, [idReference], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't put reference" + error);
    } else {
      res.json(req.body);
    }
  });
});
module.exports = router;
