const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require('./../middleware/auth');
router.use(parser.json());



router.post("/", Auth,(req, res) => {
  const solution = req.body;
  const sql =
    "INSERT INTO solution (subtitle, title, section, description,language, image_id) VALUES (? , ? , ? , ?, ? , ?)";
  connection.query(
    sql,
    [
      solution.subtitle,
      solution.title,
      solution.section,
      solution.description,
      solution.language,
      solution.image_id
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't post solution" + error);
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
      }
    }
  );
});

router.get("/", (req, res) => {
 
  const sql = `SELECT s.title, s.title_section, s.subtitle, s.description, i.name, i.url, i.alt, s.language FROM solution AS s JOIN image AS i ON s.image_id = i.homepage_id JOIN language AS l ON s.language = l.id WHERE s.section=? && i.section=? && l.locale=?`;
  connection.query(sql,[req.query.section,req.query.section,req.query.locale], (error, results, fields) => {
    if (error) {
      
      res.status(501).send("couldn't get solution");
    } else {
      res.json(results);
    }
  });
});

router.get("/all", (req, res) => {
  const sql = "SELECT * FROM solution";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get solution");
    } else {
      res.json(results);
    }
  });
});


router.get("/:id", (req, res) => {
  const idsolutionOne = parseInt(req.params.id);
  const sql = "SELECT * FROM solution where id = ?";
  connection.query(sql, [idsolutionOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get solution");
    } else {
      res.json(results);
    }
  });
});
router.put("/:id", Auth,(req, res) => {
  const idsolution = req.params.id;
  const solution = req.body;

  const sql = `UPDATE solution SET subtitle=?, title=?, title_section=?, section=?, description=?,language=?, image_id=? WHERE id=${idsolution}`;
  connection.query(
    sql,
    [
      solution.subtitle,
      solution.title,
      solution.title_section,
      solution.section,
      solution.description,
      solution.language,
      solution.image_id,
      idsolution
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't put solution" + error);
      } else {
        res.json(req.body);
      }
    }
  );
});
router.delete("/:id",Auth, (req, res) => {
  const idsolution = req.params.id;
  const sql = "DELETE  FROM solution WHERE id=?";
  connection.query(sql, [idsolution], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't put solution" + error);
    } else {
      res.json(req.body);
    }
  });
});

module.exports = router;