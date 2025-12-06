package com.revjob.backend.repository;

import com.revjob.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByTitleContainingIgnoreCase(String title);
    List<Job> findByLocationContainingIgnoreCase(String location);
    List<Job> findByJobType(Job.JobType jobType);
    List<Job> findByExperienceLevel(Job.ExperienceLevel experienceLevel);
    List<Job> findByStatus(Job.JobStatus status);
    List<Job> findByCompanyId(Long companyId);
    List<Job> findByPostedById(Long userId);
}