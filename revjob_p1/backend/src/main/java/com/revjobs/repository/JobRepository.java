package com.revjobs.repository;

import com.revjobs.model.Job;
import com.revjobs.model.JobStatus;
import com.revjobs.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByStatus(JobStatus status);
    List<Job> findByEmployer(User employer);
    List<Job> findByTitleContainingIgnoreCase(String title);
    List<Job> findByLocationContainingIgnoreCase(String location);
    List<Job> findByRemote(Boolean remote);
    
    @Query("SELECT j FROM Job j WHERE j.status = :status AND " +
           "(LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Job> searchJobs(@Param("status") JobStatus status, @Param("keyword") String keyword);
}
