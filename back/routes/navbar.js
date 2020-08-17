const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require("../middleware/auth");
router.use(parser.json());

router.post("/", Auth, (req, res) => {
  const navbar = req.body;
  const sql = "INSERT INTO navbar (description, language_id) VALUES (?, ?)";
  connection.query(
    sql,
    [navbar.description, navbar.language_id],
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
  const sql = `SELECT n.description, l.locale FROM navbar AS n JOIN language AS l ON n.language_id = l.id WHERE n.language_id=?`;
  connection.query(sql, [req.query.language_id], (error, results, fields) => {
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

  const sql = `UPDATE navbar SET description=?, language_id=? WHERE id=${idNavbar}`;

  connection.query(
    sql,
    [navbar.description, navbar.language_id, idNavbar],
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