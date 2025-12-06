package com.revjobs.repository;

import com.revjobs.model.Application;
import com.revjobs.model.ApplicationStatus;
import com.revjobs.model.Job;
import com.revjobs.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByCandidate(User candidate);
    List<Application> findByJob(Job job);
    List<Application> findByStatus(ApplicationStatus status);
    Optional<Application> findByJobAndCandidate(Job job, User candidate);
    List<Application> findByJobEmployer(User employer);
    Long countByJob(Job job);
}
