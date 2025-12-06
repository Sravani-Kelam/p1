package com.revjobs.service;

import com.revjobs.dto.JobDTO;
import com.revjobs.exception.ResourceNotFoundException;
import com.revjobs.model.Job;
import com.revjobs.model.JobStatus;
import com.revjobs.model.User;
import com.revjobs.repository.JobRepository;
import com.revjobs.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public JobDTO createJob(JobDTO jobDTO, String employerEmail) {
        User employer = userRepository.findByEmail(employerEmail)
            .orElseThrow(() -> new ResourceNotFoundException("Employer not found"));
        
        Job job = new Job();
        job.setTitle(jobDTO.getTitle());
        job.setDescription(jobDTO.getDescription());
        job.setRequirements(jobDTO.getRequirements());
        job.setSalaryMin(jobDTO.getSalaryMin());
        job.setSalaryMax(jobDTO.getSalaryMax());
        job.setLocation(jobDTO.getLocation());
        job.setRemote(jobDTO.getRemote());
        job.setExperienceLevel(jobDTO.getExperienceLevel());
        job.setEmployer(employer);
        job.setCompanyName(jobDTO.getCompanyName() != null ? jobDTO.getCompanyName() : employer.getCompanyName());
        job.setStatus(JobStatus.ACTIVE);
        job.setApplicationDeadline(jobDTO.getApplicationDeadline());
        
        job = jobRepository.save(job);
        return convertToDTO(job);
    }
    
    public List<JobDTO> getAllJobs() {
        return jobRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<JobDTO> getActiveJobs() {
        return jobRepository.findByStatus(JobStatus.ACTIVE).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public JobDTO getJobById(Long id) {
        Job job = jobRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        return convertToDTO(job);
    }
    
    public List<JobDTO> searchJobs(String keyword) {
        return jobRepository.searchJobs(JobStatus.ACTIVE, keyword).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    @Transactional
    public JobDTO updateJob(Long id, JobDTO jobDTO) {
        Job job = jobRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        
        job.setTitle(jobDTO.getTitle());
        job.setDescription(jobDTO.getDescription());
        job.setRequirements(jobDTO.getRequirements());
        job.setSalaryMin(jobDTO.getSalaryMin());
        job.setSalaryMax(jobDTO.getSalaryMax());
        job.setLocation(jobDTO.getLocation());
        job.setRemote(jobDTO.getRemote());
        job.setExperienceLevel(jobDTO.getExperienceLevel());
        
        job = jobRepository.save(job);
        return convertToDTO(job);
    }
    
    @Transactional
    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        jobRepository.delete(job);
    }
    
    private JobDTO convertToDTO(Job job) {
        JobDTO dto = new JobDTO();
        dto.setId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setDescription(job.getDescription());
        dto.setRequirements(job.getRequirements());
        dto.setSalaryMin(job.getSalaryMin());
        dto.setSalaryMax(job.getSalaryMax());
        dto.setLocation(job.getLocation());
        dto.setRemote(job.getRemote());
        dto.setExperienceLevel(job.getExperienceLevel());
        dto.setCompanyName(job.getCompanyName());
        dto.setStatus(job.getStatus());
        dto.setApplicationDeadline(job.getApplicationDeadline());
        dto.setPostedDate(job.getPostedDate());
        dto.setEmployerId(job.getEmployer().getId());
        return dto;
    }
}
