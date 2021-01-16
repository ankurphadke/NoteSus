const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');
const fs = require('fs');
const cockroach = require('./crud');
const features = require('./features');
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async function(req, res) {
    const notes = await cockroach.getAll();
    console.log(notes);
    res.render("index", {
        notes: notes,
    });
});

app.get("/new_note", function(req, res) {
    res.sendFile(__dirname + "/view_note.html");
});

app.post("/submit", async function(req, res) {
    let id = await cockroach.noteCount();
    id = id + 1;
    const text = req.body.noteBody;
    cockroach.newNote(id, text);
    res.redirect("/");
});

app.get('/note/:id', function(req, res) {
    const note_id = req.params.id;
    console.log(note_id);
    res.sendFile(__dirname + "/view_note.html");
});

app.listen(process.env.PORT || "3000", function() {
    console.log("Server is running on port 3000");
});