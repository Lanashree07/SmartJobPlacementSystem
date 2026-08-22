import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const data = await api.getJob(id);
      setJob(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    const candidateId = localStorage.getItem('candidateId');
    if (!candidateId) {
      navigate('/login');
      return;
    }

    setApplying(true);
    setMessage('');
    try {
      const applicationData = {
         candidate: { id: parseInt(candidateId) },
         job: { id: parseInt(id) },
         status: 'Applied',
         appliedOn: new Date().toISOString()
      };
      await api.createApplication(applicationData);
      setMessage({ type: 'success', text: 'Application submitted successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to apply. You may have already applied.' });
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!job) return <div className="container py-4">Job not found.</div>;

  return (
    <div className="container py-4">
       {message && (
          <div className={`badge mb-4 w-full text-center ${message.type === 'success' ? 'badge-success' : 'badge-danger'}`} style={{ display: 'block', padding: '8px', fontSize: '14px' }}>
             {message.text}
          </div>
       )}

       <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
             <div className="card">
                <h2>{job.jobTitle}</h2>
                <p style={{ fontWeight: 'bold', marginBottom: '16px' }}>{job.companyName}</p>
                
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                   <p><strong>Location:</strong> {job.location || 'N/A'}</p>
                   <p><strong>Salary:</strong> {job.salary ? `₹${job.salary}` : 'N/A'}</p>
                   <p><strong>Deadline:</strong> {job.applicationDeadline || 'N/A'}</p>
                   <p><strong>Min CGPA:</strong> {job.minCgpa || 'N/A'}</p>
                </div>

                <div className="mb-4">
                   <h4>Job Description</h4>
                   <p style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>{job.description || 'No description provided.'}</p>
                </div>

                <div className="mb-4">
                   <h4>Required Skills</h4>
                   <p style={{ fontSize: '14px' }}>{job.requiredSkills || 'N/A'}</p>
                </div>
             </div>
          </div>
          
          <div className="col-span-1">
             <div className="card text-center">
                <h3 className="mb-2">Apply for this role</h3>
                <button 
                  onClick={handleApply} 
                  disabled={applying || message?.type === 'success'}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  {applying ? 'Applying...' : (message?.type === 'success' ? 'Applied' : 'Apply Now')}
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};

export default JobDetails;
