const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require('./../middleware/auth');
router.use(parser.json());




router.post("/",Auth, (req, res) => {
  const file = req.body;
  const sql =
    "INSERT INTO file (name , category , mail_id) VALUES (? , ? , ? )";
  connection.query(
    sql,
    [
      file.name,
      file.category,
      file.mail_id,
      
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't post file" + error);
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
      }
    }
  );
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM file";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get file");
    } else {
      res.json(results);
    }
  });
});
router.get("/:id", (req, res) => {
  const idfileOne = parseInt(req.params.id);
  const sql = "SELECT * FROM file where id = ?";
  connection.query(sql, [idfileOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get file");
    } else {
      res.json(results);
    }
  });
});
router.put("/:id", Auth,(req, res) => {
  const idfile = req.params.id;
  const file = req.body;
  
  const sql = `UPDATE file SET name=?, category=?, mail_id=? WHERE id=${idfile}`;
  connection.query(
    sql,
    [
      file.name,
      file.category,
      file.mail_id,
      idfile
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't put file" + error);
      } else {
        res.json(req.body);
      }
    }
  );
});
router.delete("/:id", Auth,(req, res) => {
  const idfile = req.params.id;
  const sql = "DELETE  FROM file WHERE id=?";
  connection.query(sql, [idfile], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't put file" + error);
    } else {
      res.json(req.body);
    }
  });
});
module.exports = router;
