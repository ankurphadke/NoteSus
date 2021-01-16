const async = require('async');
const fs = require('fs');
const pg = require('pg');

// Connect to the notes database.
const config = {
    user: 'admin',
    host: 'localhost',
    database: 'notes',
    port: 26257
};

// Create a pool.
const pool = new pg.Pool(config);

pool.connect(function(err, client, done) {

    // Close communication with the database and exit.
    const finish = function() {
        done();
        process.exit();
    };

    if (err) {
        console.error('could not connect to cockroachdb', err);
        finish();
    }
    async.waterfall([
            function(next) {
                // Create the 'notes' table.
                // pool.query('CREATE TABLE IF NOT EXISTS notes.notes (id INT PRIMARY KEY, text VARCHAR);', next);
            },
        ],
        function(err, results) {
            if (err) {
                console.error('Error inserting into and selecting from accounts: ', err);
                finish();
            }

            finish();
        });
});

module.exports = {

    getAll: async function() {
        const res = await pool.query('SELECT * FROM notes;');
        return res.rows;
    },

    newNote: function(id, title, text, categories, images, summary, entities) {
        const time = new Date().toISOString().slice(0, 19).replace('T', ' ');
        pool.query('INSERT INTO notes VALUES ($1, $2, $3, $4, $5, $6, $7, $8);', 
        [id, title, text, categories, images, summary, entities, time], (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log("Successfully Inserted New Note");
            }
        });
    },

    getNote: async function(id) {
        const res = await pool.query('SELECT * FROM notes WHERE id = $1;', [id]);
        console.log(res.rows[0]);
        return res.rows[0];
    },

    getText: async function(id) {
        const res = await pool.query('SELECT * FROM notes WHERE id = $1;', [id]);
        return res.rows[0].text;
    },

    updateText: function(id, text) {
        const time = new Date().toISOString().slice(0, 19).replace('T', ' ');
        pool.query('UPDATE notes SET text = $1, SET date = $2 WHERE id = $3;', [text, time, id], (err, res) => {
            if (err) {
                err.stack;
            } else {
                console.log("Successfully Updated!");
            }
        });
    },

    deleteNote: function(id) {
        pool.query('DELETE FROM notes WHERE id = $1;', [id], (err, res) => {
            if (err) {
                err.stack;
            } else {
                console.log("Successfully Deleted");
            }
        })
    },

    noteCount: async function() {
        const res = await pool.query('SELECT * FROM notes;');
        return res.rows.length;
    },

    endSession: function() {
        pool.end();
    }

};