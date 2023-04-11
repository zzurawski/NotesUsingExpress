const express = require('express');
const makeID = require('../helper/idMaker');
const { readFile, writeFile, readandAppend} = require('../helper/helper');

const app = express();

app.get('/', (req, res) => {
    console.log('success');
    readFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
});

app.post('/', (req, res) => {
    const {noteTitle, noteText} = req.body;

    if(noteTitle && noteText) {
        let newNote = {
            noteTitle,
            noteText,
            id: makeID(),
        };
        readandAppend(newNote, '../db/db.json');
        
        let addedNote = {
            status: 'success',
            body: newNote,
        }

        res.json(addedNote);
    } else {
        console.log('Failed to add note!')
        res.json()
    }

});

app.delete('./:id', (req,res) => {
    readFile('../db/db.json')
        .then((data) => writeFile('./db/db.json', (JSON.parse(data).filter((id) => id.id !== req.params.id))))

    res.json('success');
})

module.exports = app;