const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require('./../middleware/auth');
router.use(parser.json());




router.post("/",Auth, (req, res) => {
  const test = req.body;
  const sql ="INSERT INTO test (name, title, description, language, image_id) VALUES (?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [
      test.name,
      test.title,
      test.description,
      test.language,
      test.image_id
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't post test" + error);
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
      }
    }
  );
});



router.get("/", (req, res) => {
  console.log(req.query);
  const sql = `SELECT t.name, t.title, t.description, t.image_id, t.id, i.name, i.url, i.alt, l.locale FROM test AS t JOIN language AS l ON t.language=l.id JOIN image AS i ON t.image_id=i.id WHERE l.locale=?`;
  connection.query(sql, [req.query.locale],(error, results, fields) => {
   
    if (error) {
      res.status(501).send("couldn't get test");
    } else {

      res.json(results);
    }
  });
});




router.get("/:id", (req, res) => {
  const idtestOne = parseInt(req.params.id);
  const sql = "SELECT * FROM test where id = ?";
  connection.query(sql, [idtestOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get test");
    } else {
      res.json(results);
    }
  });
});


router.put("/:id",Auth, (req, res) => {
  const idtest = req.params.id;
  const test = req.body;
  const sql = `UPDATE test SET description=? WHERE id=${idtest}`;
  connection.query(
    sql,
    [
      test.description,
      idtest
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't put test" + error);
      } else {
        res.json(req.body);
      }
    }
  );
});


router.delete("/:id",Auth, (req, res) => {
  console.log("id test : ",req.params.id);
  const idtest = req.params.id;
  const sql = "DELETE FROM test WHERE id=?";
  connection.query(sql, [idtest], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't put test" + error);
    } else {
      res.status(200).json({"id":req.params.id});
    }
  });
});



module.exports = router;
