const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require('./../middleware/auth');
router.use(parser.json());
var fs = require('fs-js');
const path = require('path');



const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

router.post("/", (req, res) => {
  const mail = req.body;
  const sql = "INSERT INTO mail (category, description, date) VALUES (? , ? , ?)";
  connection.query(
    sql,
    [
      mail.category,
      mail.description,
      mail.date
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't post mail" + error);
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
        if (req.body) {
          let sql = `DELETE FROM mail WHERE date <= DATE_ADD(NOW(),INTERVAL -3 MONTH)`;
          connection.query(sql, true, (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            } else {
              res.json(results[0]);
            }
          });
        }
      }
    }
  );
});


router.get("/", Auth, (req, res) => {
  const sql = "SELECT * FROM mail";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get mail");
    } else {
      res.json(results);
    }
  });
});

router.get("/:id", Auth, (req, res) => {
  const idmailOne = parseInt(req.params.id);
  const sql = "SELECT * FROM mail where id = ?";
  connection.query(sql, [idmailOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get reference");
    } else {
      res.json(results);
    }
  });
});

router.put("/:id", Auth, (req, res) => {
  const idmail = req.params.id;
  const mail = req.body;

  const sql = `UPDATE mail SET category=?, description=?, date=? WHERE id=${idmail}`;
  connection.query(
    sql,
    [
      mail.category,
      mail.description,
      mail.date,
      idmail
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't put mail" + error);
      } else {
        res.json(req.body);
      }
    }
  );
});

router.delete("/:id", Auth, (req, res) => {
  const idmail = req.params.id;
  const data_test = req.body.category;

  if (data_test !== 'new put') {
    const sql = "SELECT * FROM mail where id = ?";
    connection.query(sql, [idmail], (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't get reference");
      } else {
        console.log(results);
        let getDocumentName = results.length > 0 ? JSON.parse(results[0].description).document : "";

        if (getDocumentName !== "") {
          fs.unlink(path.join("public/documents/", getDocumentName), (err) => {
            if (err) throw err;
            //console.log('successfully deleted /tmp/hello');
          });
        }

        const sqlDelete = "DELETE FROM mail WHERE id=?";
        connection.query(sqlDelete, [idmail], (error, results, fields) => {
          if (error) {
            res.status(501).send("couldn't put mail" + error);
          } else {

            res.json("delete ok");
          }
        });
      }
    });
  }else{
    const sqlDelete = "DELETE FROM mail";
    connection.query(sqlDelete, [idmail], (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't delete mail" + error);
      } else {

        res.json("delete ok");
      }
    }); 
  }


});

module.exports = router;