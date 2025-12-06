package com.revjob.backend.repository;

import com.revjob.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByApplicantId(Long applicantId);
    List<Application> findByJobId(Long jobId);
    List<Application> findByStatus(Application.ApplicationStatus status);
    List<Application> findByJobCompanyId(Long companyId);
    boolean existsByJobIdAndApplicantId(Long jobId, Long applicantId);
}