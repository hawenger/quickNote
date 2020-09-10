//Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const noteText = require('./db/db.json');
//const noteIndex = [];



//Express App
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/db'));
//app.use(express.static('public'));
//app.use(express.static('db'));
//app.use('/static', express.static(path.join(__dirname, 'public')));
//app.use('/static', express.static(path.join(__dirname, 'db')));

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
    //res.send(database);
    //res.sendFile(path.join(__dirname, '/db/db.json'));
    //return res.json(notes);
    res.json(noteText);
});

//POST
app.post('/api/notes', function(req, res) {
    //noteIndex.push(req.body);
    //noteText.push(noteIndex);
    noteText.push(req.body);
    //console.log(noteData);
    //noteText.push(req.body);
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




// noteText.forEach((note) => {
//     if (note.id === paramId) {
//         const noteIndex = noteText.indexOf(note);
//         noteText.splice(noteIndex, 1);
//     }
// });

// fs.writeFile('db/db.json', JSON.stringify(noteText), function(err) {
//     if (err) {
//         return console.log(err);
//     }
// });

//res.json(noteText);
//});

//Listen
app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
});

//Append File

//function addToFile() {
//fs.appendFile('/db/db.json', newNote, function(err) {
// if (err) return console.log(err);
//  console.log('Appended!');
////});
//}