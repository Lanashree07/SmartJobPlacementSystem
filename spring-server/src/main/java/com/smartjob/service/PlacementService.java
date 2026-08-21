package com.smartjob.service;

import com.smartjob.model.Placement;
import com.smartjob.repository.PlacementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlacementService {
    @Autowired
    private PlacementRepository repository;

    public List<Placement> findAll() { return repository.findAll(); }
    
    public List<Placement> findByCandidateId(Long candidateId) {
        return repository.findByApplicationCandidateId(candidateId);
    }
    
    public Optional<Placement> findById(Long id) { return repository.findById(id); }
    
    public Placement save(Placement placement) { return repository.save(placement); }
    
    public Placement update(Long id, Placement placementDetails) {
        return repository.findById(id).map(existing -> {
            existing.setApplication(placementDetails.getApplication());
            existing.setOfferedSalary(placementDetails.getOfferedSalary());
            existing.setStartDate(placementDetails.getStartDate());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Placement not found"));
    }
    
    public void delete(Long id) { repository.deleteById(id); }
}
