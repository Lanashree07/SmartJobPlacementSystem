package com.smartjob.service;

import com.smartjob.model.Job;
import com.smartjob.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    @Autowired
    private JobRepository repository;

    public List<Job> findAll() { return repository.findAll(); }
    
    public Optional<Job> findById(Long id) { return repository.findById(id); }
    
    public Job save(Job job) { return repository.save(job); }
    
    public Job update(Long id, Job jobDetails) {
        return repository.findById(id).map(existing -> {
            existing.setCompanyName(jobDetails.getCompanyName());
            existing.setJobTitle(jobDetails.getJobTitle());
            existing.setDescription(jobDetails.getDescription());
            existing.setRequiredSkills(jobDetails.getRequiredSkills());
            existing.setQualification(jobDetails.getQualification());
            existing.setMinCgpa(jobDetails.getMinCgpa());
            existing.setLocation(jobDetails.getLocation());
            existing.setSalary(jobDetails.getSalary());
            existing.setApplicationDeadline(jobDetails.getApplicationDeadline());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Job not found"));
    }
    
    public void delete(Long id) { repository.deleteById(id); }
}
