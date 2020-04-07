const express = require("express");
const router = express.Router({ mergeParams: true });
const parser = require("body-parser");
const editJsonFile = require("edit-json-file");
router.use(parser.json());


//http://localhost:5000/api/language/fr
router.get("/:id", (req, res) => {
    let fileName = req.params.id; //fr
    console.log("fileName : ",fileName);
    let json_file;
    // Reload it from the disk             //fr
    file = editJsonFile(`${'./language'}/${fileName}.json`, {
        autosave: true
    });
    json_file = file.get();
    
    let count = 0;
    for(let i in json_file){
        count++;
        break;
    }

    console.log(count);
    if(count > 0){
        res.json(json_file);
    }else{
        res.status(501).send("couldn't get this json file")
    }
});


module.exports = router;



