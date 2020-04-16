const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require('./../middleware/auth');
router.use(parser.json());



router.post("/",Auth, (req, res) => {
  const homepage = req.body;
 
  const sql =
    "INSERT INTO language (name, locale) VALUES (? , ?)";
  connection.query(
    sql,
    [
        homepage.name,
        homepage.locale
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't post new language" + error);
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
      }
    }
  );
});



router.get("/", (req, res) => {
  const sql = `SELECT name, locale FROM language`;
  connection.query(sql,[req.query.section,req.query.section], (error, results, fields) => {
    
    if (error) {
      res.status(501).send("couldn't get language");
    } else {
      res.json(results);
    }
  });
});



router.get("/:id", (req, res) => {
  const idhlanguageOne = parseInt(req.params.id);
  const sql = "SELECT * FROM language where id = ?";
  connection.query(sql, [idhlanguageOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get language");
    } else {
      res.json(results);
    }
  });
});


router.put("/:id",Auth, (req, res) => {
  const idLanguage = req.params.id;
  const language = req.body;
  const sql = `UPDATE language SET name=?, locale=? WHERE id=${idLanguage}`;
  connection.query(
    sql,
    [
        language.name,
        language.locale
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't put language" + error);
      } else {
        res.json(req.body);
      }
    }
  );
});


router.delete("/:id",Auth, (req, res) => {
  const idLanguage = req.params.id;
  const sql = "DELETE FROM language WHERE id=?";
  connection.query(sql, [idLanguage], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't put language" + error);
    } else {
      res.json(req.body);
    }
  });
});



module.exports = router;
