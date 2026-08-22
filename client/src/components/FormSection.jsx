import React from 'react';

const FormSection = ({ title, children }) => {
  return (
    <div className="card" style={{ marginBottom: '16px' }}>
      <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '12px' }}>
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
};

export default FormSection;
