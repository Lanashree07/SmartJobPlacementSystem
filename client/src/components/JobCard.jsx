import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="card flex flex-col justify-between">
      <div>
        <h3 style={{ margin: 0 }}>{job.jobTitle}</h3>
        <p className="text-muted" style={{ marginBottom: '12px' }}>{job.companyName} - {job.location || 'Remote'}</p>
        
        <div style={{ fontSize: '13px', marginBottom: '12px' }}>
           <p><strong>Salary:</strong> {job.salary ? `₹${job.salary}` : 'Not specified'}</p>
           <p><strong>Deadline:</strong> {job.applicationDeadline || 'Open'}</p>
        </div>
        
        <div style={{ marginBottom: '12px' }}>
           <strong>Skills:</strong><br/>
           <span style={{ fontSize: '13px', color: '#555' }}>
             {job.requiredSkills || 'Not specified'}
           </span>
        </div>
      </div>
      
      <Link to={`/jobs/${job.id}`} className="btn btn-primary" style={{ width: '100%' }}>View Details</Link>
    </div>
  );
};

export default JobCard;
