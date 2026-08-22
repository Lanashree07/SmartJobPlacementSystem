import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import FormSection from '../components/FormSection';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [candidateId, setCandidateId] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const id = localStorage.getItem('candidateId');
    if (!id) {
      navigate('/login');
      return;
    }
    setCandidateId(id);
    fetchCandidate(id);
  }, [navigate]);

  const fetchCandidate = async (id) => {
    try {
      const data = await api.getCandidate(id);
      setFormData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const updateData = {
         ...formData,
         graduationYear: parseInt(formData.graduationYear) || 0,
         cgpa: parseFloat(formData.cgpa) || 0.0
      };
      await api.updateCandidate(candidateId, updateData);
      localStorage.setItem('candidateName', formData.name);
      setMessage({ type: 'success', text: 'Profile updated.' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container py-4" style={{ maxWidth: '700px' }}>
      <PageHeader title="My Profile" subtitle="Update your academic and personal information." />
      
      {message && (
         <div className={`badge mb-4 w-full text-center ${message.type === 'success' ? 'badge-success' : 'badge-danger'}`} style={{ display: 'block', padding: '8px' }}>
            {message.text}
         </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <FormSection title="Personal Information">
           <div className="grid grid-cols-2 gap-4">
              <div className="form-group"><label className="form-label">Full Name</label><input type="text" name="name" className="form-input" required value={formData.name || ''} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Email</label><input type="email" name="email" className="form-input" required value={formData.email || ''} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Phone</label><input type="text" name="phone" className="form-input" value={formData.phone || ''} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Date of Birth</label><input type="date" name="dob" className="form-input" value={formData.dob || ''} onChange={handleChange} /></div>
              <div className="form-group col-span-2"><label className="form-label">Address</label><input type="text" name="address" className="form-input" value={formData.address || ''} onChange={handleChange} /></div>
           </div>
        </FormSection>

        <FormSection title="Academic Information">
           <div className="grid grid-cols-2 gap-4">
              <div className="form-group"><label className="form-label">College</label><input type="text" name="college" className="form-input" value={formData.college || ''} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Degree</label><input type="text" name="degree" className="form-input" value={formData.degree || ''} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Branch</label><input type="text" name="branch" className="form-input" value={formData.branch || ''} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Grad Year</label><input type="number" name="graduationYear" className="form-input" value={formData.graduationYear || ''} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">CGPA</label><input type="number" step="0.1" name="cgpa" className="form-input" value={formData.cgpa || ''} onChange={handleChange} /></div>
           </div>
        </FormSection>

        <FormSection title="Skills & Resumes">
           <div className="grid grid-cols-2 gap-4">
              <div className="form-group"><label className="form-label">Programming</label><input type="text" name="programmingSkills" className="form-input" value={formData.programmingSkills || ''} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Tools</label><input type="text" name="technicalSkills" className="form-input" value={formData.technicalSkills || ''} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Pref. Role</label><input type="text" name="preferredRole" className="form-input" value={formData.preferredRole || ''} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Pref. Location</label><input type="text" name="preferredLocation" className="form-input" value={formData.preferredLocation || ''} onChange={handleChange} /></div>
              <div className="form-group col-span-2"><label className="form-label">Resume Link</label><input type="text" name="resumeInfo" className="form-input" value={formData.resumeInfo || ''} onChange={handleChange} /></div>
           </div>
        </FormSection>

        <div className="flex justify-end mt-4">
           <button type="submit" className="btn btn-primary" disabled={saving}>
             {saving ? 'Saving...' : 'Save Profile'}
           </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
