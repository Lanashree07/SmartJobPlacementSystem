import React, { useState, useEffect } from 'react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import JobCard from '../components/JobCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await api.getJobs();
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => 
    (job.jobTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.companyName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4">
      <PageHeader title="Job Openings" subtitle="Available campus placement drives." />

      <div className="mb-4">
        <input 
          type="text" 
          className="form-input" 
          placeholder="Search by role or company..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '400px' }}
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No jobs found" 
          message="No active jobs match your search." 
        />
      )}
    </div>
  );
};

export default Jobs;
