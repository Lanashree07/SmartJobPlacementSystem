package com.smartjob.repository;

import com.smartjob.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByCandidateId(Long candidateId);
    java.util.Optional<Application> findByCandidateIdAndJobId(Long candidateId, Long jobId);
}
