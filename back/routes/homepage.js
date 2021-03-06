const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require('./../middleware/auth');
router.use(parser.json());




router.post("/",Auth, (req, res) => {
  const homepage = req.body;
  console.log(homepage);
  const sql =
    "INSERT INTO homepage (subtitle, title, section, description,language, image_id) VALUES (? , ? , ? , ?, ? , ?)";
  connection.query(
    sql,
    [
      homepage.subtitle,
      homepage.title,
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
  const sql = `SELECT h.id, h.title, h.subtitle, h.description, i.name, i.url, i.alt, i.id AS id_image, i.homepage_id, l.name AS language, l.locale FROM homepage AS h JOIN image AS i ON h.image_id = i.id JOIN language AS l ON h.language = l.id WHERE h.section=? && i.section=? && l.locale=?`;
  connection.query(sql,[req.query.section,req.query.section,req.query.locale], (error, results, fields) => {
   
    if (error) {
      res.status(501).send("couldn't get homepage");
    } else {

      res.json(results);
    }
  });
});


router.get("/all", (req, res) => {
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
  const sql = `UPDATE homepage SET subtitle=?, title=?, section=?, description=?,language=?, image_id=? WHERE id=${idhomepage}`;
  connection.query(
    sql,
    [
      homepage.subtitle,
      homepage.title,
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
  console.log("id homepage : ",req.params.id);
  const idhomepage = req.params.id;
  const sql = "DELETE FROM homepage WHERE id=?";
  connection.query(sql, [idhomepage], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't put homepage" + error);
    } else {
      res.status(200).json({"id":req.params.id});
    }
  });
});



module.exports = router;
