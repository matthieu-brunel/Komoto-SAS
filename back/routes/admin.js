const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");

router.use(parser.json());

router.post("/", (req, res) => {
  const admin = req.body;
  const sql = "INSERT INTO admin (user, password) VALUES (? , ?)";
  connection.query(
    sql,
    [admin.user, admin.password],
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

router.get("/", (req, res) => {
  const sql = "SELECT * FROM admin";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get admin");
    } else {
      res.json(results);
    }
  });
});
router.get("/:id", (req, res) => {
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
router.put("/:id", (req, res) => {
  const idAdmin = req.params.id;
  const admin = req.body;
  console.log("text", req.body);
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
router.delete("/:id", (req, res) => {
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
