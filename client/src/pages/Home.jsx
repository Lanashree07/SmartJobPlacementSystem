import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <section style={{ backgroundColor: 'white', padding: '60px 20px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
           <h1 style={{ fontSize: '28px', color: 'var(--primary)', marginBottom: '16px' }}>
             Smart Job Placement System
           </h1>
           <p className="text-muted mx-auto" style={{ fontSize: '16px', maxWidth: '600px', marginBottom: '24px' }}>
             A streamlined platform for CSE students to manage their placement journey, discover opportunities, and track applications.
           </p>
           <div className="flex justify-center gap-4">
             <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
             <Link to="/register" className="btn btn-secondary">Student Registration</Link>
           </div>
        </div>
      </section>
      
      <section style={{ padding: '40px 20px' }}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '24px' }}>System Features</h2>
          <div className="grid grid-cols-3 gap-6">
             <div className="card text-center">
               <h3>Student Profiles</h3>
               <p className="text-muted text-sm">Create and manage your academic and technical profile.</p>
             </div>
             <div className="card text-center">
               <h3>Job Listings</h3>
               <p className="text-muted text-sm">View and apply to active campus placement drives.</p>
             </div>
             <div className="card text-center">
               <h3>Application Tracking</h3>
               <p className="text-muted text-sm">Monitor your application status and placement results.</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
