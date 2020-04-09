const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require("../middleware/auth");
router.use(parser.json());

router.post("/", Auth, (req, res) => {
  const contact = req.body;
  const sql = "INSERT INTO contact (name, id_locale) VALUES (?, ?)";
  connection.query(
    sql,
    [contact.name, contact.id_locale],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't post contact" + error);
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
      }
    }
  );
});

router.get("/", (req, res) => {
  const sql = `SELECT  c.name, l.locale FROM contact AS c JOIN language AS l ON c.id_locale = l.id WHERE l.locale=?`;
  connection.query(sql, [req.query.locale], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get contact");
    } else {
      res.json(results);
    }
  });
});
router.get("/all", (req, res) => {
  const sql = "SELECT * FROM contact";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get contact");
    } else {
      res.json(results);
    }
  });
});
router.get("/:id", (req, res) => {
  const idcontactOne = parseInt(req.params.id);
  const sql = "SELECT * FROM contact where id = ?";
  connection.query(sql, [idcontactOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get contact");
    } else {
      res.json(results);
    }
  });
});
router.put("/:id", Auth, (req, res) => {
  const idcontact = req.params.id;
  const contact = req.body;

  const sql = `UPDATE contact SET name=?, id_locale=? WHERE id=${idcontact}`;

  connection.query(
    sql,
    [contact.name, contact.id_locale, idcontact],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't put contact" + error);
      } else {
        res.json(req.body);
      }
    }
  );
});
router.delete("/:id", Auth, (req, res) => {
  const idcontact = req.params.id;
  const sql = "DELETE  FROM contact WHERE id=?";
  connection.query(sql, [idcontact], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't put contact" + error);
    } else {
      res.json(req.body);
    }
  });
});

module.exports = router;