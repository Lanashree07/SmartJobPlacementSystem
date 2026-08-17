const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());


/* -------------------- HEALTH CHECK -------------------- */

app.get('/', (req, res) => {
  res.json({
    message: 'Smart Job Placement API is running successfully 🚀'
  });
});

/* -------------------- CANDIDATES -------------------- */

// Get all candidates
app.get('/api/candidates', (req, res) => {
  const candidates = db
    .prepare('SELECT * FROM candidates ORDER BY id DESC')
    .all();

  res.json(candidates);
});

// Add a candidate
app.post('/api/candidates', (req, res) => {
  const {
    name,
    role,
    email,
    experience,
    score,
    status,
    interviewDate
  } = req.body;

  if (!name || !role || !email || !experience) {
    return res.status(400).json({
      message: 'Name, role, email and experience are required'
    });
  }

  const result = db
    .prepare(`
      INSERT INTO candidates
      (name, role, email, experience, score, status, interviewDate)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      name,
      role,
      email,
      experience,
      Number(score) || 0,
      status || 'Applied',
      interviewDate || ''
    );

  const newCandidate = db
    .prepare('SELECT * FROM candidates WHERE id = ?')
    .get(result.lastInsertRowid);

  res.status(201).json(newCandidate);
});

// Update a candidate
app.put('/api/candidates/:id', (req, res) => {
  const id = Number(req.params.id);

  const existingCandidate = db
    .prepare('SELECT * FROM candidates WHERE id = ?')
    .get(id);

  if (!existingCandidate) {
    return res.status(404).json({
      message: 'Candidate not found'
    });
  }

  const updatedCandidate = {
    ...existingCandidate,
    ...req.body
  };

  db.prepare(`
    UPDATE candidates
    SET name = ?,
        role = ?,
        email = ?,
        experience = ?,
        score = ?,
        status = ?,
        interviewDate = ?
    WHERE id = ?
  `).run(
    updatedCandidate.name,
    updatedCandidate.role,
    updatedCandidate.email,
    updatedCandidate.experience,
    Number(updatedCandidate.score) || 0,
    updatedCandidate.status || 'Applied',
    updatedCandidate.interviewDate || '',
    id
  );

  const candidate = db
    .prepare('SELECT * FROM candidates WHERE id = ?')
    .get(id);

  res.json(candidate);
});

// Delete a candidate
app.delete('/api/candidates/:id', (req, res) => {
  const id = Number(req.params.id);

  const candidate = db
    .prepare('SELECT * FROM candidates WHERE id = ?')
    .get(id);

  if (!candidate) {
    return res.status(404).json({
      message: 'Candidate not found'
    });
  }

  db.prepare('DELETE FROM candidates WHERE id = ?').run(id);

  res.json({
    message: 'Candidate removed',
    candidate
  });
});

/* -------------------- JOBS -------------------- */

// Get all jobs
app.get('/api/jobs', (req, res) => {
  const jobs = db
    .prepare('SELECT * FROM jobs ORDER BY id DESC')
    .all()
    .map(job => ({
      ...job,
      filled: Boolean(job.filled)
    }));

  res.json(jobs);
});

// Add a job
app.post('/api/jobs', (req, res) => {
  const {
    title,
    company,
    location,
    type,
    applicants,
    filled
  } = req.body;

  if (!title || !company || !location) {
    return res.status(400).json({
      message: 'Job title, company and location are required'
    });
  }

  const result = db
    .prepare(`
      INSERT INTO jobs
      (title, company, location, type, applicants, filled)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    .run(
      title,
      company,
      location,
      type || 'Full-time',
      Number(applicants) || 0,
      filled ? 1 : 0
    );

  const newJob = db
    .prepare('SELECT * FROM jobs WHERE id = ?')
    .get(result.lastInsertRowid);

  newJob.filled = Boolean(newJob.filled);

  res.status(201).json(newJob);
});

/* -------------------- PLACEMENTS -------------------- */

// Get all placements
app.get('/api/placements', (req, res) => {
  const placements = db
    .prepare('SELECT * FROM placements ORDER BY id DESC')
    .all();

  res.json(placements);
});

// Add a placement
app.post('/api/placements', (req, res) => {
  const {
    candidate,
    role,
    company,
    salary,
    startDate
  } = req.body;

  if (!candidate || !role || !company || !salary || !startDate) {
    return res.status(400).json({
      message: 'Candidate, role, company, salary and start date are required'
    });
  }

  const result = db
    .prepare(`
      INSERT INTO placements
      (candidate, role, company, salary, startDate)
      VALUES (?, ?, ?, ?, ?)
    `)
    .run(
      candidate,
      role,
      company,
      salary,
      startDate
    );

  const newPlacement = db
    .prepare('SELECT * FROM placements WHERE id = ?')
    .get(result.lastInsertRowid);

  res.status(201).json(newPlacement);
});

/* -------------------- OVERVIEW -------------------- */

// Dashboard overview
app.get('/api/overview', (req, res) => {
  const totalCandidates = db
    .prepare('SELECT COUNT(*) AS count FROM candidates')
    .get().count;

  const interviewsScheduled = db
    .prepare(`
      SELECT COUNT(*) AS count
      FROM candidates
      WHERE status = 'Interviewing'
    `)
    .get().count;

  const activeJobs = db
    .prepare(`
      SELECT COUNT(*) AS count
      FROM jobs
      WHERE filled = 0
    `)
    .get().count;

  const placements = db
    .prepare('SELECT COUNT(*) AS count FROM placements')
    .get().count;

  const placementRate =
    totalCandidates > 0
      ? Math.round((placements / totalCandidates) * 100)
      : 0;

  res.json({
    totalCandidates,
    interviewsScheduled,
    activeJobs,
    placements,
    placementRate
  });
});

/* -------------------- SERVER -------------------- */

app.listen(PORT, '0.0.0.0', () => {
  console.log(
    `Smart Job Placement Server running on port ${PORT}`
  );
});