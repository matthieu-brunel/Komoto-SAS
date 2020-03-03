const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require('./../middleware/auth');
router.use(parser.json());



router.post("/",Auth, (req, res) => {
  const homepage = req.body;
  const sql =
    "INSERT INTO homepage (category, type, section, description,language, image_id) VALUES (? , ? , ? , ?, ? , ?)";
  connection.query(
    sql,
    [
      homepage.category,
      homepage.type,
      homepage.section,
      homepage.description,
      homepage.language,
      homepage.image_id
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't post homepage" + error);
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
      }
    }
  );
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM homepage";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get homepage");
    } else {
      res.json(results);
    }
  });
});
router.get("/:id", (req, res) => {
  const idhomepageOne = parseInt(req.params.id);
  const sql = "SELECT * FROM homepage where id = ?";
  connection.query(sql, [idhomepageOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get homepage");
    } else {
      res.json(results);
    }
  });
});
router.put("/:id",Auth, (req, res) => {
  const idhomepage = req.params.id;
  const homepage = req.body;
  console.log("text", req.body);
  const sql = `UPDATE homepage SET category=?, type=?, section=?, description=?,language=?, image_id=? WHERE id=${idhomepage}`;
  connection.query(
    sql,
    [
      homepage.category,
      homepage.type,
      homepage.section,
      homepage.description,
      homepage.language,
      homepage.image_id,
      idhomepage
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't put homepage" + error);
      } else {
        res.json(req.body);
      }
    }
  );
});
router.delete("/:id",Auth, (req, res) => {
  const idhomepage = req.params.id;
  const sql = "DELETE  FROM homepage WHERE id=?";
  connection.query(sql, [idhomepage], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't put homepage" + error);
    } else {
      res.json(req.body);
    }
  });
});
module.exports = router;
