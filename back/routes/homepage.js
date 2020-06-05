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

router.put("/:id", Auth, (req, res) => {
  const idhomepage = req.params.id;
  const homepage = req.body[0];
  const homepageDataImage = req.body[1];
  console.log("1",homepage);
  console.log("2",homepageDataImage);

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
        res.status(501).send("couldn't put solution" + error);
      } else {
        res.json(results);

        let id_image = homepage.image_id;
        const sql = "SELECT * FROM image WHERE id=?";
        connection.query(sql, [id_image], (error, results, fields) => {
          if (error) {
            res.status(501).send("couldn't get image");
          } else {

            let arrayImageToDelete = [];
            let currentObj = JSON.parse(results[0].url);
            let newObj = JSON.parse(homePageDataImage.url);

            if (newObj.imageHomePage[0].name !== currentObj.imageHomePage[0].name) {
              arrayImageToDelete.push(currentObj.imageHomePage[0].name);
            }

            if (newObj.imageCaroussel.length > 0) {

              let arrayCurrent = [];
              let arrayNew = [];

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
                homepageDataImage.name,
                homepageDataImage.url,
                homepageDataImage.alt,
                homepageDataImage.homepage_id,
                homepageDataImage.section,
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
