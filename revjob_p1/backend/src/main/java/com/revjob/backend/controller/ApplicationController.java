package com.revjob.backend.controller;

import com.revjob.backend.entity.Application;
import com.revjob.backend.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {
    
    @Autowired
    private ApplicationService applicationService;
    
    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Long id) {
        return applicationService.getApplicationById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Application> createApplication(@RequestBody Application application) {
        try {
            return ResponseEntity.ok(applicationService.createApplication(application));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(@PathVariable Long id, @RequestBody Application application) {
        application.setId(id);
        return ResponseEntity.ok(applicationService.updateApplication(application));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/applicant/{applicantId}")
    public ResponseEntity<List<Application>> getApplicationsByApplicant(@PathVariable Long applicantId) {
        return ResponseEntity.ok(applicationService.getApplicationsByApplicant(applicantId));
    }
    
    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> getApplicationsByJob(@PathVariable Long jobId) {
        return ResponseEntity.ok(applicationService.getApplicationsByJob(jobId));
    }
}