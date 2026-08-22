import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [candidateName, setCandidateName] = useState('');
  
  useEffect(() => {
    const name = localStorage.getItem('candidateName');
    if (name) setCandidateName(name);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('candidateId');
    localStorage.removeItem('candidateName');
    setCandidateName('');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center">
        <Link to="/" style={{ fontWeight: '600', fontSize: '18px' }}>
          SmartHire
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          {candidateName && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/applications">Applications</Link>
              <Link to="/placements">Placements</Link>
            </>
          )}
        </div>

        <div className="nav-links">
          {candidateName ? (
             <>
                <span>Welcome, {candidateName}</span>
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '4px 8px' }}>Logout</button>
             </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn btn-secondary" style={{ padding: '4px 8px' }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
