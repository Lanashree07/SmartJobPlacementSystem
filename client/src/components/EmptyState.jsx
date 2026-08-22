import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ title, message, actionText, actionLink }) => {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '32px' }}>
      <h3 style={{ marginBottom: '8px' }}>{title}</h3>
      <p className="text-muted" style={{ marginBottom: '16px' }}>{message}</p>
      {actionText && actionLink && (
        <Link to={actionLink} className="btn btn-primary">{actionText}</Link>
      )}
    </div>
  );
};

export default EmptyState;
