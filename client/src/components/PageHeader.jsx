import React from 'react';

const PageHeader = ({ title, subtitle }) => {
  return (
    <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px' }}>
      <h1 style={{ margin: 0 }}>{title}</h1>
      {subtitle && <p className="text-muted" style={{ marginTop: '4px' }}>{subtitle}</p>}
    </div>
  );
};

export default PageHeader;
