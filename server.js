//Dependencies
const express = require("express");
const path = require("path");
const fs = require('fs');
const database = ("/db/db.json");

//Express App
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));

//Express Data Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//GET
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"))
        //return res.json(notes);
});

//POST
app.post("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

//Listen
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});