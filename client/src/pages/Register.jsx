import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import FormSection from '../components/FormSection';
import PageHeader from '../components/PageHeader';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', dob: '', gender: '', address: '',
    college: '', degree: '', branch: '', graduationYear: '', cgpa: '',
    programmingSkills: '', technicalSkills: '',
    preferredRole: '', preferredLocation: '', resumeInfo: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.createCandidate({
         ...formData,
         graduationYear: parseInt(formData.graduationYear) || 0,
         cgpa: parseFloat(formData.cgpa) || 0.0
      });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-6" style={{ maxWidth: '700px' }}>
      <PageHeader title="Student Registration" subtitle="Create your placement profile." />
      
      {error && <div className="badge badge-danger mb-4" style={{ display: 'block', padding: '8px' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <FormSection title="Personal Details">
           <div className="grid grid-cols-2 gap-4">
              <div className="form-group"><label className="form-label">Full Name</label><input type="text" name="name" className="form-input" required onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Email</label><input type="email" name="email" className="form-input" required onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Phone</label><input type="text" name="phone" className="form-input" onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Date of Birth</label><input type="date" name="dob" className="form-input" onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Gender</label>
                 <select name="gender" className="form-input" onChange={handleChange}>
                   <option value="">Select...</option>
                   <option value="Male">Male</option>
                   <option value="Female">Female</option>
                   <option value="Other">Other</option>
                 </select>
              </div>
              <div className="form-group"><label className="form-label">Address</label><input type="text" name="address" className="form-input" onChange={handleChange} /></div>
           </div>
        </FormSection>

        <FormSection title="Academic Details">
           <div className="grid grid-cols-2 gap-4">
              <div className="form-group"><label className="form-label">College</label><input type="text" name="college" className="form-input" onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Degree</label><input type="text" name="degree" className="form-input" onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Branch</label><input type="text" name="branch" className="form-input" onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Grad Year</label><input type="number" name="graduationYear" className="form-input" onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">CGPA</label><input type="number" step="0.1" name="cgpa" className="form-input" onChange={handleChange} /></div>
           </div>
        </FormSection>

        <FormSection title="Technical Skills">
           <div className="grid grid-cols-2 gap-4">
              <div className="form-group"><label className="form-label">Programming</label><input type="text" name="programmingSkills" className="form-input" onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Tools/Frameworks</label><input type="text" name="technicalSkills" className="form-input" onChange={handleChange} /></div>
           </div>
        </FormSection>

        <FormSection title="Preferences & Resume">
           <div className="grid grid-cols-2 gap-4">
              <div className="form-group"><label className="form-label">Preferred Role</label><input type="text" name="preferredRole" className="form-input" onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Preferred Location</label><input type="text" name="preferredLocation" className="form-input" onChange={handleChange} /></div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}><label className="form-label">Resume Link</label><input type="text" name="resumeInfo" className="form-input" onChange={handleChange} /></div>
           </div>
        </FormSection>

        <div className="flex justify-between items-center mt-6">
           <Link to="/login" className="text-muted" style={{ fontSize: '13px' }}>Back to Login</Link>
           <button type="submit" className="btn btn-primary" disabled={loading}>
             {loading ? 'Registering...' : 'Register'}
           </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
