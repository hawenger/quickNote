//PORT
const PORT = process.env.PORT || 3000;

//Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const noteText = require('./db/db.json');

//Express App
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/db'));

//Express Data Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//GET
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', function(req, res) {
    res.json(noteText);
});

//POST
app.post('/api/notes', function(req, res) {
    noteText.push(req.body);
    fs.writeFile('db/db.json', JSON.stringify(noteText), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('Appended!');
    });

    res.json(req.body);
});


//DELETE
app.delete('/api/notes/:id', function(req, res) {
    const chosen = req.params.id;

    noteText.forEach((note) => {
        if (note.id === chosen) {
            const noteIndex = noteText.indexOf(note);
            noteText.splice(noteIndex, 1);
        }
    });

    fs.writeFile('db/db.json', JSON.stringify(noteText), function(err) {
        if (err) {
            return console.log(err);
        }
    });

    res.json(noteText);
});

//Listen
app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
});