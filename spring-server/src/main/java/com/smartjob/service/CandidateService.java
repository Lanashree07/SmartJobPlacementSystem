package com.smartjob.service;

import com.smartjob.model.Candidate;
import com.smartjob.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CandidateService {
    @Autowired
    private CandidateRepository repository;

    public List<Candidate> findAll() { return repository.findAll(); }
    
    public Optional<Candidate> findById(Long id) { return repository.findById(id); }
    
    public Candidate save(Candidate candidate) { return repository.save(candidate); }
    
    public Candidate update(Long id, Candidate candidateDetails) {
        return repository.findById(id).map(existing -> {
            existing.setName(candidateDetails.getName());
            existing.setEmail(candidateDetails.getEmail());
            existing.setPhone(candidateDetails.getPhone());
            existing.setDob(candidateDetails.getDob());
            existing.setGender(candidateDetails.getGender());
            existing.setAddress(candidateDetails.getAddress());
            existing.setCollege(candidateDetails.getCollege());
            existing.setDegree(candidateDetails.getDegree());
            existing.setBranch(candidateDetails.getBranch());
            existing.setGraduationYear(candidateDetails.getGraduationYear());
            existing.setCgpa(candidateDetails.getCgpa());
            existing.setProgrammingSkills(candidateDetails.getProgrammingSkills());
            existing.setTechnicalSkills(candidateDetails.getTechnicalSkills());
            existing.setPreferredRole(candidateDetails.getPreferredRole());
            existing.setPreferredLocation(candidateDetails.getPreferredLocation());
            existing.setResumeInfo(candidateDetails.getResumeInfo());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Candidate not found"));
    }
    
    public void delete(Long id) { repository.deleteById(id); }
}
