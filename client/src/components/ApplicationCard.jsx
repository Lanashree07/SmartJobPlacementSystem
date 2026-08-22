import React from 'react';
import StatusBadge from './StatusBadge';

const ApplicationCard = ({ application }) => {
  return (
    <div className="card flex justify-between items-center" style={{ marginBottom: '8px', padding: '12px 16px' }}>
      <div>
        <h4 style={{ margin: 0 }}>{application.job?.jobTitle || 'Unknown Job'}</h4>
        <p className="text-muted" style={{ fontSize: '12px', margin: 0 }}>{application.job?.companyName || 'Unknown Company'} | Applied: {application.appliedOn ? new Date(application.appliedOn).toLocaleDateString() : 'N/A'}</p>
      </div>
      <div>
        <StatusBadge status={application.status} />
      </div>
    </div>
  );
};

export default ApplicationCard;
