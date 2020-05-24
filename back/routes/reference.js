const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../config");
const parser = require("body-parser");
const Auth = require('./../middleware/auth');
var fs = require('fs-js');
const path = require('path');
router.use(parser.json());

router.post("/", Auth, (req, res) => {
  const reference = req.body;
  console.log(reference)
  const sql =
    "INSERT INTO reference (subtitle, title, section, description, image_id, language) VALUES (? , ? , ? , ?, ?, ?)";
  connection.query(
    sql,
    [
      reference.subtitle,
      reference.title,
      reference.section,
      reference.description,
      reference.image_id,
      reference.language
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't post reference" + error);
      } else {
        req.body.id = results.insertId;
        res.json(req.body);
      }
    }
  );
});

router.get("/", (req, res) => {
  const sql = `SELECT r.description ,r.id,r.image_id, r.title,r.subtitle, i.name, i.url, i.alt FROM reference AS r JOIN image AS i ON r.image_id = i.id JOIN language AS l ON l.id = r.language WHERE r.section=? && i.section=? && locale=?`;
  connection.query(sql, [req.query.section, req.query.section, req.query.locale], (error, results, fields) => {
    if (error) {

      res.status(501).send("couldn't get solution");
    } else {
      res.json(results);
    }

  });
});



router.get("/all", (req, res) => {
  const sql = "SELECT * FROM reference";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get reference");
    } else {
      res.json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  const idReferenceOne = parseInt(req.params.id);
  const sql = "SELECT * FROM reference where id = ?";
  connection.query(sql, [idReferenceOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get reference");
    } else {
      res.json(results);
    }
  });
});

router.put("/:id", Auth, (req, res) => {
  const idReference = req.params.id;
  const reference = req.body[0];
  const referenceDataImage = req.body[1];


  const sql = `UPDATE reference SET subtitle=?, title=?, section=?, description=?, image_id=?, language=? WHERE id=${idReference}`;
  connection.query(
    sql,
    [
      reference.subtitle,
      reference.title,
      reference.section,
      reference.description,
      reference.image_id,
      reference.language,
      idReference
    ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("couldn't put reference" + error);
      } else {
        res.json(results);

        let id_image = reference.image_id;
        const sql = "SELECT * FROM image WHERE id=?";
        connection.query(sql, [id_image], (error, results, fields) => {
          if (error) {
            res.status(501).send("couldn't get image");
          } else {

            let arrayImageToDelete = [];
            let currentObj = JSON.parse(results[0].url);
            let newObj = JSON.parse(referenceDataImage.url);

            if(newObj.logoRef[0].name !== currentObj.logoRef[0].name){
              arrayImageToDelete.push(currentObj.logoRef[0].name);
            }

            if(newObj.logoSolution[0].name !== currentObj.logoSolution[0].name){
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
                referenceDataImage.name,
                referenceDataImage.url,
                referenceDataImage.alt,
                referenceDataImage.homepage_id,
                referenceDataImage.section,
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
  const idReference = req.params.id;
  const sql = "DELETE  FROM reference WHERE id=?";
  connection.query(sql, [idReference], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't put reference" + error);
    } else {
      res.json(req.body);
    }
  });
});

module.exports = router;
