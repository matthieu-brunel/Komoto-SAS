const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const bcrypt = require('bcryptjs');
router.use(parser.json());
const salt = process.env.SALT;
const Auth = require('./../middleware/auth');



router.post("/",Auth, (req, res) => {
  const admin = req.body;
  const password = bcrypt.hashSync(admin.password, salt)
  const sql = "INSERT INTO admin (user, password) VALUES (? , ?)";
  connection.query(
    sql,
    [admin.user, password],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't post admin" + error);
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
      }
    }
  );
});

router.get("/", Auth,(req, res) => {
  const sql = "SELECT * FROM admin";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get admin");
    } else {
      res.json(results);
    }
  });
});
router.get("/:id",Auth, (req, res) => {
  const idAdminOne = parseInt(req.params.id);
  const sql = "SELECT * FROM admin where id = ?";
  connection.query(sql, [idAdminOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get admin");
    } else {
      res.json(results);
    }
  });
});
router.put("/:id",Auth, (req, res) => {
  const idAdmin = req.params.id;
  const admin = req.body;
  const sql = `UPDATE admin SET user=?, password=? WHERE id=${idAdmin}`;
  connection.query(
    sql,
    [admin.user, admin.password, idAdmin],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't put admin" + error);
      } else {
        res.json(req.body);
      }
    }
  );
});
router.delete("/:id",Auth, (req, res) => {
  const idAdmin = req.params.id;
  const sql = "DELETE  FROM admin WHERE id=?";
  connection.query(sql, [idAdmin], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't put admin" + error);
    } else {
      res.json(req.body);
    }
  });
});
module.exports = router;
