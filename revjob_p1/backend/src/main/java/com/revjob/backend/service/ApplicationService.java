package com.revjob.backend.service;

import com.revjob.backend.entity.Application;
import com.revjob.backend.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {
    
    @Autowired
    private ApplicationRepository applicationRepository;
    
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }
    
    public Optional<Application> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }
    
    public Application createApplication(Application application) {
        if (applicationRepository.existsByJobIdAndApplicantId(
                application.getJob().getId(), 
                application.getApplicant().getId())) {
            throw new RuntimeException("Application already exists for this job");
        }
        return applicationRepository.save(application);
    }
    
    public Application updateApplication(Application application) {
        return applicationRepository.save(application);
    }
    
    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }
    
    public List<Application> getApplicationsByApplicant(Long applicantId) {
        return applicationRepository.findByApplicantId(applicantId);
    }
    
    public List<Application> getApplicationsByJob(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }
    
    public List<Application> getApplicationsByCompany(Long companyId) {
        return applicationRepository.findByJobCompanyId(companyId);
    }
}