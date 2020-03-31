const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require('./../middleware/auth');
router.use(parser.json());

router.post("/",(req, res) => {
    const mail = req.body;
    const sql = "INSERT INTO mail (category, description, date) VALUES (? , ? , ?)";
    connection.query(
      sql,
      [
        mail.category,
        mail.description,
        mail.date
      ],
      (error, results, fields) => {
        if (error) {
          res.status(501).send("couldn't post mail" + error);
        } else {
          req.body.id = results.insertId;
          res.json(req.body);
        }
      }
    );
  });


  router.get("/",Auth, (req, res) => {
    const sql = "SELECT * FROM mail";
    connection.query(sql, (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't get mail");
      } else {
        res.json(results);
      }
    });
  });

  router.get("/:id", Auth, (req, res) => {
    const idmailOne = parseInt(req.params.id);
    const sql = "SELECT * FROM mail where id = ?";
    connection.query(sql, [idmailOne], (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't get reference");
      } else {
        res.json(results);
      }
    });
  });

  router.put("/:id", Auth,(req, res) => {
    const idmail = req.params.id;
    const mail = req.body;
    
    const sql = `UPDATE mail SET category=?, description=?, date=? WHERE id=${idmail}`;
    connection.query(
      sql,
      [
        mail.category,
        mail.description,
        mail.date,
        idmail
      ],
      (error, results, fields) => {
        if (error) {
          res.status(501).send("couldn't put mail" + error);
        } else {
          res.json(req.body);
        }
      }
    );
  });

  router.delete("/:id",Auth, (req, res) => {
    const idmail = req.params.id;
    const sql = "DELETE FROM mail WHERE id=?";
    connection.query(sql, [idmail], (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't put mail" + error);
      } else {
        res.json(req.body);
      }
    });
  });

  module.exports = router;