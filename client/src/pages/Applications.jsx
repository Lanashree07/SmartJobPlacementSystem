import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';

const Applications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const candidateId = localStorage.getItem('candidateId');
    if (!candidateId) {
      navigate('/login');
      return;
    }
    fetchApplications(candidateId);
  }, [navigate]);

  const fetchApplications = async (id) => {
    try {
      const data = await api.getApplicationsByCandidate(id);
      setApplications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
       <PageHeader title="My Applications" subtitle="History of your job applications." />

       {loading ? (
         <LoadingSpinner />
       ) : applications.length > 0 ? (
         <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="data-table">
               <thead>
                 <tr>
                   <th>Job Title</th>
                   <th>Company</th>
                   <th>Applied Date</th>
                   <th>Status</th>
                 </tr>
               </thead>
               <tbody>
                 {applications.map(app => (
                   <tr key={app.id}>
                     <td>{app.job?.jobTitle}</td>
                     <td>{app.job?.companyName}</td>
                     <td>{app.appliedOn ? new Date(app.appliedOn).toLocaleDateString() : 'N/A'}</td>
                     <td><StatusBadge status={app.status} /></td>
                   </tr>
                 ))}
               </tbody>
            </table>
         </div>
       ) : (
         <EmptyState 
           title="No records" 
           message="You have not submitted any applications." 
           actionText="View Jobs"
           actionLink="/jobs"
         />
       )}
    </div>
  );
};

export default Applications;
