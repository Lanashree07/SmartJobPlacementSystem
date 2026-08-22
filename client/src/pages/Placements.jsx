import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const Placements = () => {
  const navigate = useNavigate();
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const candidateId = localStorage.getItem('candidateId');
    if (!candidateId) {
      navigate('/login');
      return;
    }
    fetchPlacements(candidateId);
  }, [navigate]);

  const fetchPlacements = async (id) => {
    try {
      const data = await api.getPlacementsByCandidate(id);
      setPlacements(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
       <PageHeader title="My Placements" subtitle="Your secured job offers." />

       {loading ? (
         <LoadingSpinner />
       ) : placements.length > 0 ? (
         <div className="grid grid-cols-2 gap-4">
            {placements.map(placement => (
               <div key={placement.id} className="card" style={{ borderLeft: '4px solid var(--success)' }}>
                  <h3>{placement.application?.job?.companyName}</h3>
                  <p style={{ fontWeight: '500', marginBottom: '8px' }}>{placement.application?.job?.jobTitle}</p>
                  
                  <div className="text-sm">
                     <p><strong>Offered Salary:</strong> ₹{placement.offeredSalary}</p>
                     <p><strong>Start Date:</strong> {placement.startDate ? new Date(placement.startDate).toLocaleDateString() : 'TBD'}</p>
                  </div>
               </div>
            ))}
         </div>
       ) : (
         <EmptyState 
           title="No placements yet" 
           message="Your offers will appear here once finalized." 
         />
       )}
    </div>
  );
};

export default Placements;
