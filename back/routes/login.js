
const express = require('express');
const router = express.Router({ mergeParams: true });
const connection = require('../config');
const jwtsecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const salt = process.env.SALT;

router.post('/', (req, res) => {
  const admin = req.body;
  let hash = bcrypt.hashSync(admin.password, salt);
  const sql = 'SELECT * from admin WHERE user=? AND password=? ';

  connection.query(sql, [admin.user, hash], (error, results, fields) => {
    if (error || results.length === 0) {
      res.status(501).send("couldn't post admin " + error);
    } else {
      jwt.sign({ admin }, jwtsecret, (err, token) => {
        if (err) {
          res.status(501).send('JWT error');
        } else  {

          res.json({ token });
        }
      });
    }
  });
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

module.exports = router;