const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');
const fs = require('fs');
const cockroach = require('./crud');
const features = require('./features');
const ejs = require("ejs");
const _ = require("lodash");
const { deleteNote, manualQuery, getNote, noteCount } = require('./crud');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async function(req, res) {
    const notes = await cockroach.getAll();
    res.render("index", {
        notes: notes,
    });
});

app.get("/new_note", function(req, res) {
    res.render("new_note", {});
});

app.get("/new_note/image", function(req, res) {
    res.render("new_note", {});
});

app.post("/submit", async function(req, res) {
    let id = await noteCount();
    const title = req.body.noteTitle;
    const text = req.body.noteBody;
    const nlp = await features.NLP(text);
    cockroach.newNote(id, title, text, nlp[0].categories, ' ', ' ', nlp[1].entities);
    res.redirect("/");
});

app.get('/note/:id', async function(req, res) {
    const note_id = req.params.id;
    const note_body = await cockroach.getText(note_id);
    res.render("view_note", {
        id: note_id,
        body: note_body,
    });
});

app.get('/noteByTitle/:title', async function(req, res) {
    var note = await cockroach.getNoteByTitle(req.params.title);
    if (note == null) {
        note = "There is no note with this title";
    }
    else note = note.text.replace(/<\/?[^>]+(>|$)/g, " ");
    res.setHeader('Content-Type', 'application/json');
    res.send({body: note});
});

app.get("/delete/:id", function(req, res) {
    const note_id = req.params.id;
    deleteNote(note_id);
    res.redirect("/");
});

app.post("/update/:id", async function(req, res) {
    const id = req.params.id;
    const text = req.body.noteBody;
    cockroach.updateText(id, text);
    res.redirect("/");
});

app.listen("3000", '192.168.0.113', function() {
    console.log("Server is running on port 3000");
});