package com.smartjob.repository;

import com.smartjob.model.Placement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlacementRepository extends JpaRepository<Placement, Long> {
    List<Placement> findByApplicationCandidateId(Long candidateId);
}
