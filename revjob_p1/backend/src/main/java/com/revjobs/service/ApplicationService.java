package com.revjobs.service;

import com.revjobs.dto.ApplicationDTO;
import com.revjobs.exception.ResourceNotFoundException;
import com.revjobs.model.Application;
import com.revjobs.model.ApplicationStatus;
import com.revjobs.model.Job;
import com.revjobs.model.User;
import com.revjobs.repository.ApplicationRepository;
import com.revjobs.repository.JobRepository;
import com.revjobs.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public ApplicationDTO applyForJob(Long jobId, String candidateEmail, String coverLetter) {
        Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        
        User candidate = userRepository.findByEmail(candidateEmail)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        if (applicationRepository.findByJobAndCandidate(job, candidate).isPresent()) {
            throw new RuntimeException("Already applied for this job");
        }
        
        Application application = new Application();
        application.setJob(job);
        application.setCandidate(candidate);
        application.setCoverLetter(coverLetter);
        application.setStatus(ApplicationStatus.APPLIED);
        
        application = applicationRepository.save(application);
        return convertToDTO(application);
    }
    
    public List<ApplicationDTO> getCandidateApplications(String email) {
        User candidate = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        return applicationRepository.findByCandidate(candidate).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<ApplicationDTO> getJobApplications(Long jobId) {
        Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        
        return applicationRepository.findByJob(job).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    @Transactional
    public ApplicationDTO updateApplicationStatus(Long id, ApplicationStatus status) {
        Application application = applicationRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Application not found"));
        
        application.setStatus(status);
        application = applicationRepository.save(application);
        return convertToDTO(application);
    }
    
    private ApplicationDTO convertToDTO(Application application) {
        ApplicationDTO dto = new ApplicationDTO();
        dto.setId(application.getId());
        dto.setJobId(application.getJob().getId());
        dto.setJobTitle(application.getJob().getTitle());
        dto.setCandidateId(application.getCandidate().getId());
        dto.setCandidateName(application.getCandidate().getFirstName() + " " + application.getCandidate().getLastName());
        dto.setCoverLetter(application.getCoverLetter());
        dto.setResumeUrl(application.getResumeUrl());
        dto.setStatus(application.getStatus());
        dto.setAppliedDate(application.getAppliedDate());
        dto.setLastUpdated(application.getLastUpdated());
        return dto;
    }
}
