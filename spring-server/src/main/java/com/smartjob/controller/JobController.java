package com.smartjob.controller;

import com.smartjob.model.Job;
import com.smartjob.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    @Autowired
    private JobService service;

    @GetMapping
    public List<Job> getAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Job create(@Valid @RequestBody Job job) {
        return service.save(job);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> update(@PathVariable Long id, @Valid @RequestBody Job job) {
        try {
            return ResponseEntity.ok(service.update(id, job));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
