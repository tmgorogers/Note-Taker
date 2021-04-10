//Importing File System
//Utilites module
//
const router = require("express").Router();
const notes = require("../db/db.json");
const fs = require('fs');
const util = require('util');
const { v1 } = require('uuid');

//Convert fs.readFile/fs.writeFile into Promise version of same
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

async function readFile() {
    const data = await readFileAsync("db/db.json", "UTF-8");
    return JSON.parse(data);
}

router.get('/notes', async (req, res) => {
        const data = await readFile();
        res.json(data);
});


//GET .api.notes- Should read the "db.json" file and return all saved notes as JSON.
router.post('/notes', async function (req, res) {
    const data = await readFile();
    let note = {
        id: v1(),
        title: req.body.title,
        text: req.body.text,
    };
    data.push(note);
    console.log(data)
    const file = await writeFileAsync("db/db.json", JSON.stringify(data), "UTF-8");
    res.json(data)
});
//delete route
router.delete('/notes/:id', async function (req, res) {
    var data = await readFile();
    let id = req.params.id;

    function deleteNote() {
        data = data.filter((note) => note.id != id);
        writeFileAsync("db/db.json", JSON.stringify(data), "UTF-8");
        res.json(data);
    }
    deleteNote();
});
//updat route
router.put("/notes/:id", async function (req, res) {
    var data = await readFile();
    let id = req.params.id;
    //newdata = date.filter (id);
    let note = {
        id: req.params.id,
        title: req.body.title,
        text: req.body.text,
    };
});

module.exports = router;