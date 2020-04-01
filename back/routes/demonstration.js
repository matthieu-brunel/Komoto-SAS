const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require('./../middleware/auth');
router.use(parser.json());

router.post("/",Auth, (req, res) => {
  const demonstration = req.body;
  const sql =
    "INSERT INTO demonstration (subtitle, title, section, description, model_url , model_alt) VALUES (?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [
      demonstration.subtitle,
      demonstration.title,
      demonstration.section,
      demonstration.description,
      demonstration.model_url,
      demonstration.model_alt
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't post demonstration" + error);
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
      }
    }
  );
});


router.get("/", (req, res) => {
  const sql = `SELECT d.title, d.subtitle, d.section, d.description, d.model_url, d.model_alt, i.name, i.url, i.alt, i.section FROM demonstration AS d JOIN image AS i ON d.model_id = i.homepage_id WHERE d.section='demonstration_model' AND i.section='demonstration_model'`;
  connection.query(sql,[req.query.section,req.query.section], (error, results, fields) => {
    console.log(req.query)
    if (error) {
      res.status(501).send("couldn't get demonstration");
    } else {
      res.json(results);
    }
  });
});



router.get("/", (req, res) => {
  const sql = "SELECT * FROM demonstration";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get demonstration");
    } else {
      res.json(results);
    }
  });
});
router.get("/:id", (req, res) => {
  const idDemonstrationOne = parseInt(req.params.id);
  const sql = "SELECT * FROM demonstration where id = ?";
  connection.query(sql, [idDemonstrationOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get demonstration");
    } else {
      res.json(results);
    }
  });
});
router.put("/:id",Auth, (req, res) => {
  const idDemonstration = req.params.id;
  const demonstration = req.body;

  console.log("text", req.body);
  const sql = `UPDATE demonstration SET subtitle=?, title=?, section=?, description=?, model_url=? , model_alt=? WHERE id=${idDemonstration}`;
  connection.query(
    sql,
    [
      demonstration.subtitle,
      demonstration.title,
      demonstration.section,
      demonstration.description,
      demonstration.model_url,
      demonstration.model_alt,
      idDemonstration
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't put demonstration" + error);
      } else {
        res.json(req.body);
      }
    }
  );
});
router.delete("/:id",Auth, (req, res) => {
  const idDemonstration = req.params.id;
  const sql = "DELETE  FROM demonstration WHERE id=?";
  connection.query(sql, [idDemonstration], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't put demonstration" + error);
    } else {
      res.json(req.body);
    }
  });
});
module.exports = router;



