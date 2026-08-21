package com.smartjob.controller;

import com.smartjob.model.Placement;
import com.smartjob.service.PlacementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placements")
public class PlacementController {
    @Autowired
    private PlacementService service;

    @GetMapping
    public List<Placement> getAll() { return service.findAll(); }

    @GetMapping("/candidate/{candidateId}")
    public List<Placement> getByCandidateId(@PathVariable Long candidateId) {
        return service.findByCandidateId(candidateId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Placement> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Placement create(@RequestBody Placement placement) {
        return service.save(placement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Placement> update(@PathVariable Long id, @RequestBody Placement placement) {
        try {
            return ResponseEntity.ok(service.update(id, placement));
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
