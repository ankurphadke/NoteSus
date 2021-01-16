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

    newNote: function(id, text) {
        pool.query('INSERT INTO notes VALUES ($1, $2);', [id, text], (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log("Successfully Inserted New Note");
            }
        });
    },

    getNote: async function(id) {
        const res = await pool.query('SELECT * FROM notes WHERE id = $1;', [id]);
        return res.rows[0];
    },

    updateText: function(id, text) {
        pool.query('UPDATE notes SET text = $1 WHERE id = $2;', [text, id], (err, res) => {
            if (err) {
                err.stack;
            } else {
                getNote(id);
            }
        });
    },

    deleteNote: function(id) {
        pool.query('DELETE FROM notes WHERE $1;', [id], (err, res) => {
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