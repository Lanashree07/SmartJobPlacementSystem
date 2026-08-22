import React from 'react';

const StatusBadge = ({ status }) => {
  let badgeClass = 'badge-info';
  let displayStatus = status || 'Pending';
  
  const lowerStatus = displayStatus.toLowerCase();
  if (lowerStatus === 'rejected') badgeClass = 'badge-danger';
  if (lowerStatus === 'offered' || lowerStatus === 'placed' || lowerStatus === 'accepted') badgeClass = 'badge-success';
  if (lowerStatus === 'interviewing' || lowerStatus === 'shortlisted') badgeClass = 'badge-warning';

  return (
    <span className={`badge ${badgeClass}`}>
      {displayStatus}
    </span>
  );
};

export default StatusBadge;
