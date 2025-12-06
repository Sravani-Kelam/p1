package com.revjob.backend.service;

import com.revjob.backend.entity.Job;
import com.revjob.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    
    @Autowired
    private JobRepository jobRepository;
    
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }
    
    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }
    
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }
    
    public Job updateJob(Job job) {
        return jobRepository.save(job);
    }
    
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
    
    public List<Job> searchJobsByTitle(String title) {
        return jobRepository.findByTitleContainingIgnoreCase(title);
    }
    
    public List<Job> getJobsByLocation(String location) {
        return jobRepository.findByLocationContainingIgnoreCase(location);
    }
    
    public List<Job> getJobsByCompany(Long companyId) {
        return jobRepository.findByCompanyId(companyId);
    }
    
    public List<Job> getActiveJobs() {
        return jobRepository.findByStatus(Job.JobStatus.ACTIVE);
    }
}