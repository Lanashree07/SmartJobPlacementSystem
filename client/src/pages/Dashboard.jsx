import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import ApplicationCard from '../components/ApplicationCard';
import JobCard from '../components/JobCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const navigate = useNavigate();
  const [candidateName, setCandidateName] = useState('');
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem('candidateId');
    const name = localStorage.getItem('candidateName');
    if (!id) {
      navigate('/login');
      return;
    }
    setCandidateName(name);
    fetchData(id);
  }, [navigate]);

  const fetchData = async (id) => {
    try {
      const apps = await api.getApplicationsByCandidate(id);
      const allJobs = await api.getJobs();
      setApplications(apps);
      setJobs(allJobs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container py-4">
      <PageHeader 
        title={`Welcome, ${candidateName}`} 
        subtitle="Student Dashboard" 
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
         <StatCard title="Applications" value={applications.length} />
         <StatCard title="Interviews" value={applications.filter(a => a.status.toLowerCase().includes('interview')).length} />
         <StatCard title="Placements" value={applications.filter(a => a.status.toLowerCase().includes('placed') || a.status.toLowerCase().includes('accepted')).length} />
      </div>

      <div className="grid grid-cols-2 gap-6">
         <div>
            <div className="flex justify-between items-center mb-2">
               <h3>Recent Applications</h3>
               <Link to="/applications" style={{ fontSize: '13px' }}>View All</Link>
            </div>
            {applications.length > 0 ? (
               applications.slice(0, 3).map(app => (
                 <ApplicationCard key={app.id} application={app} />
               ))
            ) : (
               <div className="card text-center text-muted">No applications yet.</div>
            )}
         </div>
         
         <div>
            <div className="flex justify-between items-center mb-2">
               <h3>Latest Jobs</h3>
               <Link to="/jobs" style={{ fontSize: '13px' }}>View All</Link>
            </div>
            {jobs.length > 0 ? (
               <div className="grid grid-cols-1 gap-4">
                 {jobs.slice(0, 2).map(job => (
                   <JobCard key={job.id} job={job} />
                 ))}
               </div>
            ) : (
               <div className="card text-center text-muted">No jobs available.</div>
            )}
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
