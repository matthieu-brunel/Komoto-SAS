const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require('./../middleware/auth');
router.use(parser.json());


router.post("/",Auth, (req, res) => {
  const html = req.body;
  const sql =
    "INSERT INTO html ( title, text) VALUES (?, ?)";
  connection.query(
    sql,
    [
      html.title,
      html.text,
     
      
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't post html" + error);
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
      }
    }
  );
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM html";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get html");
    } else {
      res.json(results);
    }
  });
});
router.get("/:id", (req, res) => {
  const idhtmlOne = parseInt(req.params.id);
  const sql = "SELECT * FROM html where id = ?";
  connection.query(sql, [idhtmlOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get html");
    } else {
      res.json(results);
    }
  });
});
router.put("/:id", Auth,(req, res) => {
    const idHtml = req.params.id;
    const html = req.body;
    
    const sql = `UPDATE html SET title=?, text=? WHERE id=${idHtml}`;
    connection.query(
      sql,
      [
        html.title,
        html.text,
        idHtml
      ],
      (error, results, fields) => {
        if (error) {
          res.status(501).send("couldn't put html" + error);
        } else {
          res.json(req.body);
        }
      }
    );
  });
  
router.delete("/:id",Auth, (req, res) => {
  const idHtml = req.params.id;
  const sql = "DELETE  FROM html WHERE id=?";
  connection.query(sql, [idHtml], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't put html" + error);
    } else {
      res.json(req.body);
    }
  });
});
module.exports = router;
