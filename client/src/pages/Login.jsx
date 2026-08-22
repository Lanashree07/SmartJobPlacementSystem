import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const candidates = await api.getCandidates();
      const candidate = candidates.find(c => c.email === email);

      if (candidate) {
        localStorage.setItem('candidateId', candidate.id);
        localStorage.setItem('candidateName', candidate.name);
        navigate('/dashboard');
      } else {
        setError('No candidate found with this email.');
      }
    } catch (err) {
      setError('Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center" style={{ minHeight: '60vh' }}>
       <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '24px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Student Login</h2>
          {error && <div className="badge badge-danger mb-4 w-full text-center" style={{ display: 'block', padding: '8px' }}>{error}</div>}
          <form onSubmit={handleLogin}>
             <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="student@college.edu"
                />
             </div>
             <button type="submit" className="btn btn-primary mt-2" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
             </button>
          </form>
          <div className="mt-4 text-center text-muted" style={{ fontSize: '13px' }}>
             New student? <Link to="/register" style={{ fontWeight: 600 }}>Register here</Link>
          </div>
       </div>
    </div>
  );
};

export default Login;
