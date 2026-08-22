import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const [data, setData] = useState({
    candidates: [],
    jobs: [],
    applications: [],
    placements: [],
  });

  const [overview, setOverview] = useState({
    totalCandidates: 0,
    activeJobs: 0,
    interviewsScheduled: 0,
    placements: 0,
    placementRate: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        overviewData,
        candidates,
        jobs,
        applications,
        placements,
      ] = await Promise.all([
        api.getOverview(),
        api.getCandidates(),
        api.getJobs(),
        api.getApplications(),
        api.getPlacements(),
      ]);

      setOverview(overviewData);

      setData({
        candidates,
        jobs,
        applications,
        placements,
      });
    } catch (err) {
      console.error('Failed to load admin dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h3 className="mb-4 text-center">Admin Panel</h3>

        <nav>
          <button
            onClick={() => setActiveTab('overview')}
            className={`admin-nav-link ${
              activeTab === 'overview' ? 'active' : ''
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab('candidates')}
            className={`admin-nav-link ${
              activeTab === 'candidates' ? 'active' : ''
            }`}
          >
            Candidates
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`admin-nav-link ${
              activeTab === 'jobs' ? 'active' : ''
            }`}
          >
            Jobs
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`admin-nav-link ${
              activeTab === 'applications' ? 'active' : ''
            }`}
          >
            Applications
          </button>

          <button
            onClick={() => setActiveTab('placements')}
            className={`admin-nav-link ${
              activeTab === 'placements' ? 'active' : ''
            }`}
          >
            Placements
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="admin-nav-link text-center mt-4"
          style={{ color: '#ff6b6b' }}
        >
          Logout
        </button>
      </div>

      <div className="admin-main">

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <h2>Dashboard Overview</h2>

            <div className="grid grid-cols-5 gap-4 mt-4">

              <div className="card text-center">
                <h3>{overview.totalCandidates}</h3>
                <p>Candidates</p>
              </div>

              <div className="card text-center">
                <h3>{overview.activeJobs}</h3>
                <p>Active Jobs</p>
              </div>

              <div className="card text-center">
                <h3>{overview.interviewsScheduled}</h3>
                <p>Interviews Scheduled</p>
              </div>

              <div className="card text-center">
                <h3>{overview.placements}</h3>
                <p>Placements</p>
              </div>

              <div className="card text-center">
                <h3>{overview.placementRate}%</h3>
                <p>Placement Rate</p>
              </div>

            </div>
          </div>
        )}

        {/* CANDIDATES */}
        {activeTab === 'candidates' && (
          <div>
            <h2>Candidates</h2>

            <div
              className="card"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>College</th>
                    <th>CGPA</th>
                    <th>Role</th>
                  </tr>
                </thead>

                <tbody>
                  {data.candidates.map((c) => (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.college}</td>
                      <td>{c.cgpa}</td>
                      <td>{c.preferredRole}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* JOBS */}
        {activeTab === 'jobs' && (
          <div>
            <h2>Jobs</h2>

            <div
              className="card"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Job Title</th>
                    <th>Location</th>
                    <th>Salary</th>
                    <th>Deadline</th>
                  </tr>
                </thead>

                <tbody>
                  {data.jobs.map((j) => (
                    <tr key={j.id}>
                      <td>{j.companyName}</td>
                      <td>{j.jobTitle}</td>
                      <td>{j.location}</td>
                      <td>₹{j.salary}</td>
                      <td>{j.applicationDeadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* APPLICATIONS */}
        {activeTab === 'applications' && (
          <div>
            <h2>Applications</h2>

            <div
              className="card"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Job</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {data.applications.map((a) => (
                    <tr key={a.id}>
                      <td>{a.candidate?.name}</td>
                      <td>{a.job?.jobTitle}</td>
                      <td>{a.job?.companyName}</td>
                      <td>
                        <span className="badge badge-info">
                          {a.status}
                        </span>
                      </td>
                      <td>
                        {new Date(a.appliedOn).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PLACEMENTS */}
        {activeTab === 'placements' && (
          <div>
            <h2>Placements</h2>

            <div
              className="card"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Salary</th>
                    <th>Start</th>
                  </tr>
                </thead>

                <tbody>
                  {data.placements.map((p) => (
                    <tr key={p.id}>
                      <td>{p.application?.candidate?.name}</td>
                      <td>{p.application?.job?.companyName}</td>
                      <td>{p.application?.job?.jobTitle}</td>
                      <td>₹{p.offeredSalary}</td>
                      <td>
                        {p.startDate
                          ? new Date(p.startDate).toLocaleDateString()
                          : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;