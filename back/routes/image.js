const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require('./../middleware/auth');
router.use(parser.json());
var fs = require('fs-js');
const path = require('path');

router.post("/", Auth, (req, res) => {
  const image = req.body;
  console.log(image)
  const sql = "INSERT INTO image (name, url, alt ,homepage_id, section) VALUES (? , ? , ? , ?, ?)";
  connection.query(
    sql,
    [image.name, image.url, image.alt, image.homepage_id, image.section],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't post image" + error);
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
      }
    }
  );
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM image";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get image");
    } else {
      res.json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  const idImageOne = parseInt(req.params.id);
  const sql = "SELECT * FROM image where id = ?";
  connection.query(sql, [idImageOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get reference");
    } else {
      res.json(results);
    }
  });
});

router.put("/:id", Auth, (req, res) => {
  const idImage = req.params.id;
  const image = req.body;

  const sql = "SELECT * FROM image WHERE id=?";
  connection.query(sql, [idImage], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get image");
    } else {

      let arrayImageToDelete = [];
      let currentObj = JSON.parse(results[0].url);
      let newObj = JSON.parse(req.body.url);

      console.log(currentObj);
      console.log(newObj);





      if(newObj.logoRef.length === 0){
        arrayImageToDelete.push(currentObj.logoRef[0].name);
      }else if(currentObj.logoRef.length > 0){
        if (currentObj.logoRef[0].name !== newObj.logoRef[0].name) {
          arrayImageToDelete.push(currentObj.logoRef[0].name);
        }else{
          arrayImageToDelete.push(newObj.logoRef[0].name);
        } 
      }

      if(newObj.logoSolution.length === 0){
        arrayImageToDelete.push(currentObj.logoSolution[0].name);
      }else if (currentObj.logoSolution.length > 0){
        if(currentObj.logoSolution[0].name !== newObj.logoSolution[0].name) {
          arrayImageToDelete.push(currentObj.logoSolution[0].name)
        }else{
          arrayImageToDelete.push(newObj.logoSolution[0].name)
        }
      }

      if(newObj.imageCaroussel.length > 0){
        for (let i = 0; i < currentObj.imageCaroussel.length; i++) {
          for (let j = 0; j < newObj.imageCaroussel.length; j++) {
            if (i == j) {
              if (currentObj.imageCaroussel[i].name !== newObj.imageCaroussel[j].name) {
                arrayImageToDelete.push(currentObj.imageCaroussel[j].name);
              }
            }
          }
        }
      }else{
        for(let i of currentObj.imageCaroussel){
          arrayImageToDelete.push(i.name)
        }
      }



      console.log(arrayImageToDelete);

      if (arrayImageToDelete.length > 0) {
        for (let i = 0; i < arrayImageToDelete.length; i++) {
          fs.unlink(path.join("public/images/", arrayImageToDelete[i]), (err) => {
            if (err) throw err;
            console.log('successfully deleted ' + arrayImageToDelete[i]);
          });
        }
      }


      const sqlUpdate = `UPDATE image SET name=?, url=?, alt=?, homepage_id=?, section=? WHERE id=${idImage}`;
      connection.query(
        sqlUpdate,
        [
          image.name,
          image.url,
          image.alt,
          image.homepage_id,
          image.section,
          idImage
        ],
        (error, results, fields) => {
          if (error) {
            res.status(501).send("couldn't put Image" + error);
          } else {
            res.json(req.body);
          }
        }
      );
    }
  });

});

router.delete("/:id", Auth, (req, res) => {
  const idImage = req.params.id;

  const sql = "SELECT * FROM image WHERE id=?";
  connection.query(sql, [idImage], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get image");
    } else {

      let arrayImageToDelete = [];
      let currentObj = JSON.parse(results[0].url);

      for (let nameObj in currentObj) {
        for (let i of currentObj[nameObj]) {
          arrayImageToDelete.push(i.name);
        }
      }

      console.log(arrayImageToDelete);

      if (arrayImageToDelete.length > 0) {
        for (let i = 0; i < arrayImageToDelete.length; i++) {
          fs.unlink(path.join("public/images/", arrayImageToDelete[i]), (err) => {
            if (err) throw err;
            console.log('successfully deleted ' + arrayImageToDelete[i]);
          });
        }
      }

      const sql = "DELETE FROM image WHERE id=?";
      connection.query(sql, [idImage], (error, results, fields) => {
        if (error) {
          res.status(501).send("couldn't put image" + error);
        } else {
          res.status(200).json({ "id": req.params.id });
        }
      });
    }
  });
});

module.exports = router;
