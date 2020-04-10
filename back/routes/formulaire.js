const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require("../middleware/auth");
router.use(parser.json());

router.post("/", Auth, (req, res) => {
  const formulaire = req.body;
  const sql = "INSERT INTO formulaire (name, id_locale) VALUES (?, ?)";
  connection.query(
    sql,
    [formulaire.name, formulaire.id_locale],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't post formulaire" + error);
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
      }
    }
  );
});

router.get("/", (req, res) => {
  const sql = `SELECT  c.name, l.locale FROM formulaire AS c JOIN language AS l ON c.id_locale = l.id WHERE l.locale=?`;
  connection.query(sql, [req.query.locale], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get formulaire");
    } else {
      res.json(results);
    }
  });
});
router.get("/all", (req, res) => {
  const sql = "SELECT * FROM formulaire";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get formulaire");
    } else {
      res.json(results);
    }
  });
});
router.get("/:id", (req, res) => {
  const idformulaireOne = parseInt(req.params.id);
  const sql = "SELECT * FROM formulaire where id = ?";
  connection.query(sql, [idformulaireOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get formulaire");
    } else {
      res.json(results);
    }
  });
});
router.put("/:id", Auth, (req, res) => {
  const idformulaire = req.params.id;
  const formulaire = req.body;

  const sql = `UPDATE formulaire SET name=?, id_locale=? WHERE id=${idformulaire}`;

  connection.query(
    sql,
    [formulaire.name, formulaire.id_locale, idformulaire],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't put formulaire" + error);
      } else {
        res.json(req.body);
      }
    }
  );
});
router.delete("/:id", Auth, (req, res) => {
  const idformulaire = req.params.id;
  const sql = "DELETE  FROM formulaire WHERE id=?";
  connection.query(sql, [idformulaire], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't put formulaire" + error);
    } else {
      res.json(req.body);
    }
  });
});

module.exports = router;