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
    res.render("index", {
        notes: notes,
    });
});

app.get("/new_note", function(req, res) {
    res.render("new_note", {});
});

app.post("/submit", async function(req, res) {
    let id = await cockroach.noteCount();
    id = id + 1;
    const title = req.body.noteTitle;
    const text = req.body.noteBody;
    cockroach.newNote(id, text);
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

app.post("/update/:id", async function(req, res) {
    const id = req.params.id;
    const text = req.body.noteBody;
    cockroach.updateText(id, text);
    res.redirect("/");
});

app.listen(process.env.PORT || "3000", function() {
    console.log("Server is running on port 3000");
});