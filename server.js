const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');
const fs = require('fs');
const cockroach = require('./crud');
const features = require('./features');
const summary = require('./summary');
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

app.post("/submit", async function(req, res) {
    let id = await noteCount();
    const title = req.body.noteTitle;
    const text = req.body.noteBody;
    const images = req.body.image_path;
    const nlp = await features.NLP(text);
    const textNoHTML = text.replace(/<\/?[^>]+(>|$)/g, " ");
    const smry = await summary.summarize(textNoHTML);
    console.log('Summary', smry);
    console.log(nlp[0].categories);
    var categories;
    if (nlp[0].categories.length <= 0) categories = ''; else categories = nlp[0].categories[0].name.replace(/\//g, ',').slice(1);
    cockroach.newNote(id, title, text, categories, images, smry.output, nlp[1].entities);
    res.redirect("/");
});

app.get('/note/:id', async function(req, res) {
    const note_id = req.params.id;
    const note = await cockroach.getNote(note_id);
    const body = note.text;
    const images = note.images.split(",");
    const time = note.date;
    console.log(note.categories);
    res.render("view_note", {
        id: note_id,
        body: body,
        images: images,
        time: time,
    });
});

app.get('/noteByTitle/:title', async function(req, res) {
    var note = await cockroach.getNoteByTitle(req.params.title);
    if (note == null) {
        note = "There is no note with this title";
    } else note = note.text.replace(/<\/?[^>]+(>|$)/g, " ");
    res.setHeader('Content-Type', 'application/json');
    res.send({ body: note });
});

app.get('/summary/:title', async function(req, res) {
    var note = await cockroach.getNoteByTitle(req.params.title);
    if (note == null) {
        note = "There is no note with this title";
    } else note = note.summary;
    res.setHeader('Content-Type', 'application/json');
    res.send({ body: note });
});

app.get("/delete/:id", function(req, res) {
    const note_id = req.params.id;
    deleteNote(note_id);
    res.redirect("/");
});

app.post("/update/:id", async function(req, res) {
    const id = req.params.id;
    const text = req.body.noteBody;
    const images = req.body.image_path;
    cockroach.updateText(id, text, images);
    res.redirect("/");
});

app.listen("3000", function() {
    console.log("Server is running on port 3000");
});