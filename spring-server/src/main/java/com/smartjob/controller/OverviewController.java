package com.smartjob.controller;

import com.smartjob.repository.CandidateRepository;
import com.smartjob.repository.JobRepository;
import com.smartjob.repository.ApplicationRepository;
import com.smartjob.repository.PlacementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/overview")
public class OverviewController {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private PlacementRepository placementRepository;

    @GetMapping
    public Map<String, Object> getOverview() {

        long totalCandidates = candidateRepository.count();

        // Active jobs = jobs with no deadline or deadline today/future
        long activeJobs = jobRepository.findAll()
                .stream()
                .filter(job ->
                        job.getApplicationDeadline() == null
                                || !job.getApplicationDeadline().isBefore(LocalDate.now()))
                .count();

        long placements = placementRepository.count();

        long interviewsScheduled = applicationRepository.findAll()
                .stream()
                .filter(application ->
                        "Interviewing".equalsIgnoreCase(application.getStatus()))
                .count();

        double placementRate = totalCandidates == 0
                ? 0
                : Math.round((placements * 100.0 / totalCandidates) * 10.0) / 10.0;

        Map<String, Object> overview = new HashMap<>();

        overview.put("totalCandidates", totalCandidates);
        overview.put("interviewsScheduled", interviewsScheduled);
        overview.put("activeJobs", activeJobs);
        overview.put("placements", placements);
        overview.put("placementRate", placementRate);

        return overview;
    }
}