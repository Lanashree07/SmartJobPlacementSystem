const API_BASE =
  import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

const api = {
    getOverview: () =>
    request('/overview'),
  getCandidates: () => request('/candidates'),

  getCandidate: (id) =>
    request(`/candidates/${id}`),

  createCandidate: (data) =>
    request('/candidates', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateCandidate: (id, data) =>
    request(`/candidates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteCandidate: (id) =>
    request(`/candidates/${id}`, {
      method: 'DELETE',
    }),

  getJobs: () =>
    request('/jobs'),

  getJob: (id) =>
    request(`/jobs/${id}`),

  createJob: (data) =>
    request('/jobs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateJob: (id, data) =>
    request(`/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteJob: (id) =>
    request(`/jobs/${id}`, {
      method: 'DELETE',
    }),

  getApplications: () =>
    request('/applications'),

  getApplicationsByCandidate: (candidateId) =>
    request(`/applications/candidate/${candidateId}`),

  getApplication: (id) =>
    request(`/applications/${id}`),

  createApplication: (data) =>
    request('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateApplication: (id, data) =>
    request(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteApplication: (id) =>
    request(`/applications/${id}`, {
      method: 'DELETE',
    }),

  getPlacements: () =>
    request('/placements'),

  getPlacementsByCandidate: (candidateId) =>
    request(`/placements/candidate/${candidateId}`),

  getPlacement: (id) =>
    request(`/placements/${id}`),

  createPlacement: (data) =>
    request('/placements', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updatePlacement: (id, data) =>
    request(`/placements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deletePlacement: (id) =>
    request(`/placements/${id}`, {
      method: 'DELETE',
    }),
};

export default api;