const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require("../middleware/auth");
router.use(parser.json());

router.post("/", Auth, (req, res) => {
  const navbar = req.body;
  const sql = "INSERT INTO navbar (name, id_locale) VALUES (?, ?)";
  connection.query(
    sql,
    [navbar.name, navbar.id_locale],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't post navbar" + error);
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
      }
    }
  );
});

router.get("/", (req, res) => {
  const sql = `SELECT  n.name, l.locale FROM navbar AS n JOIN language AS l ON n.id_locale = l.id WHERE l.locale=?`;
  connection.query(sql, [req.query.locale], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get navbar");
    } else {
      res.json(results);
    }
  });
});
router.get("/all", (req, res) => {
  const sql = "SELECT * FROM navbar";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get navbar");
    } else {
      res.json(results);
    }
  });
});
router.get("/:id", (req, res) => {
  const idNavbarOne = parseInt(req.params.id);
  const sql = "SELECT * FROM navbar where id = ?";
  connection.query(sql, [idNavbarOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get navbar");
    } else {
      res.json(results);
    }
  });
});
router.put("/:id", Auth, (req, res) => {
  const idNavbar = req.params.id;
  const navbar = req.body;

  const sql = `UPDATE navbar SET name=?, id_locale=? WHERE id=${idNavbar}`;

  connection.query(
    sql,
    [navbar.name, navbar.id_locale, idNavbar],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't put navbar" + error);
      } else {
        res.json(req.body);
      }
    }
  );
});
router.delete("/:id", Auth, (req, res) => {
  const idNavbar = req.params.id;
  const sql = "DELETE  FROM navbar WHERE id=?";
  connection.query(sql, [idNavbar], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't put navbar" + error);
    } else {
      res.json(req.body);
    }
  });
});

module.exports = router;