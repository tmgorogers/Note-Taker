//Importing File System
//Utilites module
const router = require("express").Router();
const notes = require("../db/db.json");
const fs = require('fs');

const readFileAsync = util.promisify(fs.readfile);
const writeFileAsync = util.promisify(fs.writeFile);

async function readFile() {
    const data = await readFileAsync("db/db.json", "UTF-8");
    return JSON.parse(data);
}
router.get('/notes',
    async (req, res) => {
        const data = await readFile();
        res.json(data);
    });


//GET .api.notes- Should read the "db.json" file and return all saved notes as JSON.
router.post('/notes', async function (req, res) {
    const data = await readFile();
    console.log({ data, body: req.body });
    let note = {
        id: data.length + 1,
        title: req.body.title,
        text: req.body.text,
    };
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
    router.put("/notes/:id", async function (req,res) {
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