const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Initialize tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        title TEXT,
        description TEXT,
        status TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
});

module.exports = db;
