import { useEffect, useState } from 'react';

const API_BASE = 'https://smart-job-placement-api.onrender.com/api';

const initialCandidateForm = {
  name: '',
  role: '',
  email: '',
  experience: '',
  score: 0,
  status: 'Applied'
};

const initialJobForm = {
  title: '',
  company: '',
  location: '',
  type: 'Full-time',
  applicants: 0,
  filled: false
};

const initialPlacementForm = {
  candidate: '',
  role: '',
  company: '',
  salary: '',
  startDate: ''
};

function App() {
  const [overview, setOverview] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [placements, setPlacements] = useState([]);

  const [candidateForm, setCandidateForm] = useState(initialCandidateForm);
  const [jobForm, setJobForm] = useState(initialJobForm);
  const [placementForm, setPlacementForm] = useState(initialPlacementForm);

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [
        overviewRes,
        candidatesRes,
        jobsRes,
        placementsRes
      ] = await Promise.all([
        fetch(`${API_BASE}/overview`),
        fetch(`${API_BASE}/candidates`),
        fetch(`${API_BASE}/jobs`),
        fetch(`${API_BASE}/placements`)
      ]);

      const overviewData = await overviewRes.json();
      const candidatesData = await candidatesRes.json();
      const jobsData = await jobsRes.json();
      const placementsData = await placementsRes.json();

      setOverview(overviewData);
      setCandidates(candidatesData);
      setJobs(jobsData);
      setPlacements(placementsData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  /* -------------------- FORM HANDLERS -------------------- */

  const handleCandidateChange = (event) => {
    const { name, value } = event.target;

    setCandidateForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleJobChange = (event) => {
    const { name, value, type, checked } = event.target;

    setJobForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePlacementChange = (event) => {
    const { name, value } = event.target;

    setPlacementForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /* -------------------- ADD CANDIDATE -------------------- */

  const addCandidate = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE}/candidates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(candidateForm)
      });

      if (!response.ok) {
        throw new Error('Failed to add candidate');
      }

      const newCandidate = await response.json();

      setCandidates((prev) => [newCandidate, ...prev]);

      setCandidateForm(initialCandidateForm);

      setOverview((prev) => ({
        ...prev,
        totalCandidates: (prev.totalCandidates || 0) + 1
      }));
    } catch (error) {
      console.error('Failed to add candidate:', error);
      alert('Failed to add candidate');
    }
  };

  /* -------------------- ADD JOB -------------------- */

  const addJob = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobForm)
      });

      if (!response.ok) {
        throw new Error('Failed to add job');
      }

      const newJob = await response.json();

      setJobs((prev) => [...prev, newJob]);

      setJobForm(initialJobForm);

      setOverview((prev) => ({
        ...prev,
        activeJobs: (prev.activeJobs || 0) + (newJob.filled ? 0 : 1)
      }));
    } catch (error) {
      console.error('Failed to add job:', error);
      alert('Failed to add job');
    }
  };

  /* -------------------- ADD PLACEMENT -------------------- */

  const addPlacement = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE}/placements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(placementForm)
      });

      if (!response.ok) {
        throw new Error('Failed to add placement');
      }

      const newPlacement = await response.json();

      setPlacements((prev) => [newPlacement, ...prev]);

      setPlacementForm(initialPlacementForm);

      setOverview((prev) => ({
        ...prev,
        placements: (prev.placements || 0) + 1
      }));
    } catch (error) {
      console.error('Failed to add placement:', error);
      alert('Failed to add placement');
    }
  };

  /* -------------------- LOADING -------------------- */

  if (loading) {
    return (
      <div className="page-shell">
        <div className="loading">
          Loading recruitment dashboard...
        </div>
      </div>
    );
  }

  /* -------------------- DASHBOARD -------------------- */

  return (
    <div className="page-shell">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-mark">S</div>

          <div>
            <h1>SmartHire</h1>
            <span>Recruitment Intelligence</span>
          </div>
        </div>

        <nav className="nav">
          <a className="active" href="#overview">
            Overview
          </a>

          <a href="#candidates">
            Candidates
          </a>

          <a href="#jobs">
            Jobs
          </a>

          <a href="#placements">
            Placements
          </a>
        </nav>

      </aside>

      {/* MAIN CONTENT */}

      <main className="main-content">

        {/* HEADER */}

        <header className="topbar">

          <div>
            <p className="eyebrow">
              Talent operations
            </p>

            <h2>
              Smart Job Placement Dashboard
            </h2>
          </div>

          <button className="primary-btn">
            + New campaign
          </button>

        </header>

        {/* OVERVIEW */}

        <section
          id="overview"
          className="stats-grid"
        >

          <div className="stat-card accent-blue">
            <span>Total Candidates</span>

            <strong>
              {overview.totalCandidates || 0}
            </strong>

            <small>
              Candidates registered
            </small>
          </div>

          <div className="stat-card accent-green">
            <span>Interviews Scheduled</span>

            <strong>
              {overview.interviewsScheduled || 0}
            </strong>

            <small>
              Interviewing candidates
            </small>
          </div>

          <div className="stat-card accent-purple">
            <span>Active Jobs</span>

            <strong>
              {overview.activeJobs || 0}
            </strong>

            <small>
              Currently open
            </small>
          </div>

          <div className="stat-card accent-orange">
            <span>Placements</span>

            <strong>
              {overview.placements || 0}
            </strong>

            <small>
              {overview.placementRate || 0}% placement rate
            </small>
          </div>

        </section>

        {/* CANDIDATES + JOBS */}

        <section className="lower-grid">

          {/* CANDIDATES */}

          <div
            className="panel"
            id="candidates"
          >

            <div className="panel-header">

              <h3>
                Candidate Pipeline
              </h3>

              <span>
                {candidates.length} profiles
              </span>

            </div>

            <div className="table-wrap">

              <table>

                <thead>

                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Score</th>
                  </tr>

                </thead>

                <tbody>

                  {candidates.map((candidate) => (

                    <tr key={candidate.id}>

                      <td>
                        {candidate.name}
                      </td>

                      <td>
                        {candidate.role}
                      </td>

                      <td>
                        <span className="status-pill">
                          {candidate.status}
                        </span>
                      </td>

                      <td>
                        {candidate.score}%
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* ADD CANDIDATE */}

            <form
              className="entry-form"
              onSubmit={addCandidate}
            >

              <h4>
                Add Candidate
              </h4>

              <div className="form-grid">

                <input
                  name="name"
                  placeholder="Full name"
                  value={candidateForm.name}
                  onChange={handleCandidateChange}
                  required
                />

                <input
                  name="role"
                  placeholder="Role"
                  value={candidateForm.role}
                  onChange={handleCandidateChange}
                  required
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={candidateForm.email}
                  onChange={handleCandidateChange}
                  required
                />

                <input
                  name="experience"
                  placeholder="Experience"
                  value={candidateForm.experience}
                  onChange={handleCandidateChange}
                  required
                />

                <input
                  name="score"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Score"
                  value={candidateForm.score}
                  onChange={handleCandidateChange}
                  required
                />

                <select
                  name="status"
                  value={candidateForm.status}
                  onChange={handleCandidateChange}
                >

                  <option value="Applied">
                    Applied
                  </option>

                  <option value="Shortlisted">
                    Shortlisted
                  </option>

                  <option value="Interviewing">
                    Interviewing
                  </option>

                  <option value="Offered">
                    Offered
                  </option>

                </select>

              </div>

              <button
                type="submit"
                className="primary-btn"
              >
                Save candidate
              </button>

            </form>

          </div>

          {/* JOBS */}

          <div
            className="panel"
            id="jobs"
          >

            <div className="panel-header">

              <h3>
                Open Positions
              </h3>

              <span>
                {jobs.filter((job) => !job.filled).length} active
              </span>

            </div>

            <div className="job-list">

              {jobs.map((job) => (

                <div
                  key={job.id}
                  className="job-item"
                >

                  <div>

                    <strong>
                      {job.title}
                    </strong>

                    <p>
                      {job.company} · {job.location}
                    </p>

                  </div>

                  <div className="job-meta">

                    <span>
                      {job.type}
                    </span>

                    <span>
                      {job.applicants} applicants
                    </span>

                  </div>

                </div>

              ))}

            </div>

            {/* ADD JOB */}

            <form
              className="entry-form"
              onSubmit={addJob}
            >

              <h4>
                Add Job
              </h4>

              <div className="form-grid">

                <input
                  name="title"
                  placeholder="Job title"
                  value={jobForm.title}
                  onChange={handleJobChange}
                  required
                />

                <input
                  name="company"
                  placeholder="Company"
                  value={jobForm.company}
                  onChange={handleJobChange}
                  required
                />

                <input
                  name="location"
                  placeholder="Location"
                  value={jobForm.location}
                  onChange={handleJobChange}
                  required
                />

                <input
                  name="type"
                  placeholder="Type"
                  value={jobForm.type}
                  onChange={handleJobChange}
                  required
                />

                <input
                  name="applicants"
                  type="number"
                  min="0"
                  placeholder="Applicants"
                  value={jobForm.applicants}
                  onChange={handleJobChange}
                  required
                />

                <label className="check-row">

                  <input
                    name="filled"
                    type="checkbox"
                    checked={jobForm.filled}
                    onChange={handleJobChange}
                  />

                  Filled

                </label>

              </div>

              <button
                type="submit"
                className="primary-btn"
              >
                Post role
              </button>

            </form>

          </div>

        </section>

        {/* PLACEMENTS */}

        <section
          id="placements"
          className="panel placement-panel"
        >

          <div className="panel-header">

            <h3>
              Successful Placements
            </h3>

            <span>
              {placements.length} hires
            </span>

          </div>

          {/* PLACEMENT CARDS */}

          <div className="placement-grid">

            {placements.map((placement) => (

              <div
                className="placement-card"
                key={placement.id}
              >

                <div className="placement-top">

                  <div>

                    <strong>
                      {placement.candidate}
                    </strong>

                    <p>
                      {placement.role}
                    </p>

                  </div>

                  <span>
                    {placement.company}
                  </span>

                </div>

                <div className="placement-bottom">

                  <div>

                    <label>
                      Salary
                    </label>

                    <strong>
                      {placement.salary}
                    </strong>

                  </div>

                  <div>

                    <label>
                      Start
                    </label>

                    <strong>
                      {placement.startDate}
                    </strong>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* ADD PLACEMENT */}

          <form
            className="entry-form"
            onSubmit={addPlacement}
          >

            <h4>
              Add Placement
            </h4>

            <div className="form-grid">

              <input
                name="candidate"
                placeholder="Candidate name"
                value={placementForm.candidate}
                onChange={handlePlacementChange}
                required
              />

              <input
                name="role"
                placeholder="Role"
                value={placementForm.role}
                onChange={handlePlacementChange}
                required
              />

              <input
                name="company"
                placeholder="Company"
                value={placementForm.company}
                onChange={handlePlacementChange}
                required
              />

              <input
                name="salary"
                placeholder="Salary"
                value={placementForm.salary}
                onChange={handlePlacementChange}
                required
              />

              <input
                name="startDate"
                type="date"
                value={placementForm.startDate}
                onChange={handlePlacementChange}
                required
              />

            </div>

            <button
              type="submit"
              className="primary-btn"
            >
              Save placement
            </button>

          </form>

        </section>

      </main>

    </div>
  );
}

export default App;