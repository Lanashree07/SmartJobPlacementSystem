const Database = require('better-sqlite3');

const db = new Database('placement.db');

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS candidates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    email TEXT NOT NULL,
    experience TEXT NOT NULL,
    score INTEGER DEFAULT 0,
    status TEXT DEFAULT 'Applied',
    interviewDate TEXT
  );

  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT DEFAULT 'Full-time',
    applicants INTEGER DEFAULT 0,
    filled INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS placements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    candidate TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    salary TEXT NOT NULL,
    startDate TEXT NOT NULL
  );
`);

module.exports = db;