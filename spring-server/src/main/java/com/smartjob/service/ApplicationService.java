package com.smartjob.service;

import com.smartjob.model.Application;
import com.smartjob.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepository repository;

    public List<Application> findAll() { return repository.findAll(); }
    
    public List<Application> findByCandidateId(Long candidateId) {
        return repository.findByCandidateId(candidateId);
    }
    
    public Optional<Application> findById(Long id) { return repository.findById(id); }
    
    public Application save(Application app) { 
        if (app.getCandidate() != null && app.getJob() != null) {
            Optional<Application> existing = repository.findByCandidateIdAndJobId(app.getCandidate().getId(), app.getJob().getId());
            if (existing.isPresent()) {
                throw new RuntimeException("Candidate has already applied for this job.");
            }
        }
        return repository.save(app); 
    }
    
    public Application update(Long id, Application appDetails) {
        return repository.findById(id).map(existing -> {
            existing.setCandidate(appDetails.getCandidate());
            existing.setJob(appDetails.getJob());
            existing.setAppliedOn(appDetails.getAppliedOn());
            existing.setStatus(appDetails.getStatus());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Application not found"));
    }
    
    public void delete(Long id) { repository.deleteById(id); }
}
