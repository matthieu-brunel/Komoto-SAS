const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require('./../middleware/auth');
router.use(parser.json());

router.post("/",Auth, (req, res) => {
  const demonstration = req.body;
 
  const sql =
    "INSERT INTO demonstration ( title, subtitle, section, description, model_url , model_alt, image_id, language_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [
      demonstration.title,
      demonstration.subtitle,
      demonstration.section,
      demonstration.description,
      demonstration.model_url,
      demonstration.model_alt,
      demonstration.image_id,
      demonstration.language_id,
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
  const sql = `SELECT d.id, d.model_url, d.image_id, d.model_alt, i.name, i.url, i.alt FROM demonstration AS d LEFT JOIN image AS i ON d.image_id = i.id WHERE d.section="demonstration_model"`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get demonstration");
    } else {
      res.json(results);
    }
  });
});


router.get("/all", (req, res) => {
  const sql = "SELECT * FROM demonstration";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get demonstration");
    } else {
      res.json(results);
    }
  });
});

router.get("/text", (req, res) => {
  const sql = `SELECT d.title, d.id, d.subtitle, d.section, d.description, l.locale FROM demonstration AS d JOIN language AS l ON d.language_id = l.id WHERE section = ? AND d.language_id= ?`;
  connection.query(sql,[req.query.section, req.query.language_id], (error, results, fields) => {
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



