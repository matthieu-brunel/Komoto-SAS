const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require('./../middleware/auth');
var fs = require('fs-js');
const path = require('path');
router.use(parser.json());



router.post("/", Auth, (req, res) => {
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

  const sql = `SELECT s.title, s.id, s.section, s.language, s.image_id,  s.subtitle, s.description, i.name, i.url, i.alt FROM solution AS s JOIN image AS i ON s.image_id = i.id JOIN language AS l ON s.language = l.id WHERE s.section=? && i.section=? && l.locale=?`;
  connection.query(sql, [req.query.section, req.query.section, req.query.locale], (error, results, fields) => {
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
router.put("/:id", Auth, (req, res) => {
  const idsolution = req.params.id;
  console.log(req.body);
  const solution = req.body[0];
  const solutionDataImage = req.body[1];

  const sql = `UPDATE solution SET subtitle=?, title=?, section=?, description=?,language=?, image_id=? WHERE id=${idsolution}`;
  connection.query(
    sql,
    [
      solution.subtitle,
      solution.title,
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
        res.json(results);

        let id_image = solution.image_id;
        const sql = "SELECT * FROM image WHERE id=?";
        connection.query(sql, [id_image], (error, results, fields) => {
          if (error) {
            res.status(501).send("couldn't get image");
          } else {

            let arrayImageToDelete = [];
            let currentObj = JSON.parse(results[0].url);
            let newObj = JSON.parse(solutionDataImage.url);

            if (newObj.logoSolution[0].name !== currentObj.logoSolution[0].name) {
              arrayImageToDelete.push(currentObj.logoSolution[0].name);
            }

            if (newObj.imageCaroussel.length > 0) {

              let arrayCurrent = [];
              let arrayNew = [];

              for (let i = 0; i < currentObj.imageCaroussel.length; i++) {
                arrayCurrent.push(currentObj.imageCaroussel[i].name);
              }

              for (let i = 0; i < newObj.imageCaroussel.length; i++) {
                arrayNew.push(newObj.imageCaroussel[i].name);
              }

              //si la longueur du tableau arrayNew est inférieure à la longueur du tableau arrayCurrent
              //alors on ajoute l'élément qui ne figure pas dans le tableau arrayNew
              if (arrayCurrent.length < arrayNew.length) {
                for (let i = 0; i < arrayNew.length; i++) {
                  if (!arrayCurrent.includes(arrayNew[i])) {
                    console.log("ajout du fichier : " + arrayNew[i]);
                  }
                  if (!arrayNew.includes(arrayCurrent[i])) {
                    if (arrayCurrent[i] !== undefined) {
                      arrayImageToDelete.push(arrayCurrent[i]);
                    }
                  }
                }
              }

              //si la longueur du tableau arrayNew est supérieure à la longueur du tableau arrayCurrent
              //alors on supprime l'élément qui ne figure pas dans le tableau arrayCurrent

              if (arrayCurrent.length > arrayNew.length) {
                for (let i = 0; i < arrayCurrent.length; i++) {
                  if (!arrayNew.includes(arrayCurrent[i])) {
                    arrayImageToDelete.push(arrayCurrent[i]);
                  }
                }
              }


              if (arrayCurrent.length === arrayNew.length) {
                for (let i = 0; i < arrayCurrent.length; i++) {
                  if (!arrayNew.includes(arrayCurrent[i])) {
                    arrayImageToDelete.push(arrayCurrent[i]);
                  }
                }
              }

              console.log("\n");
              console.log("\n");
              console.log("\n");
              console.log("\n");
              console.log("\n");
              console.log("\n");
              console.log("*********************************************************************");
              console.log("CurrentObj :", currentObj);
              console.log("newObj :", newObj);
              console.log("=====================================================================");
              console.log("=====================================================================");
              console.log("delete array image :", arrayImageToDelete);
              console.log("*********************************************************************");



            } else {
              for (let i of currentObj.imageCaroussel) {
                arrayImageToDelete.push(i.name)
              }
            }


            if (arrayImageToDelete.length > 0) {
              for (let i = 0; i < arrayImageToDelete.length; i++) {
                fs.unlink(path.join("public/images/", arrayImageToDelete[i]), (err) => {
                  if (err) throw err;
                  console.log('successfully deleted ' + arrayImageToDelete[i]);
                });
              }
            }


            const sqlUpdate = `UPDATE image SET name=?, url=?, alt=?, homepage_id=?, section=? WHERE id=${id_image}`;
            connection.query(
              sqlUpdate,
              [
                solutionDataImage.name,
                solutionDataImage.url,
                solutionDataImage.alt,
                solutionDataImage.homepage_id,
                solutionDataImage.section,
                id_image
              ],
              (error, results, fields) => {
                if (error) {
                  res.status(501).send("couldn't put Image" + error);
                }
              }
            );
          }
        });
      }
    }
  );
});



router.delete("/:id", Auth, (req, res) => {
  const idsolution = req.params.id;

  const sql = "SELECT i.url FROM solution AS s JOIN image AS i ON i.id=s.image_id WHERE s.id=?";
  connection.query(sql, [idsolution], (error, results, fields) => {

    if (error) {
      res.status(501).send("couldn't get image");
    } else {
      
      console.log(JSON.parse(results[0].url));
  
      let arrayImageToDelete = [];

      let currentObj = JSON.parse(results[0].url);
      console.log("currentObj :", currentObj);

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

     const sqlSolution = "DELETE FROM solution WHERE id=?";
      connection.query(sqlSolution, [idsolution], (error, results, fields) => {
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

