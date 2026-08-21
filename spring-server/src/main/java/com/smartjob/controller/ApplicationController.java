package com.smartjob.controller;

import com.smartjob.model.Application;
import com.smartjob.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    @Autowired
    private ApplicationService service;

    @GetMapping
    public List<Application> getAll() { return service.findAll(); }

    @GetMapping("/candidate/{candidateId}")
    public List<Application> getByCandidateId(@PathVariable Long candidateId) {
        return service.findByCandidateId(candidateId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Application create(@RequestBody Application application) {
        return service.save(application);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> update(@PathVariable Long id, @RequestBody Application application) {
        try {
            return ResponseEntity.ok(service.update(id, application));
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
