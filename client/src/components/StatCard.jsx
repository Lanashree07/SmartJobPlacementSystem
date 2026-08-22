import React from 'react';

const StatCard = ({ title, value }) => {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
      <h4 className="text-muted" style={{ margin: 0, fontWeight: 'normal', fontSize: '14px' }}>{title}</h4>
      <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '4px', color: 'var(--primary)' }}>{value}</div>
    </div>
  );
};

export default StatCard;
